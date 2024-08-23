import * as vscode from "vscode";

//自动换行能力
const disposable = vscode.commands.registerCommand(
  "ow.command.lineBreak",
  () => {
    try {
      vscode.commands.executeCommand("editor.action.toggleWordWrap");
    } catch (error) {
      console.log("错误：ow.command.line 自动换行能力");
      console.log(error);
    }
  }
);

export default disposable;