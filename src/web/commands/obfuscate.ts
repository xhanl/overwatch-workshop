import * as vscode from "vscode";
import {
  getDynamicList,
  getFileNameFromPath,
  getObfuscatedNames,
  getRandomInt,
  shuffleArray,
} from "../utils";

//代码混淆能力
const disposable = vscode.commands.registerCommand(
  "ow.command.obfuscate",
  () => {
    try {
      vscode.window
        .showInputBox({
          title: "混淆生成   1 / 2",
          placeHolder: "留空使用默认值 30000",
          prompt: "请提供原生代码的总元素数量",
          validateInput: (value) => {
            if (value === "") {
              //使用默认值
              return;
            }
            const intValue = parseInt(value);
            if (isNaN(intValue)) {
              return "无效输入";
            } else if (intValue > 32768) {
              return `超出游戏限制 (最多32768个)`;
            }
          },
        })
        .then((value) => {
          if (value === undefined) {
            //用户取消
            return;
          }
          const pickItems = [
            "填充规则（占用更多元素）",
            "混淆字符（影响字符比较，例如玩家名称或数字）",
            "混淆索引（影响负载，占用更多元素）",
            "混淆本地索引（影响帧率表现）",
          ].map((label, index) => {
            return {
              label: label,
              index: index,
              picked: true,
            };
          });

          vscode.window
            .showQuickPick(pickItems, {
              title: "混淆生成   2 / 2",
              placeHolder: "过滤增强选项",
              canPickMany: true,
            })
            .then((selected) => {
              if (selected === undefined) {
                //用户取消
                return;
              }

              //获取用户配置
              const options = selected.map((option) => {
                return option.index;
              });

              //最大元素数量
              const input = parseInt(value);
              let elementCount = 32768;
              elementCount -= isNaN(input) ? 30000 : input;

              //修改当前文件
              const activeEditor = vscode.window.activeTextEditor;
              if (activeEditor) {
                //文档数据
                const document = activeEditor.document;
                const dynamicList = getDynamicList(document);

                //混淆内容
                let settings = "";
                let variables = "";
                let subroutines = "";
                let rules = "";
                let strings: string[] = [];
                let obfuscatedRules: string[] = [];

                //分离 设置，变量，子程序，规则
                let block;
                let range;
                let stack = 0;
                let match: RegExpMatchArray | null;
                for (let i = 0; i < document.lineCount; i++) {
                  const line = document.lineAt(i);
                  const trimText = line.text.trim();

                  if (
                    stack === 0 &&
                    (match = trimText.match(
                      /^(?:设置|变量|子程序|(?:禁用\s*)?规则.*)$/
                    ))
                  ) {
                    if (match[0].length > 3) {
                      block = "规则";
                    } else {
                      block = match[0];
                    }
                    range = line.range;
                  } else if (trimText === "{") {
                    stack++;
                  } else if (trimText === "}") {
                    stack--;
                    if (stack === 0) {
                      switch (block) {
                        case "设置":
                          {
                            if (range) {
                              settings = document.getText(
                                range.union(line.range)
                              );
                            } else {
                              throw new Error("设置 range 未定义");
                            }
                          }
                          break;
                        case "变量":
                          break;
                        case "子程序":
                          break;
                        case "规则":
                          {
                            if (range) {
                              i = document.lineCount - 1;
                              rules = document.getText(
                                range.union(document.lineAt(i).range)
                              );
                            } else {
                              throw new Error("规则 range 未定义");
                            }
                          }
                          break;
                      }
                    }
                  }
                }

                //替换字符内容 / 移除注释 / 替换禁用（同时进行并为字符串设置高优先级避免冲突，例如字符串中可能包含注释格式//但不应该被解析为注释）
                rules = rules.replace(
                  /(?:(?:(?:自定义字符串|字符串|规则)\s*\(\s*)?"((?:\\"|[^"])*)"|\/\/[^\n\r]*|\/\*[\s\S]*?\*\/|禁用\s+)/g,
                  (match, string: string) => {
                    if (match.startsWith('"')) {
                      //移除字符串注释
                      //console.log(`移除字符串注释：${match} → 🗑️`);
                      return "";
                    } else if (
                      match.startsWith("自定义字符串") ||
                      match.startsWith("字符串")
                    ) {
                      //替换混淆字符
                      //console.log(`替换字符：${string} → ❖`);
                      strings.push(
                        options.includes(1)
                          ? string.replace(
                              /\{[0-2]\}|(\\[abfnrtv'"\\\\])+|./g,
                              (char) => {
                                if (char.length === 1) {
                                  if (char.match(/[\x00-\x1F\x7F-\x9F\xAD]/g)) {
                                    //忽略隐形字符
                                    return char;
                                  }
                                  return String.fromCodePoint(
                                    char.charCodeAt(0) + 0xe0000
                                  );
                                }
                                return char;
                              }
                            )
                          : string
                      );
                      return "自定义字符串(❖";
                    } else if (match.startsWith("规则")) {
                      //移除规则名
                      //console.log(`移除规则名：${match} → 规则(""`);
                      return '规则(""';
                    } else if (
                      match.startsWith("//") ||
                      match.startsWith("/*")
                    ) {
                      //移除单行和多行注释
                      //console.log(`移除行注释：${match} → 🗑️`);
                      return "";
                    } else if (match.startsWith("禁用")) {
                      //替换禁用
                      //console.log(`替换禁用：${match} → ⟁`);
                      return "⟁";
                    }
                    throw new Error(
                      "替换字符内容 / 移除注释 / 替换禁用 时遇到未知匹配"
                    );
                  }
                );

                //清洗空隙
                rules = rules.replace(/\s+/g, "");

                //修复特殊条目
                rules = rules.replace(/持续-全局/g, "持续 - 全局");
                rules = rules.replace(/持续-每名玩家/g, "持续 - 每名玩家");
                rules = rules.replace(/For全局变量/g, "For 全局变量");
                rules = rules.replace(/For玩家变量/g, "For 玩家变量");
                rules = rules.replace(/ElseIf/g, "Else If");

                //添加 "{}" 换行
                rules = rules.replace(/{|}/g, (match) => {
                  return `\n${match[0]}\n`;
                });

                //添加 ";" 换行
                rules = rules.replace(/;/g, ";\n");

                //修复工坊错误
                rules = rules.replace(
                  /(创建地图文本|创建HUD文本|创建进度条地图文本|创建进度条HUD文本)\((.*),无,(.*)\);/g,
                  "$1($2,全部禁用,$3);"
                );
                rules = rules.replace(
                  /(追踪全局变量频率|追踪玩家变量频率|持续追踪全局变量|持续追踪玩家变量|开始治疗调整|设置不可见)\((.*),无\);/g,
                  "$1($2,全部禁用);"
                );

                //获取混淆名称
                const obfuscatedNames = getObfuscatedNames(128);
                let obfuscatedList: {
                  子程序: string[];
                  全局变量: string[];
                  玩家变量: string[];
                } = {
                  子程序: [],
                  全局变量: [],
                  玩家变量: [],
                };

                //混淆子程序
                Object.entries(dynamicList.子程序).forEach(([key]) => {
                  const numKey = parseInt(key);

                  //更新混淆列表
                  obfuscatedList.子程序.push(obfuscatedNames[numKey]);

                  //事件
                  rules = rules.replace(
                    RegExp(`^\\b${dynamicList.子程序[numKey]}\\b;$`, "gm"),
                    `${obfuscatedNames[numKey]};`
                  );

                  //开始规则
                  rules = rules.replace(
                    RegExp(
                      `开始规则\\(\\b${dynamicList.子程序[numKey]}\\b,(.*)\\);`,
                      "g"
                    ),
                    `开始规则(${obfuscatedNames[numKey]},$1);`
                  );

                  //调用子程序
                  rules = rules.replace(
                    RegExp(
                      `调用子程序\\(\\b${dynamicList.子程序[numKey]}\\b\\);`,
                      "g"
                    ),
                    `调用子程序(${obfuscatedNames[numKey]});`
                  );
                });

                //混淆全局变量
                Object.entries(dynamicList.全局变量).forEach(([key]) => {
                  const numKey = parseInt(key);

                  //更新混淆列表
                  obfuscatedList.全局变量.push(obfuscatedNames[numKey]);

                  //前缀为 "全局."
                  rules = rules.replace(
                    RegExp(`全局\\.\\b${dynamicList.全局变量[numKey]}\\b`, "g"),
                    `全局.${obfuscatedNames[numKey]}`
                  );

                  //For 全局变量
                  rules = rules.replace(
                    RegExp(
                      `For 全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `For 全局变量(${obfuscatedNames[numKey]},$1,$2,$3);`
                  );
                  //设置全局变量
                  rules = rules.replace(
                    RegExp(
                      `设置全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*)\\);`,
                      "g"
                    ),
                    `设置全局变量(${obfuscatedNames[numKey]},$1);`
                  );
                  //修改全局变量
                  rules = rules.replace(
                    RegExp(
                      `修改全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*)\\);`,
                      "g"
                    ),
                    `修改全局变量(${obfuscatedNames[numKey]},$1,$2);`
                  );
                  //在索引处设置全局变量
                  rules = rules.replace(
                    RegExp(
                      `在索引处设置全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*)\\);`,
                      "g"
                    ),
                    `在索引处设置全局变量(${obfuscatedNames[numKey]},$1,$2);`
                  );
                  //在索引处修改全局变量
                  rules = rules.replace(
                    RegExp(
                      `在索引处修改全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `在索引处修改全局变量(${obfuscatedNames[numKey]},$1,$2,$3);`
                  );
                  //持续追踪全局变量
                  rules = rules.replace(
                    RegExp(
                      `持续追踪全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `持续追踪全局变量(${obfuscatedNames[numKey]},$1,$2,$3);`
                  );
                  //追踪全局变量频率
                  rules = rules.replace(
                    RegExp(
                      `追踪全局变量频率\\(\\b${dynamicList.全局变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `追踪全局变量频率(${obfuscatedNames[numKey]},$1,$2,$3);`
                  );
                  //停止追踪全局变量
                  rules = rules.replace(
                    RegExp(
                      `停止追踪全局变量\\(\\b${dynamicList.全局变量[numKey]}\\b\\);`,
                      "g"
                    ),
                    `停止追踪全局变量(${obfuscatedNames[numKey]});`
                  );
                });

                //混淆玩家变量
                Object.entries(dynamicList.玩家变量).forEach(([key]) => {
                  const numKey = parseInt(key);
                  //更新混淆列表
                  obfuscatedList.玩家变量.push(obfuscatedNames[numKey]);

                  //前缀为 "."
                  rules = rules.replace(
                    RegExp(`\\.\\b${dynamicList.玩家变量[numKey]}\\b`, "g"),
                    `.${obfuscatedNames[numKey]}`
                  );
                  //For 玩家变量
                  rules = rules.replace(
                    RegExp(
                      `For 玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `For 玩家变量($1,${obfuscatedNames[numKey]},$2,$3,$4);`
                  );
                  //设置玩家变量
                  rules = rules.replace(
                    RegExp(
                      `设置玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*)\\);`,
                      "g"
                    ),
                    `设置玩家变量($1,${obfuscatedNames[numKey]},$2);`
                  );
                  //修改玩家变量
                  rules = rules.replace(
                    RegExp(
                      `修改玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*)\\);`,
                      "g"
                    ),
                    `修改玩家变量($1,${obfuscatedNames[numKey]},$2,$3);`
                  );
                  //在索引处设置玩家变量
                  rules = rules.replace(
                    RegExp(
                      `在索引处设置玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*)\\);`,
                      "g"
                    ),
                    `在索引处设置玩家变量($1,${obfuscatedNames[numKey]},$2,$3);`
                  );
                  //在索引处修改玩家变量
                  rules = rules.replace(
                    RegExp(
                      `在索引处修改玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `在索引处修改玩家变量($1,${obfuscatedNames[numKey]},$2,$3,$4);`
                  );
                  //持续追踪玩家变量
                  rules = rules.replace(
                    RegExp(
                      `持续追踪玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `持续追踪玩家变量($1,${obfuscatedNames[numKey]},$2,$3,$4);`
                  );
                  //追踪玩家变量频率
                  rules = rules.replace(
                    RegExp(
                      `追踪玩家变量频率\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b,(.*),(.*),(.*)\\);`,
                      "g"
                    ),
                    `追踪玩家变量频率($1,${obfuscatedNames[numKey]},$2,$3,$4);`
                  );
                  //停止追踪玩家变量
                  rules = rules.replace(
                    RegExp(
                      `停止追踪玩家变量\\((.*),\\b${dynamicList.玩家变量[numKey]}\\b\\);`,
                      "g"
                    ),
                    `停止追踪玩家变量($1,${obfuscatedNames[numKey]});`
                  );
                });

                //清洗空行
                rules = rules.replace(/[\r\n]+/g, "");

                //规则处理
                const ruleList = rules
                  .replace(/((?:⟁规则|规则)\(""\))/g, "✂$1")
                  .split("✂")
                  .filter((rule) => {
                    //忽略空白
                    return rule.trim() !== "";
                  })
                  .map((rule) => {
                    //分解规则
                    return rule
                      .replace(/((?:条件|动作)\{)/g, "✂$1")
                      .split("✂")
                      .map((block) => {
                        if (block.startsWith("条件{")) {
                          return block
                            .replace(/({|;)/g, "$1✂")
                            .split("✂")
                            .map((entry) => {
                              //混淆索引
                              return options.includes(2)
                                ? entry.replace(
                                    /\[(\d+)\]/g,
                                    (match, number) => {
                                      // 预留330 = 查看器警告2 + 篡改保护25 + 填充规则300 + 允许继续的自身3
                                      if (
                                        elementCount >=
                                        (options.includes(0) ? 330 : 30)
                                      ) {
                                        //加密服务端计算条目其它索引
                                        elementCount -= 3;
                                        return `[乘(10000000, ${(
                                          parseInt(number) * 0.0000001
                                        ).toFixed(7)})]`;
                                      }
                                      return match;
                                    }
                                  )
                                : entry;
                            })
                            .join("\n");
                        } else if (block.startsWith("动作{")) {
                          return block
                            .replace(/({|;)/g, "$1✂")
                            .split("✂")
                            .filter((entry) => {
                              //忽略动作中的查看器条目或禁用条目
                              return [
                                "禁用查看器录制",
                                "启用查看器录制",
                                "记入查看器",
                              ].some((name) => entry.startsWith(name));
                            })
                            .map((entry) => {
                              //混淆索引
                              if (
                                [
                                  "开始镜头",
                                  "小字体信息",
                                  "大字体信息",
                                  "创建光束效果",
                                  "创建效果",
                                  "播放效果",
                                  "创建图标",
                                  "创建地图文本",
                                  "创建进度条地图文本",
                                  "创建HUD文本",
                                  "创建进度条HUD文本",
                                  "创建弹道",
                                  "创建弹道效果",
                                  "创建追踪弹道",
                                  "设置目标点描述",
                                ].some((name) => entry.startsWith(name))
                              ) {
                                if (options.includes(3)) {
                                  //加密客户端计算条目索引
                                  entry = entry.replace(
                                    /\[(\d+)\]/g,
                                    (_, number) => {
                                      return `[${(
                                        parseInt(number) +
                                        Math.random() * 0.8 -
                                        0.4
                                      ).toFixed(3)}]`;
                                    }
                                  );
                                }
                              } else {
                                if (options.includes(2)) {
                                  entry = entry.replace(
                                    /\[(\d+)\]/g,
                                    (match, number) => {
                                      // 预留330 = 查看器警告2 + 篡改保护25 + 填充规则300 + 允许继续的自身3
                                      if (
                                        elementCount >=
                                        (options.includes(0) ? 330 : 30)
                                      ) {
                                        //加密服务端计算条目其它索引
                                        elementCount -= 3;
                                        const value = parseInt(number);
                                        return `[乘(10000000, ${
                                          value === 0
                                            ? 0
                                            : (value * 0.0000001).toFixed(7)
                                        })]`;
                                      }
                                      return match;
                                    }
                                  );
                                }
                              }
                              return entry;
                            })
                            .join("\n");
                        } else {
                          return block;
                        }
                      })
                      .join("");
                  });

                //填充查看器警告 (2元素)
                if (elementCount >= 2) {
                  elementCount -= 2;
                  ruleList.unshift(
                    `规则("代码受到保护，请尊重作者劳动成果。守望先锋® 工坊语言支持"){事件{持续 - 全局;}动作{禁用查看器录制;}}`
                  );
                }

                //填充篡改保护 (25元素，5元素/个)
                for (let t = 0; t < 5; t++) {
                  if (elementCount >= 5) {
                    elementCount -= 5;
                    ruleList.splice(
                      Math.floor(Math.random() * (ruleList.length + 1)),
                      0,
                      `规则(""){事件{持续 - 全局;}条件{0.000${getRandomInt(
                        1,
                        4
                      )} == 假;}动作{While(真);End;}}`
                    );
                  } else {
                    break;
                  }
                }

                //映射规则
                let maxLength = Math.min(elementCount, 2500);
                let length = Math.floor(maxLength / (ruleList.length - 1));
                if (length === 0) {
                  length = 5;
                }
                for (let i = 0; i < ruleList.length; i++) {
                  obfuscatedRules.push(ruleList[i]);
                  //填充空白规则 (随机插入，1元素/个)
                  if (options.includes(0)) {
                    for (let j = 0; j < length; j++) {
                      if (elementCount > 0) {
                        obfuscatedRules.push(`规则(""){事件{持续 - 全局;}}`);
                      }
                    }
                  }
                }

                //合并规则
                rules = obfuscatedRules.join("");

                //还原禁用
                rules = rules.replace(/⟁/g, "禁用 ");

                //还原字符串
                rules = rules.replace(/❖/g, () => {
                  return `"${strings.shift()}"`;
                });

                //混淆规则名称
                //拟合 (17388 - 总规则数量) / 总规则数量 = 单规则名称倍率
                const nameLength =
                  (17388 - obfuscatedRules.length) / obfuscatedRules.length;
                rules = rules.replace(
                  /规则\(""\)/g,
                  () =>
                    `规则("${`\n${
                      obfuscatedNames[
                        Math.floor(Math.random() * obfuscatedNames.length)
                      ]
                    }`.repeat(getRandomInt(nameLength, nameLength + 2))}")`
                );

                //混淆子程序列表
                if (obfuscatedList.子程序.length > 0) {
                  shuffleArray(obfuscatedList.子程序);
                  subroutines += `子程序{\n`;
                  for (const i in obfuscatedList.子程序) {
                    subroutines += `${i}: ${obfuscatedList.子程序[i]}\n`;
                  }
                  subroutines += `}`;
                }

                //混淆变量列表
                variables += `变量{\n`;
                if (obfuscatedList.全局变量.length > 0) {
                  shuffleArray(obfuscatedList.全局变量);
                  variables += `全局:\n`;
                  for (const i in obfuscatedList.全局变量) {
                    variables += `${i}: ${obfuscatedList.全局变量[i]}\n`;
                  }
                }
                if (obfuscatedList.玩家变量.length > 0) {
                  shuffleArray(obfuscatedList.玩家变量);
                  variables += `玩家:\n`;
                  for (const i in obfuscatedList.玩家变量) {
                    variables += `${i}: ${obfuscatedList.玩家变量[i]}\n`;
                  }
                }
                variables += `}`;

                vscode.env.clipboard.writeText(
                  `${settings}\n${variables}\n${subroutines}\n${rules}`
                );
                vscode.window.showInformationMessage(
                  `${getFileNameFromPath(
                    document.fileName
                  )}（混淆）已导出到剪切板`
                );
                return;
              }
            });
        });
    } catch (error) {
      console.log("错误：ow.command.obfuscate 代码混淆能力");
      console.log(error);
    }
  }
);

export default disposable;