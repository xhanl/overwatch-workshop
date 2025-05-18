import * as vscode from "vscode";
import {
  buildHover,
  getDynamicKind,
  getDynamicList,
  getPrevValidWordRange,
  getScope,
} from "../utils";
import { 常量, 扩展, 规则 } from "../model";

class HoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.Hover> {
    try {
      const hoverRange = document.getWordRangeAtPosition(position);
      if (!hoverRange) {
        return;
      }
      const hoverText = document.getText(hoverRange);
      //vscode.window.showInformationMessage(hoverText); // 调试
      const scope = getScope(document, position);
      const theme =
        vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark
          ? "深色"
          : "浅色";

      if (scope.name === "扩展") {
        if (扩展.hasOwnProperty(hoverText)) {
          return buildHover({
            name: hoverText,
            tags: 扩展[hoverText as keyof typeof 扩展].标签,
            details: 扩展[hoverText as keyof typeof 扩展].提示,
          });
        }
      } else if (scope.name === "事件") {
        for (const value of Object.values(规则.事件)) {
          for (const eventValue of Object.values(value)) {
            if (eventValue.名称 === hoverText) {
              if (eventValue.悬停) {
                if (eventValue.悬停?.hasOwnProperty(theme)) {
                  return eventValue.悬停[theme as keyof typeof eventValue.悬停];
                } else {
                  return eventValue.悬停;
                }
              } else {
                throw new Error("规则.事件.悬停 未定义");
              }
            }
          }
        }
        return matchDynamicHover();
      } else if (scope.name === "条件") {
        if (规则.条件.hasOwnProperty(hoverText)) {
          return 规则.条件[hoverText].悬停;
        }
        const constantHover = matchConstantHover();
        if (constantHover) {
          return constantHover;
        }
        const dynamicHover = matchDynamicHover();
        if (dynamicHover) {
          return dynamicHover;
        }
      } else if (scope.name === "动作") {
        if (规则.动作.hasOwnProperty(hoverText)) {
          return 规则.动作[hoverText].悬停;
        }
        if (规则.条件.hasOwnProperty(hoverText)) {
          return 规则.条件[hoverText].悬停;
        }
        const constantHover = matchConstantHover();
        if (constantHover) {
          return constantHover;
        }
        const dynamicHover = matchDynamicHover();
        if (dynamicHover) {
          return dynamicHover;
        }
      }

      //匹配常量悬停
      function matchConstantHover() {
        for (const value of Object.values(常量)) {
          for (const constantValue of Object.values(value)) {
            if (constantValue.名称 === hoverText) {
              if (constantValue.悬停) {
                if (constantValue.悬停?.hasOwnProperty(theme)) {
                  return constantValue.悬停[
                    theme as keyof typeof constantValue.悬停
                  ];
                } else {
                  return constantValue.悬停;
                }
              } else {
                throw new Error("常量.悬停 未定义");
              }
            }
          }
        }
      }

      //匹配动态悬停
      function matchDynamicHover(): vscode.Hover | undefined {
        let match;
        if ((match = hoverText.match(/\b[_a-zA-Z][_a-zA-Z0-9]*\b/))) {
          const range = getPrevValidWordRange(document, position);
          const text = document.getText(range);
          const dynamicList = getDynamicList(document);
          const dynamicKind = getDynamicKind(text);

          // vscode.window.showInformationMessage(`文本：${text}, 类型：${dynamicKind}`); // 调试

          if (dynamicKind === "所有变量") {
            return buildVariableHover();
          } else if (dynamicKind === "全局变量") {
            return buildGlobalVariableHover();
          } else if (dynamicKind === "玩家变量") {
            return buildPlayerVariableHover();
          } else if (dynamicKind === "子程序") {
            return buildSubroutineHover();
          }
          return;

          function buildVariableHover(): vscode.Hover | undefined {
            let globalVariableIndex = "";
            for (const i in dynamicList.全局变量) {
              if (hoverText === dynamicList.全局变量[i]) {
                globalVariableIndex = i;
                break;
              }
            }

            let playerVariableIndex = "";
            for (const i in dynamicList.玩家变量) {
              if (hoverText === dynamicList.玩家变量[i]) {
                playerVariableIndex = i;
                break;
              }
            }

            const globalVariableExists = globalVariableIndex.length > 0;
            const playerVariableExists = playerVariableIndex.length > 0;

            if (globalVariableExists && playerVariableExists) {
              return buildHover({
                name: hoverText,
                tags: [
                  "全局变量",
                  globalVariableIndex,
                  "玩家变量",
                  playerVariableIndex,
                ],
                details: `一个已定义的全局变量或玩家变量。`,
              });
            } else if (globalVariableExists) {
              return buildHover({
                name: hoverText,
                tags: ["全局变量", globalVariableIndex],
                details: `一个已定义的全局变量。`,
              });
            } else if (playerVariableExists) {
              return buildHover({
                name: hoverText,
                tags: ["玩家变量", playerVariableIndex],
                details: `一个已定义的玩家变量。`,
              });
            }
          }

          function buildGlobalVariableHover(): vscode.Hover | undefined {
            for (const i in dynamicList.全局变量) {
              if (hoverText === dynamicList.全局变量[i]) {
                return buildHover({
                  name: hoverText,
                  tags: ["全局变量", i],
                  details: `一个已定义的全局变量。`,
                });
              }
            }
          }

          function buildPlayerVariableHover(): vscode.Hover | undefined {
            for (const i in dynamicList.玩家变量) {
              if (hoverText === dynamicList.玩家变量[i]) {
                return buildHover({
                  name: hoverText,
                  tags: ["玩家变量", i],
                  details: `一个已定义的玩家变量。`,
                });
              }
            }
          }

          function buildSubroutineHover(): vscode.Hover | undefined {
            for (const i in dynamicList.子程序) {
              if (hoverText === dynamicList.子程序[i]) {
                return buildHover({
                  name: hoverText,
                  tags: ["子程序", i],
                  details: `一个已定义的子程序。`,
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.log("错误：provideHover 悬停提示能力");
      console.log(error);
    }
  }
}

//悬停提示能力
const disposable = vscode.languages.registerHoverProvider(
  "ow",
  new HoverProvider(),
);

export default disposable;
