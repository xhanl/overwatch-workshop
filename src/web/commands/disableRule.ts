import * as vscode from "vscode";

//切换开关行为
const disposable = vscode.commands.registerCommand(
  "ow.toggle.disableRule",
  (args) => {
    try {
      const { document, range } = args;
      let text = document.getText(range);
      if (text.startsWith("禁用")) {
        text = text.replace(/禁用\s*/, "");
      } else {
        text = `禁用 ${text}`;
      }
      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, range, text);
      vscode.workspace.applyEdit(edit);
    } catch (error) {
      console.log("错误：ow.toggle.disableRule 切换开关行为");
      console.log(error);
    }
  }
);

export default disposable;
