import * as vscode from "vscode";
import { getFileNameFromPath } from "../utils";

//导出修复能力
const disposable = vscode.commands.registerCommand("ow.command.export", () => {
  try {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const document = activeEditor.document;
      let text = document.getText();
      text = text.replace(
        /(创建地图文本|创建HUD文本|创建进度条地图文本|创建进度条HUD文本)\s*\((.*),\s*无\s*,(.*)\)\s*;/g,
        "$1($2, 全部禁用,$3);"
      );
      text = text.replace(
        /(追踪全局变量频率|追踪玩家变量频率|持续追踪全局变量|持续追踪玩家变量|开始治疗调整|设置不可见)\s*\((.*),\s*无\s*\)\s*;/g,
        "$1($2, 全部禁用);"
      );
      vscode.env.clipboard.writeText(text);
      vscode.window.showInformationMessage(
        `${getFileNameFromPath(document.fileName)} 已导出到剪切板`
      );
    }
  } catch (error) {
    console.log("错误：ow.command.copy 导出修复能力");
    console.log(error);
  }
});

export default disposable;
