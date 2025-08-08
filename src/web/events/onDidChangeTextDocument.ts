import * as vscode from "vscode";
import { getEntry, getPrevValidWordRange, getScope, getSubroutineIndex, getVariableIndex } from "../utils";
import { 规则 } from "../model";

//补全占位符监视
const disposable = vscode.workspace.onDidChangeTextDocument((event) => {
  try {
    const changes = event.contentChanges;
    for (const change of changes) {
      if (
        (change.text === "" && change.rangeLength > 0) ||
        change.text === " "
      ) {
        const scope = getScope(event.document, change.range.end);

        if (scope.name === "条件" || scope.name === "动作") {
          const entry = getEntry(event.document, change.range.end, scope);
          if (entry === undefined) {
            return;
          }

          //vscode.window.showInformationMessage(`scope: ${JSON.stringify(scope)}`); // 调试
          //vscode.window.showInformationMessage(`entry: ${JSON.stringify(entry)}`); // 调试
          if (scope.range === undefined) {
            return;
          }

          if (entry.index === undefined) {
            const wordRange = getPrevValidWordRange(event.document, change.range.start, /\s|[.\{\}\[\]\(\)\+\-\*\/\^\%\<\>\=\!\?\|\&\:\;\"]|[_a-zA-Z0-9\u4e00-\u9fa5]/, true);
            if (wordRange === undefined) {
              return;
            }
            if (wordRange.start.character === 0) {
              return;
            }
            const word = event.document.getText(wordRange);
            //vscode.window.showInformationMessage(`word: ${word}`); // 调试

            if (word.trim().length === 0) {
              return;
            }
            if (word === "{" || word === ";" || word === "\"") {
              return;
            }
          }

          // 计算光标在scope中的相对位置
          const scopeText = event.document.getText(scope.range);
          const scopeStartOffset = event.document.offsetAt(scope.range.start);
          const positionOffset = event.document.offsetAt(change.range.end);
          const relativeOffset = positionOffset - scopeStartOffset;
          const beforeText = scopeText.substring(0, relativeOffset);

          // 检查是否在注释中
          const singleLineCommentMatch = beforeText.match(/\/\/[^\r\n]*$/);
          const multiLineCommentStart = beforeText.lastIndexOf('/*');
          const multiLineCommentEnd = beforeText.lastIndexOf('*/');
          const inMultiLineComment = multiLineCommentStart > multiLineCommentEnd && multiLineCommentStart !== -1;
          const inComment = singleLineCommentMatch || inMultiLineComment;

          // 检查是否在字符串中（检查引号配对）
          const quoteCount = (beforeText.match(/"/g) || []).length;
          const inString = quoteCount % 2 === 1;

          if (!inComment && !inString) {
            vscode.commands.executeCommand("ow.command.suggest");
          }
        }
      } else if (change.text.includes("\n") && change.rangeLength === 0) {
        const scope = getScope(event.document, change.range.end);
        if (scope.name === "变量") {
          const line = event.document.lineAt(change.range.end.line);
          const text = line.text;
          const index = getVariableIndex(text);
          if (index === undefined) {
            return;
          }
          vscode.commands.executeCommand("ow.command.suggest");
        } else if (scope.name === "子程序") {
          const line = event.document.lineAt(change.range.end.line);
          const text = line.text;
          const index = getSubroutineIndex(text);
          if (index === undefined) {
            return;
          }
          vscode.commands.executeCommand("ow.command.suggest");
        }
      }
    }
  } catch (error) {
    console.log("错误：onDidChangeTextDocument 补全占位符监视");
    console.log(error);
  }
});

export default disposable;