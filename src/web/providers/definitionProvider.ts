import * as vscode from "vscode";
import {
  getDynamicList,
  getPrevValidWordRange,
  getRuleDynamicKind,
  getScope,
} from "../utils";

class DefinitionProvider implements vscode.DefinitionProvider {
  async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
  ): Promise<vscode.Definition | vscode.DefinitionLink[] | undefined> {
    try {
      const workRange = document.getWordRangeAtPosition(position);
      if (!workRange) {
        return;
      }

      const wordText = document.getText(workRange);
      if (wordText === "") {
        return;
      }

      let match;
      if ((match = wordText.match(/\b[_a-zA-Z][_a-zA-Z0-9]*\b/))) {
        const prevWordRange = getPrevValidWordRange(document, position);
        if (!prevWordRange) {
          return;
        }

        const prevWordText = document.getText(prevWordRange);
        if (prevWordText === "") {
          return;
        }

        let dynamicKind;
        const scope = getScope(document, position);
        if (scope.name === "变量") {
          for (let i = position.line; i >= 0; i--) {
            const line = document.lineAt(i);
            const lineText = line.text.trim();
            if (lineText === "玩家:") {
              dynamicKind = "玩家变量";
              break;
            } else if (lineText === "全局:") {
              dynamicKind = "全局变量";
              break;
            } else if (lineText.endsWith("{")) {
              break;
            }
          }
        } else if (scope.name === "子程序") {
          dynamicKind = "子程序";
        } else {
          dynamicKind = getRuleDynamicKind(prevWordText);
        }

        //vscode.window.showInformationMessage(`dynamicKind: ${dynamicKind}`); // 调试

        const dynamicList = getDynamicList(document);
        if (dynamicList === undefined) {
          return;
        }

        if (dynamicKind === "全局变量") {
          for (const i in dynamicList.全局变量) {
            const name = dynamicList.全局变量[i].name;
            const range = dynamicList.全局变量[i].range;
            if (range && wordText === name) {
              return new vscode.Location(
                document.uri,
                range,
              );
            }
          }
        } else if (dynamicKind === "玩家变量") {
          for (const i in dynamicList.玩家变量) {
            const name = dynamicList.玩家变量[i].name;
            const range = dynamicList.玩家变量[i].range;
            if (range && wordText === name) {
              return new vscode.Location(
                document.uri,
                range,
              );
            }
          }
        } else if (dynamicKind === "子程序") {
          for (const i in dynamicList.子程序) {
            const name = dynamicList.子程序[i].name;
            const range = dynamicList.子程序[i].range;
            if (range && wordText === name) {
              return new vscode.Location(
                document.uri,
                range,
              );
            }
          }

          vscode.window.showWarningMessage(`是否忘记声明为变量/子程序？`);
        }
      }
    } catch (error) {
      console.error("provideRenameEdits 跳转定义能力", error);
    }
  }
}

//跳转定义能力
const disposable = vscode.languages.registerDefinitionProvider(
  "ow",
  new DefinitionProvider(),
);

export default disposable;
