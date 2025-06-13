import * as vscode from "vscode";
import {
  getDynamicList,
  getObfuscatedNames,
  getRandomInt,
  shuffleArray,
} from "../utils";

//代码混淆能力
const disposable = vscode.commands.registerCommand(
  "ow.command.obfuscate",
  () => {
    try {
      // 获取配置
      const config = vscode.workspace.getConfiguration('ow.obfuscate');
      const rememberSettings = config.get<boolean>('enableMemory', true);
      const lastElementCount = config.get<number | null>('lastElementCount', null);
      const lastOptions = config.get<number[]>('lastOptions', [0, 1, 2, 3]);

      vscode.window
        .showInputBox({
          title: "混淆生成  1 / 2",
          placeHolder: "如何获取：地图工坊 → 显示诊断结果 → 总计元素数量",
          prompt: "请提供原生代码的总元素数量",
          value: rememberSettings ? lastElementCount?.toString() : undefined,
          validateInput: (value) => {
            const intValue = parseInt(value);
            if (isNaN(intValue)) {
              return "无效输入";
            } else if (intValue > 32768) {
              return `超出游戏限制 (最多32768个)`;
            } else if (intValue < 1) {
              return `低于最低限制 (最少1个)`;
            }
          },
        })
        .then((value) => {
          if (value === undefined) {
            //用户取消
            return;
          }

          // 添加记忆功能选项
          const pickItems = [
            {
              label: "记住设置",
              description: "记住本次输入的元素数量和选项，下次自动填入",
              index: -1,
              picked: rememberSettings,
            },
            {
              label: "混淆规则",
              description: "填充虚假规则",
              index: 0,
              picked: rememberSettings ? lastOptions.includes(0) : true,
            },
            {
              label: "混淆变量",
              description: "修改变量和子程序名称为不可读文本，填充虚假变量",
              index: 1,
              picked: rememberSettings ? lastOptions.includes(1) : true,
            },
            {
              label: "混淆字符",
              description: "隐藏字符串，但影响字符比较，例如字符串比较玩家名称。使用注释标记 `/* @SKIP_OBFUSCATE_STRING */` 和 `/* @SKIP_OBFUSCATE_STRING_END */` 来跳过这些",
              index: 2,
              picked: rememberSettings ? lastOptions.includes(2) : true,
            },
            {
              label: "混淆索引",
              description: "使二次复制的代码索引数值损毁，但影响服务器负载",
              index: 3,
              picked: rememberSettings ? lastOptions.includes(3) : true,
            },
            {
              label: "混淆本地索引",
              description: "使本地索引数值不可读，但影响客户端帧率",
              index: 4,
              picked: rememberSettings ? lastOptions.includes(4) : false,
            },
          ];
          vscode.window
            .showQuickPick(pickItems, {
              title: "混淆生成  2 / 2",
              placeHolder: "增强选项",
              canPickMany: true,
            })
            .then((selected) => {
              if (selected === undefined) {
                //用户取消
                return;
              }

              //获取用户配置
              const rememberOption = selected.find(option => option.index === -1);
              const shouldRemember = rememberOption !== undefined;

              const options = selected
                .filter(option => option.index >= 0)
                .map(option => option.index);

              // 保存设置
              if (shouldRemember) {
                config.update('rememberSettings', true, vscode.ConfigurationTarget.Global);
                config.update('lastElementCount', parseInt(value), vscode.ConfigurationTarget.Global);
                config.update('lastOptions', options, vscode.ConfigurationTarget.Global);
              } else {
                config.update('rememberSettings', false, vscode.ConfigurationTarget.Global);
              }

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
                let obfuscatedRules = [];

                //分离 设置，变量，子程序，规则
                let block;
                let range;
                let stack = 0;
                for (let i = 0; i < document.lineCount; i++) {
                  const line = document.lineAt(i);
                  const trimText = line.text.trim();
                  let match;
                  if (
                    stack === 0 &&
                    (match = trimText.match(
                      /^(?:设置|变量|子程序|(?:禁用\s*)?规则).*$/
                    ))
                  ) {
                    if (trimText.startsWith("设置")) {
                      block = "设置";
                    } else if (trimText.startsWith("变量")) {
                      block = "变量";
                    } else if (trimText.startsWith("子程序")) {
                      block = "子程序";
                    } else if (trimText.startsWith("禁用") || trimText.startsWith("规则")) {
                      block = "规则";
                    }
                    range = line.range;

                    // 兼容行尾括号格式
                    if (trimText.endsWith("{")) {
                      vscode.window.showWarningMessage(
                        `格式不标准：请为第 ${i + 1} 行中的 "{" 单独换行，否则可能导致解析错误`
                      );
                      stack++;
                    }
                  } else if (trimText === "{") {
                    stack++;
                  } else if (trimText.endsWith("}")) { // 兼容行尾括号格式
                    if (trimText !== "}") {
                      vscode.window.showWarningMessage(
                        `格式不标准：请为第 ${i + 1} 行中的 "}" 单独换行，否则可能导致解析错误`
                      );
                    }

                    stack--;
                    if (stack === 0) {
                      switch (block) {
                        case "设置":
                          {
                            if (range === undefined) {
                              throw new Error("无法获取设置范围");
                            }
                            settings = document.getText(
                              range.union(line.range)
                            );
                            //vscode.window.showInformationMessage(settings);
                          }
                          break;
                        case "变量":
                          {
                            if (range === undefined) {
                              throw new Error("无法获取设置范围");
                            }
                            variables = document.getText(
                              range.union(line.range)
                            );
                            //vscode.window.showInformationMessage(variables);
                          }
                          break;
                        case "子程序":
                          {
                            if (range === undefined) {
                              throw new Error("无法获取设置范围");
                            }
                            subroutines = document.getText(
                              range.union(line.range)
                            );
                            //vscode.window.showInformationMessage(subroutines);
                          }
                          break;
                        case "规则":
                          {
                            i = document.lineCount - 1;
                            if (range === undefined) {
                              throw new Error("无法获取设置范围");
                            }
                            rules = document.getText(
                              range.union(document.lineAt(i).range)
                            );
                            //vscode.window.showInformationMessage(rules);
                          }
                          break;
                      }
                    }
                  }
                }

                //替换字符内容 / 移除注释 / 替换禁用（同时进行并为字符串设置高优先级避免冲突，例如字符串中可能包含注释格式//但不应该被解析为注释）
                let skip_obfuscate_string = false;
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
                        (options.includes(2) && !skip_obfuscate_string)
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
                      if (match === "/* @SKIP_OBFUSCATE_STRING */") {
                        //跳过混淆字符开始标记
                        skip_obfuscate_string = true;
                      } else if (match === "/* @SKIP_OBFUSCATE_STRING_END */") {
                        //跳过混淆字符结束标记
                        skip_obfuscate_string = false;
                      }

                      //移除单行和多行注释
                      //console.log(`移除行注释：${match} → 🗑️`);
                      return "";

                    } else if (match.startsWith("禁用")) {
                      //替换禁用
                      //console.log(`替换禁用：${match} → ⟁`);
                      return "⟁";
                    }
                    throw new Error(`无法处理的内容：${match}`);
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
                if (options.includes(1)) {
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
                  for (const i in dynamicList.子程序) {
                    const index = parseInt(i);
                    const name = dynamicList.子程序[index].name;
                    const obfuscatedName = obfuscatedNames[index];

                    //更新混淆列表
                    obfuscatedList.子程序.push(obfuscatedName);

                    //事件
                    rules = rules.replace(
                      RegExp(`^\\b${name}\\b;$`, "gm"),
                      `${obfuscatedName};`
                    );
                    //开始规则
                    rules = rules.replace(
                      RegExp(
                        `开始规则\\(\\b${name}\\b,(.*)\\);`,
                        "g"
                      ),
                      `开始规则(${obfuscatedName},$1);`
                    );
                    //调用子程序
                    rules = rules.replace(
                      RegExp(
                        `调用子程序\\(\\b${name}\\b\\);`,
                        "g"
                      ),
                      `调用子程序(${obfuscatedName});`
                    );
                  }

                  //混淆全局变量
                  for (const i in dynamicList.全局变量) {
                    const index = parseInt(i);
                    const name = dynamicList.全局变量[index].name;
                    const obfuscatedName = obfuscatedNames[index];

                    //更新混淆列表
                    obfuscatedList.全局变量.push(obfuscatedName);

                    //前缀为 "全局."
                    rules = rules.replace(
                      RegExp(`全局\\.\\b${name}\\b`, "g"),
                      `全局.${obfuscatedName}`
                    );

                    //For 全局变量
                    rules = rules.replace(
                      RegExp(
                        `For 全局变量\\(\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `For 全局变量(${obfuscatedName},$1,$2,$3);`
                    );
                    //设置全局变量
                    rules = rules.replace(
                      RegExp(
                        `设置全局变量\\(\\b${name}\\b,(.*)\\);`,
                        "g"
                      ),
                      `设置全局变量(${obfuscatedName},$1);`
                    );
                    //修改全局变量
                    rules = rules.replace(
                      RegExp(
                        `修改全局变量\\(\\b${name}\\b,(.*),(.*)\\);`,
                        "g"
                      ),
                      `修改全局变量(${obfuscatedName},$1,$2);`
                    );
                    //在索引处设置全局变量
                    rules = rules.replace(
                      RegExp(
                        `在索引处设置全局变量\\(\\b${name}\\b,(.*),(.*)\\);`,
                        "g"
                      ),
                      `在索引处设置全局变量(${obfuscatedName},$1,$2);`
                    );
                    //在索引处修改全局变量
                    rules = rules.replace(
                      RegExp(
                        `在索引处修改全局变量\\(\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `在索引处修改全局变量(${obfuscatedName},$1,$2,$3);`
                    );
                    //持续追踪全局变量
                    rules = rules.replace(
                      RegExp(
                        `持续追踪全局变量\\(\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `持续追踪全局变量(${obfuscatedName},$1,$2,$3);`
                    );
                    //追踪全局变量频率
                    rules = rules.replace(
                      RegExp(
                        `追踪全局变量频率\\(\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `追踪全局变量频率(${obfuscatedName},$1,$2,$3);`
                    );
                    //停止追踪全局变量
                    rules = rules.replace(
                      RegExp(
                        `停止追踪全局变量\\(\\b${name}\\b\\);`,
                        "g"
                      ),
                      `停止追踪全局变量(${obfuscatedName});`
                    );
                  }

                  //混淆玩家变量
                  for (const i in dynamicList.玩家变量) {
                    const index = parseInt(i);
                    const name = dynamicList.玩家变量[index].name;
                    const obfuscatedName = obfuscatedNames[index];

                    //更新混淆列表
                    obfuscatedList.玩家变量.push(obfuscatedName);

                    //前缀为 "." 但不为 "全局."
                    rules = rules.replace(
                      RegExp(`(?<!全局)\\.\\b${name}\\b`, "g"),
                      `.${obfuscatedName}`
                    );
                    //For 玩家变量
                    rules = rules.replace(
                      RegExp(
                        `For 玩家变量\\((.*),\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `For 玩家变量($1,${obfuscatedName},$2,$3,$4);`
                    );
                    //设置玩家变量
                    rules = rules.replace(
                      RegExp(
                        `设置玩家变量\\((.*),\\b${name}\\b,(.*)\\);`,
                        "g"
                      ),
                      `设置玩家变量($1,${obfuscatedName},$2);`
                    );
                    //修改玩家变量
                    rules = rules.replace(
                      RegExp(
                        `修改玩家变量\\((.*),\\b${name}\\b,(.*),(.*)\\);`,
                        "g"
                      ),
                      `修改玩家变量($1,${obfuscatedName},$2,$3);`
                    );
                    //在索引处设置玩家变量
                    rules = rules.replace(
                      RegExp(
                        `在索引处设置玩家变量\\((.*),\\b${name}\\b,(.*),(.*)\\);`,
                        "g"
                      ),
                      `在索引处设置玩家变量($1,${obfuscatedName},$2,$3);`
                    );
                    //在索引处修改玩家变量
                    rules = rules.replace(
                      RegExp(
                        `在索引处修改玩家变量\\((.*),\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `在索引处修改玩家变量($1,${obfuscatedName},$2,$3,$4);`
                    );
                    //持续追踪玩家变量
                    rules = rules.replace(
                      RegExp(
                        `持续追踪玩家变量\\((.*),\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `持续追踪玩家变量($1,${obfuscatedName},$2,$3,$4);`
                    );
                    //追踪玩家变量频率
                    rules = rules.replace(
                      RegExp(
                        `追踪玩家变量频率\\((.*),\\b${name}\\b,(.*),(.*),(.*)\\);`,
                        "g"
                      ),
                      `追踪玩家变量频率($1,${obfuscatedName},$2,$3,$4);`
                    );
                    //停止追踪玩家变量
                    rules = rules.replace(
                      RegExp(
                        `停止追踪玩家变量\\((.*),\\b${name}\\b\\);`,
                        "g"
                      ),
                      `停止追踪玩家变量($1,${obfuscatedName});`
                    );
                  }

                  //混淆子程序列表
                  subroutines = `子程序{\n`;
                  shuffleArray(obfuscatedNames);
                  for (const i in obfuscatedNames) {
                    subroutines += `${i}: ${obfuscatedNames[i]}\n`;
                  }
                  subroutines += `}`;

                  //混淆变量列表
                  variables = `变量{\n`;

                  shuffleArray(obfuscatedNames);
                  variables += `全局:\n`;
                  for (const i in obfuscatedNames) {
                    variables += `${i}: ${obfuscatedNames[i]}\n`;
                  }

                  shuffleArray(obfuscatedNames);
                  variables += `玩家:\n`;
                  for (const i in obfuscatedNames) {
                    variables += `${i}: ${obfuscatedNames[i]}\n`;
                  }

                  variables += `}`;
                }

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
                              return options.includes(3)
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
                              return ![
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
                                if (options.includes(4)) {
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
                                if (options.includes(3)) {
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
                                        return `[乘(10000000, ${value === 0
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

                vscode.env.clipboard.writeText(
                  `${settings}\n${variables}\n${subroutines}\n${rules}`
                );
                vscode.window.showInformationMessage(
                  `${document.fileName}（混淆）已导出到剪切板`
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
