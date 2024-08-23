import * as vscode from "vscode";
import { getEntry, getScope } from "../utils";
import { 规则, 规则动作类型, 规则条件类型 } from "../model";

class SignatureHelpProvider implements vscode.SignatureHelpProvider {
  provideSignatureHelp(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.SignatureHelpContext
  ): vscode.ProviderResult<vscode.SignatureHelp> {
    try {
      const scope = getScope(document, position);
      if (scope.name === "条件") {
        return getConditionSignature();
      } else if (scope.name === "动作") {
        return getActionSignature();
      }

      //获取条件参数签名
      function getConditionSignature() {
        const entry = getEntry(document, position, scope);
        if (
          entry === undefined ||
          entry.kind === "数组" ||
          entry.index === undefined
        ) {
          return;
        }
        if (规则.条件.hasOwnProperty(entry.kind)) {
          if (规则.条件[entry.kind].hasOwnProperty("参数")) {
            return buildSignatureHelp(
              entry.kind,
              规则.条件[entry.kind],
              entry.index
            );
          }
        }
      }

      //获取动作参数签名
      function getActionSignature() {
        const entry = getEntry(document, position, scope);
        if (
          entry === undefined ||
          entry.kind === "数组" ||
          entry.index === undefined
        ) {
          return;
        }
        if (规则.动作.hasOwnProperty(entry.kind)) {
          if (规则.动作[entry.kind].hasOwnProperty("参数")) {
            return buildSignatureHelp(
              entry.kind,
              规则.动作[entry.kind],
              entry.index
            );
          }
        } else if (规则.条件.hasOwnProperty(entry.kind)) {
          if (规则.条件[entry.kind].hasOwnProperty("参数")) {
            return buildSignatureHelp(
              entry.kind,
              规则.条件[entry.kind],
              entry.index
            );
          }
        }
      }

      //构建参数签名
      function buildSignatureHelp(
        name: string,
        object: 规则条件类型 | 规则动作类型,
        index: number
      ) {
        const signatureHelp = new vscode.SignatureHelp();
        const signatureInfo = new vscode.SignatureInformation(name + "(");
        const params = object.参数!;
        for (const i in params) {
          const param = params[i].签名!;
          param.label = [signatureInfo.label.length, signatureInfo.label.length + params[i].名称.length];
          signatureInfo.parameters.push(param);
          signatureInfo.label += params[i].名称;
          if (parseInt(i) < params.length - 1) {
            signatureInfo.label += ", ";
          }
        }
        signatureInfo.label += ")";
        signatureInfo.documentation = new vscode.MarkdownString();
        signatureInfo.documentation.isTrusted = true;
        signatureInfo.documentation.supportHtml = true;
        signatureInfo.documentation.supportThemeIcons = true;
        signatureInfo.documentation.appendMarkdown(
          `\n\n***<span style="color:#c0c;">❖</span>&nbsp;方法&nbsp;:&nbsp;${name}***\n\n`
        );
        for (const i in object.标签) {
          signatureInfo.documentation.appendMarkdown(
            `\`${object.标签[i]}\`&nbsp;`
          );
        }
        signatureInfo.documentation.appendMarkdown(`\n\n${object.提示}`);
        signatureInfo.activeParameter = index;
        signatureHelp.signatures = [signatureInfo];
        return signatureHelp;
      }
    } catch (error) {
      console.log("错误：provideSignatureHelp 参数提示能力");
      console.log(error);
    }
  }
}

//参数提示能力
const disposable = vscode.languages.registerSignatureHelpProvider(
  "ow",
  new SignatureHelpProvider(),
  "(",
  ",",
  " "
);

export default disposable;
