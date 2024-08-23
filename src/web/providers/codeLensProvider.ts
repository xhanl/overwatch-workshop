import * as vscode from "vscode";

class CodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    try {
      const codeLens: vscode.CodeLens[] = [];
      const text = document.getText();
      const pattern = /(禁用\s*)?规则\s*\(\s*"/g;
      let match;
      while ((match = pattern.exec(text))) {
        const matchText = match[0];
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + matchText.length);
        const range = new vscode.Range(startPos, endPos);
        const toggleCommand = {
          title: `切换开关`,
          command: "ow.toggle.disableRule",
          arguments: [{ document, range }],
        };
        const newCodeLens = new vscode.CodeLens(range, toggleCommand);
        codeLens.push(newCodeLens);
      }
      return codeLens;
    } catch (error) {
      console.log("错误：provideCodeLenses 切换开关能力");
      console.log(error);
    }
  }
}

//代码整理能力
const disposable = vscode.languages.registerCodeLensProvider(
  "ow",
  new CodeLensProvider()
);

export default disposable;
