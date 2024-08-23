import * as vscode from "vscode";
import { getEntry, getNextValidPosition, getScope } from "../utils";
import { 规则 } from "../model";

class DocumentSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider
{
  provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.SemanticTokens> {
    const builder = new vscode.SemanticTokensBuilder();
    try {
      let pos: vscode.Position | undefined = new vscode.Position(0, 0);
      while (document.validatePosition(pos)) {
        const range = document.getWordRangeAtPosition(pos);
        if (range) {
          const word = document.getText(range);
          const match = word.match(
            /^(字符串|正在防守|颜色|添加至数组|受治疗者，治疗者及治疗百分比|生命值|上|下|方向，速率，及最大速度)$/
          );
          if (match) {
            const scope = getScope(document, pos);
            const entry = getEntry(document, pos, scope);
            if (entry && entry.index) {
              if (规则.动作.hasOwnProperty(entry.kind)) {
                const params = 规则.动作[entry.kind].参数;
                if (params === undefined) {
                  throw new Error("规则.动作.参数 未定义");
                }
                const param = params[entry.index];
                if (param && param.hasOwnProperty("选项")) {
                  builder.push(
                    range.start.line,
                    range.start.character,
                    word.length,
                    0
                  );
                }
              } else if (规则.条件.hasOwnProperty(entry.kind)) {
                const params = 规则.条件[entry.kind].参数;
                if (params === undefined) {
                  throw new Error("规则.条件.参数 未定义");
                }
                const param = params[entry.index];
                if (param && param.hasOwnProperty("选项")) {
                  builder.push(
                    range.start.line,
                    range.start.character,
                    word.length,
                    0
                  );
                }
              }
            }
          }
          pos = getNextValidPosition(document, range.end);
          if (!pos) {
            break;
          }
          continue;
        }
        pos = getNextValidPosition(document, pos);
        if (!pos) {
          break;
        }
      }
    } catch (error) {
      console.log("错误：provideDocumentSemanticTokens 语法高亮能力" + error);
    } finally {
      return builder.build();
    }
  }
}

//语法高亮能力：仅纠正Textmate冲突项
const disposable = vscode.languages.registerDocumentSemanticTokensProvider(
  "ow",
  new DocumentSemanticTokensProvider(),
  new vscode.SemanticTokensLegend([`constants`])
);
export default disposable;
