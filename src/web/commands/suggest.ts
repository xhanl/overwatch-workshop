import * as vscode from "vscode";

//主动建议能力
const disposable = vscode.commands.registerCommand(
  "ow.command.suggest",
  () => {
    try {
      vscode.commands.executeCommand("editor.action.triggerSuggest");
      vscode.commands.executeCommand("editor.action.triggerParameterHints");
    } catch (error) {
      console.log("错误：ow.command.suggest 主动建议能力");
      console.log(error);
    }
  }
);

export default disposable;
