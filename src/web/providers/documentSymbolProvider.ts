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
          const symbol = this.getTopLevelSymbol(document, i);
          if (symbol) {
            documentSymbols.push(symbol);
          }
        }
        i++;
      }
      
      return documentSymbols;
    } catch (error) {
      console.log("错误：provideDocumentSymbols 代码大纲能力");
      console.log(error);
    }
  }

  private getTopLevelSymbol(document: vscode.TextDocument, startIndex: number): vscode.DocumentSymbol | null {
    const prevLine = document.lineAt(startIndex - 1);
    const prevLineText = prevLine.text.trim();
    
    // 找到对应的结束括号
    let braceLevel = 0;
    let endIndex = startIndex;
    
    for (let i = startIndex; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const lineText = line.text.trim();
      
      if (lineText.startsWith("{")) {
        braceLevel++;
      } else if (lineText.endsWith("}")) {
        braceLevel--;
        if (braceLevel === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    const endLine = document.lineAt(endIndex);
    const range = new vscode.Range(prevLine.range.start, endLine.range.end);
    
    // 识别不同类型的顶级符号
    let match;
    
    if (prevLineText === "设置") {
      return new vscode.DocumentSymbol(
        "设置",
        "",
        vscode.SymbolKind.Property,
        range,
        range
      );
    } else if (prevLineText === "变量") {
      return new vscode.DocumentSymbol(
        "变量",
        "",
        vscode.SymbolKind.Variable,
        range,
        range
      );
    } else if (prevLineText === "子程序") {
      return new vscode.DocumentSymbol(
        "子程序",
        "",
        vscode.SymbolKind.Function,
        range,
        range
      );
    } else if ((match = prevLineText.match(/^(禁用\s*)?规则\s*\(\s*"(.*)"\s*\)$/))) {
      // 获取规则的事件类型
      let eventType = "";
      for (let j = startIndex + 1; j <= startIndex + 5 && j < document.lineCount; j++) {
        const nextLine = document.lineAt(j);
        const nextLineText = nextLine.text.trim();
        const eventMatch = nextLineText.match(/^(持续 - 全局|持续 - 每名玩家|玩家造成伤害|玩家造成最后一击|玩家造成治疗|玩家造成击退|玩家阵亡|玩家参与消灭|玩家加入比赛|玩家离开比赛|玩家受到治疗|玩家受到击退|玩家受到伤害|子程序);$/);
        if (eventMatch) {
          eventType = eventMatch[1];
          break;
        }
      }
      
      let ruleName = match[2] || "未命名规则";
      
      if (match[1] === undefined) {
        return new vscode.DocumentSymbol(
          ruleName,
          eventType,
          vscode.SymbolKind.Event,
          range,
          range
        );
      } else {
        return new vscode.DocumentSymbol(
          `⟁ ${ruleName}`,
          eventType,
          vscode.SymbolKind.Event,
          range,
          range
        );
      }
    }
    
    return null;
  }
}

//代码大纲能力
const disposable = vscode.languages.registerDocumentSymbolProvider(
  "ow",
  new DocumentSymbolProvider()
);

export default disposable;
