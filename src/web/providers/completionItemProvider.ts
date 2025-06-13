import * as vscode from "vscode";
import {
  buildCompletion,
  getDynamicList,
  getEntry,
  getScope,
  getSubroutineIndex,
  getVariableIndex,
} from "../utils";
import { 扩展, 模版, 规则 } from "../model";

const DYNAMIC_ENTRY_KIND_RE = /^所有变量|全局变量|玩家变量|子程序$/;

class CompletionItemProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    try {
      const scope = getScope(document, position);
      if (scope.name === "全局") {
        return getGlobalCompletions();
      } else if (scope.name === "变量") {
        return getVariableCompletions();
      } else if (scope.name === "子程序") {
        return getSubprogramCompletions();
      } else if (scope.name === "扩展") {
        return getExtensionCompletions();
      } else if (scope.name.startsWith("规则")) {
        return getRuleCompletions();
      } else if (scope.name === "事件") {
        if (scope.index !== undefined && scope.first !== undefined) {
          return getEventCompletions(scope.index, scope.first);
        } else {
          throw new Error("事件补全索引或首词未定义");
        }
      } else if (scope.name === "条件") {
        return getConditionCompletions();
      } else if (scope.name === "动作") {
        return getActionCompletions();
      }

      //获取全局补全
      function getGlobalCompletions() {
        let completionItems = [];
        for (const [key, value] of Object.entries(模版.全局)) {
          completionItems.push(
            buildCompletion({
              label: key,
              pinyin: value.拼音,
              kind: vscode.CompletionItemKind.Module,
              tags: value.标签,
              details: value.提示,
              insertText: new vscode.SnippetString(`${value.格式}`),
            }),
          );
        }
        return completionItems;
      }

      //获取变量补全
      function getVariableCompletions() {
        if (scope.range === undefined) {
          return [];
        }
        let pos = scope.range.end;
        let line = pos.line;
        let prevText = document.lineAt(line - 1).text;
        let index = getVariableIndex(prevText);
        if (index === undefined) {
          return [];
        }
        return [
          buildCompletion({
            label: `变量:${index}`,
            pinyin: `Bian Liang : ${index}`,
            kind: vscode.CompletionItemKind.Module,
            tags: ["模板", "变量"],
            details: `创建第 ${index} 号变量的模版。`,
            insertText: new vscode.SnippetString(`${index}: $1`),
          }),
        ];
      }

      //获取子程序补全
      function getSubprogramCompletions() {
        if (scope.range === undefined) {
          return [];
        }
        let pos = scope.range.end;
        let line = pos.line;
        let prevText = document.lineAt(line - 1).text;
        let index = getSubroutineIndex(prevText);
        if (index === undefined) {
          return [];
        }
        return [
          buildCompletion({
            label: `子程序:${index}`,
            pinyin: `Zi Cheng Xu : ${index}`,
            kind: vscode.CompletionItemKind.Module,
            tags: ["模板", "子程序"],
            details: `创建第 ${index} 号子程序。`,
            insertText: new vscode.SnippetString(`${index}: $1`),
          }),
        ];
      }

      //获取扩展补全
      function getExtensionCompletions() {
        let completionItems = [];
        for (const [key, value] of Object.entries(扩展)) {
          completionItems.push(
            buildCompletion({
              label: key,
              pinyin: value.拼音,
              kind: vscode.CompletionItemKind.Property,
              tags: value.标签,
              details: value.提示,
            }),
          );
        }
        return completionItems;
      }

      //获取规则补全
      function getRuleCompletions() {
        let completionItems = [];
        for (const [key, value] of Object.entries(模版.规则)) {
          completionItems.push(
            buildCompletion({
              label: key,
              pinyin: value.拼音,
              kind: vscode.CompletionItemKind.Module,
              tags: value.标签,
              details: value.提示,
              insertText: new vscode.SnippetString(`${value.格式}`),
            }),
          );
        }
        return completionItems;
      }

      //获取事件补全
      function getEventCompletions(index: number, first: string) {
        if (index === 0) {
          return buildStaticCompletions(规则.事件.选项);
        } else if (index === 1) {
          if (first.startsWith("持续 - 全局")) {
            return;
          } else if (first.startsWith("子程序")) {
            return buildDynamicCompletions("子程序");
          }
          return buildStaticCompletions(规则.事件.队伍);
        } else if (index === 2) {
          if (first.startsWith("持续 - 全局")) {
            return;
          } else if (first.startsWith("子程序")) {
            return;
          }
          return buildStaticCompletions(规则.事件.玩家);
        }
      }

      //获取条件补全
      function getConditionCompletions() {
        const entry = getEntry(document, position, scope);
        if (entry === undefined) {
          return;
        }
        if (entry.kind === "数组") {
          if (
            context.triggerCharacter === "(" ||
            context.triggerCharacter === ","
          ) {
            return;
          }
          return buildStaticCompletions(规则.条件);
        } else if (规则.条件.hasOwnProperty(entry.kind)) {
          const params = 规则.条件[entry.kind].参数;
          const index = entry.index;
          if (params !== undefined && index !== undefined) {
            const param = params[index];
            if (param.类型 === "条件") {
              if (
                context.triggerCharacter === "(" ||
                context.triggerCharacter === ","
              ) {
                return;
              }
              return buildStaticCompletions(规则.条件);
            } else if (param.选项) {
              return buildStaticCompletions(param.选项);
            }
          }
        } else if (entry.kind === "条件") {
          return buildStaticCompletions(规则.条件);
        } else if (entry.kind.match(DYNAMIC_ENTRY_KIND_RE)) {
          return buildDynamicCompletions(entry.kind);
        }
      }

