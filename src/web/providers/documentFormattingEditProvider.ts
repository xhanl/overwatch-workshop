import * as vscode from "vscode";

class DocumentFormattingEditProvider
  implements vscode.DocumentFormattingEditProvider
{
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {
    try {
      const text = document.getText();
      const indentations = [];
      const pattern =
        /(?:"(?:\\"|[^"])*"|\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)|\{|\}|\[|\]|\(|\)|全局:|玩家:|For 全局变量|For 玩家变量|While|If|Else If|Else|End/g;
      let isVariable = false;
      let level = 0;
      let ignore = 0;
      let match;
      while ((match = pattern.exec(text))) {
        switch (match[0]) {
          case "[":
          case "(":
            indentations[document.positionAt(match.index).line + 1] = --ignore;
            break;

          case "]":
          case ")":
            indentations[document.positionAt(match.index).line + 1] =
              ++ignore === 0 ? level : ignore;
            break;

          case "{":
          case "For 全局变量":
          case "For 玩家变量":
          case "While":
          case "If":
            indentations[document.positionAt(match.index).line + 1] = ++level;
            break;

          case "}":
          case "End":
            if (isVariable) {
              --level;
              isVariable = false;
            }
            indentations[document.positionAt(match.index).line] = --level;
            break;

          case "Else If":
          case "Else":
            indentations[document.positionAt(match.index).line] = --level;
            indentations[document.positionAt(match.index).line + 1] = ++level;
            break;

          case "全局:":
          case "玩家:":
            if (isVariable) {
              indentations[document.positionAt(match.index).line] = --level;
            }
            indentations[document.positionAt(match.index).line + 1] = ++level;
            isVariable = true;
            break;
        }
      }

      let formatLines = [];
      let indentation = 0;
      for (let i = 0; i < document.lineCount; i++) {
        if (indentations.hasOwnProperty(i)) {
          indentation = indentations[i];
        }
        if (indentation < 0) {
          continue;
        }

        const line = document.lineAt(i);
        const trimText = line.text.trim();
        if (trimText === "") {
          continue;
        }

        formatLines.push(
          new vscode.TextEdit(
            line.range,
            (options.insertSpaces
              ? " ".repeat(indentation * options.tabSize)
              : "\t".repeat(indentation)) + trimText
          )
        );
      }

      return formatLines;
    } catch (error) {
      console.log(error);
    }
  }
}

//代码整理能力
const disposable = vscode.languages.registerDocumentFormattingEditProvider(
  "ow",
  new DocumentFormattingEditProvider()
);

export default disposable;
