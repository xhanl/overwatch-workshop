import * as vscode from "vscode";
import { getEntry, getScope, getSubroutineIndex, getVariableIndex } from "../utils";
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
        const scope = getScope(event.document, change.range.start);

        if (scope.name === "条件" || scope.name === "动作") {
          const entry = getEntry(event.document, change.range.start, scope);
          if (entry === undefined) {
            return;
          }

          vscode.window.showInformationMessage(`scope: ${JSON.stringify(scope)}`); // 调试
          vscode.window.showInformationMessage(`entry: ${JSON.stringify(entry)}`); // 调试
          if (scope.range === undefined) {
            return;
          }

          const position = change.range.start;
          if (entry.index === undefined) {
            // 识别光标前是否有内容
            const wordRange = event.document.getWordRangeAtPosition(position, /[.a-zA-Z0-9_\u4e00-\u9fa5]+/);
            if (wordRange === undefined) {
              return;
            }
            const word = event.document.getText(wordRange);
            if (word.trim().length === 0) {
              return;
            }
          }

          // 计算光标在scope中的相对位置
          const scopeText = event.document.getText(scope.range);
          const scopeStartOffset = event.document.offsetAt(scope.range.start);
          const positionOffset = event.document.offsetAt(position);
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
        const scope = getScope(event.document, change.range.start);
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