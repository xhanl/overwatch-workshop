import * as vscode from "vscode";

//导入修复能力
const disposable = vscode.commands.registerCommand(
  "ow.command.import",
  () => {
    try {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        vscode.env.clipboard.readText().then((text) => {
          text = text.replace(
            /(创建地图文本|创建HUD文本|创建进度条地图文本|创建进度条HUD文本)\s*\((.*),\s*无\s*,(.*)\)\s*;/g,
            "$1($2, 全部禁用,$3);"
          );
          text = text.replace(
            /(追踪全局变量频率|追踪玩家变量频率|持续追踪全局变量|持续追踪玩家变量|开始治疗调整|设置不可见)\s*\((.*),\s*无\s*\)\s*;/g,
            "$1($2, 全部禁用);"
          );
          const edit = new vscode.WorkspaceEdit();
          const wholeDocumentRange = activeEditor.document.validateRange(
            new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
          );
          edit.replace(activeEditor.document.uri, wholeDocumentRange, text);
          vscode.workspace.applyEdit(edit);
          vscode.window.showInformationMessage(
            `${activeEditor.document.fileName} 已导入并修复`
          );
        });
      }
    } catch (error) {
      console.log("错误：ow.command.paste 修复导入能力");
      console.log(error);
    }
  }
);

export default disposable;