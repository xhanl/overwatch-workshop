import * as vscode from "vscode";
import { 示例 } from "../model";

//新建文件能力
const disposable = vscode.commands.registerCommand(
  "ow.command.newFile",
  () => {
    try {
      vscode.window
        .showSaveDialog({
          filters: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "ow Files": ["ow"],
          },
        })
        .then(async (fileUri) => {
          if (fileUri) {
            const encoder = new TextEncoder();
            const encodedText = encoder.encode(示例);
            vscode.workspace.fs.writeFile(fileUri, encodedText);
            const document = await vscode.workspace.openTextDocument(fileUri);
            await vscode.window.showTextDocument(document);
          }
        });
    } catch (error) {
      console.log("错误：ow.command.newFile 新建文件能力");
      console.log(error);
    }
  }
);

export default disposable;
