import * as vscode from "vscode";
import { prepareStaticModel } from "./utils";
import disableRuleCommand from "./commands/disableRule";
import exportCommand from "./commands/export";
import importCommand from "./commands/import";
import lineBreakCommand from "./commands/lineBreak";
import newFileCommand from "./commands/newFile";
import obfuscateCommand from "./commands/obfuscate";
import suggestCommand from "./commands/suggest";
import onDidChangeTextDocument from "./events/onDidChangeTextDocument";
import codeLensProvider from "./providers/codeLensProvider";
import completionItemProvider from "./providers/completionItemProvider";
import documentColorProvider from "./providers/documentColorProvider";
import documentFormattingEditProvider from "./providers/documentFormattingEditProvider";
import documentSemanticTokensProvider from "./providers/documentSemanticTokensProvider";
import documentSymbolProvider from "./providers/documentSymbolProvider";
import hoverProvider from "./providers/hoverProvider";
import signatureHelpProvider from "./providers/signatureHelpProvider";
import webviewViewProvider from "./providers/webviewViewProvider";

export function activate(context: vscode.ExtensionContext) {
  prepareStaticModel(context.extensionUri);
  context.subscriptions.push(
    disableRuleCommand,
    exportCommand,
    importCommand,
    lineBreakCommand,
    newFileCommand,
    obfuscateCommand,
    suggestCommand,
    onDidChangeTextDocument,
    codeLensProvider,
    completionItemProvider,
    documentColorProvider,
    documentFormattingEditProvider,
    documentSemanticTokensProvider,
    documentSymbolProvider,
    hoverProvider,
    signatureHelpProvider,
    webviewViewProvider
  );
}

export function deactivate() {}
