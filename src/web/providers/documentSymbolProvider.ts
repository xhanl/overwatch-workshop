import * as vscode from "vscode";

class DocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  provideDocumentSymbols(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<
    vscode.SymbolInformation[] | vscode.DocumentSymbol[]
  > {
    try {
      let documentSymbols: vscode.DocumentSymbol[] = [];
      let i = 0;
      while (i < document.lineCount) {
        const line = document.lineAt(i);
        const lineText = line.text.trim();
        if (lineText.startsWith("{")) {
          documentSymbols.push(getDocumentSymbol()!);
        }
        i++;
      }

      function getDocumentSymbol() {
        let symbol:
          | {
            prevLineText: string;
            nextLineText: string;
            kind: vscode.SymbolKind;
            start: vscode.Position;
            children?: vscode.DocumentSymbol[];
          }
          | undefined;
        while (i < document.lineCount) {
          const line = document.lineAt(i);
          const lineText = line.text.trim();
          if (lineText.startsWith("{")) {
            const prevLine = document.lineAt(i - 1);
            const prevLineText = prevLine.text.trim();
            if (symbol === undefined) {
              let match;
              if (prevLineText === "动作") {
                symbol = {
                  prevLineText,
                  nextLineText: "",
                  kind: vscode.SymbolKind.Method,
                  start: prevLine.range.start,
                };
              } else if (prevLineText === "事件") {
                const nextLine = document.lineAt(i + 1);
                let nextLineText = nextLine.text.trim();
                if ((match = nextLineText.match(/^([^;]*);.*$/))) {
                  nextLineText = match[1];
                }
                symbol = {
                  prevLineText,
                  nextLineText,
                  kind: vscode.SymbolKind.Event,
                  start: prevLine.range.start,
                };
              } else if (prevLineText === "条件") {
                symbol = {
                  prevLineText,
                  nextLineText: "",
                  kind: vscode.SymbolKind.Boolean,
                  start: prevLine.range.start,
                };
              } else if (prevLineText === "变量") {
                symbol = {
                  prevLineText,
                  nextLineText: "",
                  kind: vscode.SymbolKind.Variable,
                  start: prevLine.range.start,
                };
              } else if (prevLineText === "子程序") {
                symbol = {
                  prevLineText,
                  nextLineText: "",
                  kind: vscode.SymbolKind.Function,
                  start: prevLine.range.start,
                };
              } else if (
                (match = prevLineText.match(
                  /^(禁用\s*)?规则\s*\(\s*"(.*)"\s*\)$/
                ))
              ) {
                let nextLineText = "";
                for (let j = i + 1; j <= i + 5; j++) {
                  const nextLine = document.lineAt(j);
                  nextLineText = nextLine.text.trim();
                  const eventMatch = nextLineText.match(/^(持续 - 全局|持续 - 每名玩家|玩家造成伤害|玩家造成最后一击|玩家造成治疗|玩家造成击退|玩家阵亡|玩家参与消灭|玩家加入比赛|玩家离开比赛|玩家受到治疗|玩家受到击退|玩家受到伤害|子程序);$/);
                  if (eventMatch) {
                    nextLineText = eventMatch[1];
                    break;
                  }
                }
                if (match[1] === undefined) {
                  symbol = {
                    prevLineText: `${match[2]}`,
                    nextLineText,
                    kind: vscode.SymbolKind.Module,
                    start: prevLine.range.start,
                  };
                } else {
                  symbol = {
                    prevLineText: `⟁ ${match[2]}`,
                    nextLineText,
                    kind: vscode.SymbolKind.Module,
                    start: prevLine.range.start,
                  };
                }
              } else {
                symbol = {
                  prevLineText,
                  nextLineText: "",
                  kind: vscode.SymbolKind.Property,
                  start: prevLine.range.start,
                };
              }
            } else {
              if (symbol.children === undefined) {
                symbol.children = [];
              }
              symbol.children.push(getDocumentSymbol()!);
            }
          } else if (lineText.endsWith("}")) {
            if (symbol === undefined) {
              throw new Error('lineText.endsWith "}" 时 symbol 未定义');
            }
            const documentSymbol = new vscode.DocumentSymbol(
              symbol.prevLineText,
              symbol.nextLineText,
              symbol.kind,
              new vscode.Range(symbol.start, line.range.end),
              new vscode.Range(symbol.start, line.range.end)
            );
            if (symbol.children !== undefined) {
              documentSymbol.children = symbol.children;
            }
            return documentSymbol;
          }
          i++;
        }
      }
      return documentSymbols;
    } catch (error) {
      console.log("错误：provideDocumentSymbols 代码大纲能力");
      console.log(error);
    }
  }
}

//代码大纲能力
const disposable = vscode.languages.registerDocumentSymbolProvider(
  "ow",
  new DocumentSymbolProvider()
);

export default disposable;
