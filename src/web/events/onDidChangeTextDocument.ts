import * as vscode from "vscode";
import { getEntry, getScope, getSubprogramIndex, getVariableIndex } from "../utils";
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
          if (规则.动作.hasOwnProperty(entry.kind)) {
            const params = 规则.动作[entry.kind].参数;
            const index = entry.index;
            if (params !== undefined && index !== undefined) {
              const param = params[index];
              if (param.hasOwnProperty("选项")) {
                vscode.commands.executeCommand("ow.command.suggest");
              } else if (param.类型.match(/^全局变量|玩家变量|子程序$/)) {
                vscode.commands.executeCommand("ow.command.suggest");
              }
            }
          } else if (规则.条件.hasOwnProperty(entry.kind)) {
            const params = 规则.条件[entry.kind].参数;
            const index = entry.index;
            if (params !== undefined && index !== undefined) {
              const param = params[index];
              if (param.hasOwnProperty("选项")) {
                vscode.commands.executeCommand("ow.command.suggest");
              }
            }
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
          const index = getSubprogramIndex(text);
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