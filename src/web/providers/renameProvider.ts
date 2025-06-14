import * as vscode from "vscode";
import { getRuleDynamicKind, getDynamicList, getPrevValidWordRange, getScope } from "../utils";

class RenameProvider implements vscode.RenameProvider {
    provideRenameEdits(document: vscode.TextDocument, position: vscode.Position, newName: string, token: vscode.CancellationToken): vscode.ProviderResult<vscode.WorkspaceEdit> {
        try {
            const renameRange = document.getWordRangeAtPosition(position);
            if (!renameRange) {
                return;
            }

            const renameText = document.getText(renameRange);
            if (renameText === "") {
                return;
            }

            let match;
            if ((match = renameText.match(/\b[_a-zA-Z][_a-zA-Z0-9]*\b/))) {
                const prevRange = getPrevValidWordRange(document, position);
                if (!prevRange) {
                    return;
                }

                const prevText = document.getText(prevRange);
                if (prevText === "") {
                    return;
                }

                let dynamicKind;
                const scope = getScope(document, position);
                if (scope.name === "变量") {
                    for (let i = position.line; i >= 0; i--) {
                        const line = document.lineAt(i);
                        const lineText = line.text.trim();
                        if (lineText === "玩家:") {
                            dynamicKind = "玩家变量";
                            break;
                        } else if (lineText === "全局:") {
                            dynamicKind = "全局变量";
                            break;
                        } else if (lineText.endsWith("{")) {
                            break;
                        }
                    }
                } else if (scope.name === "子程序") {
                    dynamicKind = "子程序";
                } else {
                    dynamicKind = getRuleDynamicKind(prevText);
                }

                //vscode.window.showInformationMessage(`dynamicKind: ${dynamicKind}`); // 调试

                const dynamicList = getDynamicList(document);
                if (dynamicList === undefined) {
                    return;
                }

                if (dynamicKind === "全局变量") {
                    for (const i in dynamicList.全局变量) {
                        const name = dynamicList.全局变量[i].name;
                        const range = dynamicList.全局变量[i].range;
                        if (renameText === name) {
                            const workspaceEdit = new vscode.WorkspaceEdit();
                            const fullText = document.getText();
                            let match: RegExpExecArray | null;

                            // 0. 全局变量声明
                            if (range) {
                                workspaceEdit.replace(document.uri, range, newName);
                            }

                            // 1. 前缀为 "全局."
                            const globalPrefixPattern = new RegExp(`全局\\.\\b${renameText}\\b`, "g");
                            while ((match = globalPrefixPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `全局.${newName}`);
                            }

                            // 2. For 全局变量
                            const forGlobalPattern = new RegExp(`For 全局变量\\(\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = forGlobalPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `For 全局变量(${newName},${match[1]},${match[2]},${match[3]})`);
                            }

                            // 3. 设置全局变量
                            const setGlobalPattern = new RegExp(`设置全局变量\\(\\b${renameText}\\b,([^)]*)\\)`, "g");
                            while ((match = setGlobalPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `设置全局变量(${newName},${match[1]})`);
                            }

                            // 4. 修改全局变量
                            const modifyGlobalPattern = new RegExp(`修改全局变量\\(\\b${renameText}\\b,([^,]*),([^)]*)\\)`, "g");
                            while ((match = modifyGlobalPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `修改全局变量(${newName},${match[1]},${match[2]})`);
                            }

                            // 5. 在索引处设置全局变量
                            const setGlobalAtPattern = new RegExp(`在索引处设置全局变量\\(\\b${renameText}\\b,([^,]*),([^)]*)\\)`, "g");
                            while ((match = setGlobalAtPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `在索引处设置全局变量(${newName},${match[1]},${match[2]})`);
                            }

                            // 6. 在索引处修改全局变量
                            const modifyGlobalAtPattern = new RegExp(`在索引处修改全局变量\\(\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = modifyGlobalAtPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `在索引处修改全局变量(${newName},${match[1]},${match[2]},${match[3]})`);
                            }

                            // 7. 持续追踪全局变量
                            const trackGlobalPattern = new RegExp(`持续追踪全局变量\\(\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = trackGlobalPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `持续追踪全局变量(${newName},${match[1]},${match[2]},${match[3]})`);
                            }

                            // 8. 追踪全局变量频率
                            const trackGlobalRatePattern = new RegExp(`追踪全局变量频率\\(\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = trackGlobalRatePattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `追踪全局变量频率(${newName},${match[1]},${match[2]},${match[3]})`);
                            }

                            // 9. 停止追踪全局变量
                            const stopTrackGlobalPattern = new RegExp(`停止追踪全局变量\\(\\b${renameText}\\b\\)`, "g");
                            while ((match = stopTrackGlobalPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `停止追踪全局变量(${newName})`);
                            }

                            return workspaceEdit;
                        }
                    }
                } else if (dynamicKind === "玩家变量") {
                    for (const i in dynamicList.玩家变量) {
                        const name = dynamicList.玩家变量[i].name;
                        const range = dynamicList.玩家变量[i].range;
                        if (renameText === name) {
                            const workspaceEdit = new vscode.WorkspaceEdit();
                            const fullText = document.getText();
                            let match: RegExpExecArray | null;

                            // 0. 玩家变量声明
                            if (range) {
                                workspaceEdit.replace(document.uri, range, newName);
                            }

                            // 1. 前缀为 "." 但不为 "全局."
                            const playerPrefixPattern = new RegExp(`(?<!全局)\\.\\b${renameText}\\b`, "g");
                            while ((match = playerPrefixPattern.exec(fullText)) !== null) {
                                vscode.window.showInformationMessage(`玩家变量 ${match[0]}`); // 调试
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `.${newName}`);
                            }

                            // 2. For 玩家变量
                            const forPlayerPattern = new RegExp(`For 玩家变量\\(([^,]*),\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = forPlayerPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `For 玩家变量(${match[1]},${newName},${match[2]},${match[3]},${match[4]})`);
                            }

                            // 3. 设置玩家变量
                            const setPlayerPattern = new RegExp(`设置玩家变量\\(([^,]*),\\b${renameText}\\b,([^)]*)\\)`, "g");
                            while ((match = setPlayerPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `设置玩家变量(${match[1]},${newName},${match[2]})`);
                            }

                            // 4. 修改玩家变量
                            const modifyPlayerPattern = new RegExp(`修改玩家变量\\(([^,]*),\\b${renameText}\\b,([^,]*),([^)]*)\\)`, "g");
                            while ((match = modifyPlayerPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `修改玩家变量(${match[1]},${newName},${match[2]},${match[3]})`);
                            }

                            // 5. 在索引处设置玩家变量
                            const setPlayerAtPattern = new RegExp(`在索引处设置玩家变量\\(([^,]*),\\b${renameText}\\b,([^,]*),([^)]*)\\)`, "g");
                            while ((match = setPlayerAtPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `在索引处设置玩家变量(${match[1]},${newName},${match[2]},${match[3]})`);
                            }

                            // 6. 在索引处修改玩家变量
                            const modifyPlayerAtPattern = new RegExp(`在索引处修改玩家变量\\(([^,]*),\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = modifyPlayerAtPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `在索引处修改玩家变量(${match[1]},${newName},${match[2]},${match[3]},${match[4]})`);
                            }

                            // 7. 持续追踪玩家变量
                            const trackPlayerPattern = new RegExp(`持续追踪玩家变量\\(([^,]*),\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = trackPlayerPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `持续追踪玩家变量(${match[1]},${newName},${match[2]},${match[3]},${match[4]})`);
                            }

                            // 8. 追踪玩家变量频率
                            const trackPlayerRatePattern = new RegExp(`追踪玩家变量频率\\(([^,]*),\\b${renameText}\\b,([^,]*),([^,]*),([^)]*)\\)`, "g");
                            while ((match = trackPlayerRatePattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `追踪玩家变量频率(${match[1]},${newName},${match[2]},${match[3]},${match[4]})`);
                            }

                            // 9. 停止追踪玩家变量
                            const stopTrackPlayerPattern = new RegExp(`停止追踪玩家变量\\(([^,]*),\\b${renameText}\\b\\)`, "g");
                            while ((match = stopTrackPlayerPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `停止追踪玩家变量(${match[1]},${newName})`);
                            }

                            return workspaceEdit;
                        }
                    }
                } else if (dynamicKind === "子程序") {
                    for (const i in dynamicList.子程序) {
                        const name = dynamicList.子程序[i].name;
                        const range = dynamicList.子程序[i].range;
                        if (renameText === name) {
                            const fullText = document.getText();
                            if (fullText === "") {
                                return;
                            }

                            const workspaceEdit = new vscode.WorkspaceEdit();
                            let match: RegExpExecArray | null;

                            // 0. 子程序声明
                            if (range) {
                                workspaceEdit.replace(document.uri, range, newName);
                            }

                            // 1. 事件
                            const eventPattern = new RegExp(`^(\\s*)(${renameText})\\s*;\\s*$`, "gm");
                            while ((match = eventPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index + match[1].length);
                                const endPos = document.positionAt(match.index + match[1].length + match[2].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, newName);
                            }

                            // 2. 开始规则
                            const startRulePattern = new RegExp(`开始规则\\(\\b${renameText}\\b,([^)]*)\\)`, "g");
                            while ((match = startRulePattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `开始规则(${newName},${match[1]})`);
                            }

                            // 3. 调用子程序
                            const callSubPattern = new RegExp(`调用子程序\\(\\b${renameText}\\b\\)`, "g");
                            while ((match = callSubPattern.exec(fullText)) !== null) {
                                const startPos = document.positionAt(match.index);
                                const endPos = document.positionAt(match.index + match[0].length);
                                const range = new vscode.Range(startPos, endPos);
                                workspaceEdit.replace(document.uri, range, `调用子程序(${newName})`);
                            }

                            return workspaceEdit;
                        }
                    }

                    vscode.window.showWarningMessage(`是否忘记声明为变量/子程序？`);
                }
            }
        } catch (error) {
            console.error("provideRenameEdits 重命名能力", error);
        }
    }
}

//重命名能力 (仅对全局变量, 玩家变量，子程序有效)
const disposable = vscode.languages.registerRenameProvider(
    "ow",
    new RenameProvider()
);

export default disposable;
