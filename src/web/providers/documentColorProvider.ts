import * as vscode from "vscode";

class DocumentColorProvider implements vscode.DocumentColorProvider {
  provideDocumentColors(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.ColorInformation[]> {
    try {
      const text = document.getText();
      const pattern =
        /自定义颜色\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
      let colors = [];
      let match;
      while ((match = pattern.exec(text))) {
        colors.push(
          new vscode.ColorInformation(
            new vscode.Range(
              document.positionAt(match.index),
              document.positionAt(match.index + match[0].length)
            ),
            new vscode.Color(
              parseInt(match[1]) / 255,
              parseInt(match[2]) / 255,
              parseInt(match[3]) / 255,
              parseInt(match[4]) / 255
            )
          )
        );
      }
      return colors;
    } catch (error) {
      console.log("错误：provideDocumentColors 调色盘能力");
      console.log(error);
    }
  }
  provideColorPresentations(
    color: vscode.Color,
    context: {
      readonly document: vscode.TextDocument;
      readonly range: vscode.Range;
    },
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.ColorPresentation[]> {
    try {
      const newColor =
        "自定义颜色(" +
        Math.floor(color.red * 255) +
        ", " +
        Math.floor(color.green * 255) +
        ", " +
        Math.floor(color.blue * 255) +
        ", " +
        Math.floor(color.alpha * 255) +
        ")";
      return [new vscode.ColorPresentation(newColor)];
    } catch (error) {
      console.log("错误：provideColorPresentations 调色盘能力");
      console.log(error);
    }
  }
}

//调色盘能力
const disposable = vscode.languages.registerColorProvider(
  "ow",
  new DocumentColorProvider()
);

export default disposable;