      //获取动作补全
      function getActionCompletions() {
        try {
          const entry = getEntry(document, position, scope);
          if (entry === undefined) {
            return;
          }

          console.log("getActionCompletions", entry);

          if (entry.kind === "数组") {
            if (
              context.triggerCharacter === "(" ||
              context.triggerCharacter === ","
            ) {
              return;
            }
            return buildStaticCompletions(规则.条件);
          } else if (规则.动作.hasOwnProperty(entry.kind)) {
            const params = 规则.动作[entry.kind].参数;
            const index = entry.index;
            if (params !== undefined && index !== undefined) {
              const param = params[index];
              if (param.类型 === "条件") {
                if (
                  context.triggerCharacter === "(" ||
                  context.triggerCharacter === ","
                ) {
                  return;
                }
                return buildStaticCompletions(规则.条件);
              } else if (param.选项) {
                return buildStaticCompletions(param.选项);
              } else if (
                param.类型.match(DYNAMIC_ENTRY_KIND_RE)
              ) {
                return buildDynamicCompletions(param.类型);
              }
            }
          } else if (规则.条件.hasOwnProperty(entry.kind)) {
            const params = 规则.条件[entry.kind].参数;
            const index = entry.index;
            if (params !== undefined && index !== undefined) {
              const param = params[index];
              if (param.类型 === "条件") {
                if (
                  context.triggerCharacter === "(" ||
                  context.triggerCharacter === ","
                ) {
                  return;
                }
                return buildStaticCompletions(规则.条件);
              } else if (param.选项) {
                return buildStaticCompletions(param.选项);
              }
            }
          } else if (entry.kind === "动作") {
            return buildStaticCompletions(规则.动作).concat(
              buildStaticCompletions(规则.条件),
            );
          } else if (entry.kind === "条件") {
            return buildStaticCompletions(规则.条件);
          } else if (entry.kind.match(DYNAMIC_ENTRY_KIND_RE)) {
            return buildDynamicCompletions(entry.kind);
          }
        } catch (error) {
          console.log(error);
        }
      }

      //构建静态补全列表：条件/动作/常量
      function buildStaticCompletions(object: Object) {
        const theme =
          vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark
            ? "深色"
            : "浅色";
        let completions = [];
        for (const value of Object.values(object)) {
          if (value.补全.hasOwnProperty("深色")) {
            //双色主题图标
            completions.push(value.补全[theme]);
          } else {
            //通用主题图标
            completions.push(value.补全);
          }
        }
        return completions;
      }

      //构建动态补全列表：所有变量/全局变量/玩家变量/子程序
      function buildDynamicCompletions(type: string) {
        const dynamicList = getDynamicList(document);
        let completionItems: vscode.CompletionItem[] = [];
        if (type === "所有变量") {
          buildGlobalVariableCompletions();
          buildPlayerVariableCompletions();
        } else if (type === "全局变量") {
          buildGlobalVariableCompletions();
        } else if (type === "玩家变量") {
          buildPlayerVariableCompletions();
        } else if (type === "子程序") {
          buildSubroutineCompletions();
        }
        return completionItems;

        function buildGlobalVariableCompletions() {
          for (const [key, value] of Object.entries(dynamicList.全局变量)) {
            const name = value.name;
            let item = buildCompletion({
              label: name,
              kind: vscode.CompletionItemKind.Variable,
              tags: ["全局变量", key],
              details: `一个已定义的全局变量。`,
              filterText: (key.padStart(3, "0") + name).split("").join(" "),
              insertText: name,
              sortText: "G" + key.padStart(3, "0") + name,
            });
            completionItems.push(item);
          }
        }

        function buildPlayerVariableCompletions() {
          for (const [key, value] of Object.entries(dynamicList.玩家变量)) {
            const name = value.name;
            let item = buildCompletion({
              label: name,
              kind: vscode.CompletionItemKind.Variable,
              tags: ["玩家变量", key],
              details: `一个已定义的玩家变量。`,
              filterText: (key.padStart(3, "0") + name).split("").join(" "),
              insertText: name,
              sortText: "P" + key.padStart(3, "0") + name,
            });
            completionItems.push(item);
          }
        }

        function buildSubroutineCompletions() {
          for (const [key, value] of Object.entries(dynamicList.子程序)) {
            const name = value.name;
            let item = buildCompletion({
              label: key.padStart(3, "0") + ": " + name,
              kind: vscode.CompletionItemKind.Function,
              tags: ["子程序", key],
              details: `一个已定义的子程序。`,
              filterText: (key.padStart(3, "0") + name).split("").join(" "),
              insertText: name,
              sortText: key.padStart(3, "0") + name,
            });
            completionItems.push(item);
          }
        }
      }
    } catch (error) {
      console.log("错误：provideCompletionItems 补全建议能力");
      console.log(error);
    }
  }
}

//补全建议能力
const disposable = vscode.languages.registerCompletionItemProvider(
  "ow",
  new CompletionItemProvider(),
  "(",
  ",",
  ".",
);

export default disposable;
