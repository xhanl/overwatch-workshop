import * as vscode from "vscode";
import { EXTENSION_URI } from "../utils";
import { 常量 } from "../model";

class WebviewViewProvider implements vscode.WebviewViewProvider {
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {
    try {
      const styleUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(EXTENSION_URI, "webviews", "view.css")
      );
      const scriptUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(EXTENSION_URI, "webviews", "script.js")
      );

      function getHomeHtml() {
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet" />
<script src="${scriptUri}"></script>
<title>参考手册</title>
</head>
<body>
<i><h3>参考手册</h3></i>
<div
style="
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
width: max-content;
"
>
<button style="width: 150px; height: auto" onclick="navigate('HeroIcon')">
英雄技能图标
</button>
<button style="width: 150px; height: auto" onclick="navigate('Icon')">
图标
</button>
<button style="width: 150px; height: auto" onclick="navigate('Mode')">
模式
</button>
<button style="width: 150px; height: auto" onclick="navigate('Map')">
地图
</button>
<button style="width: 150px; height: auto" onclick="navigate('String')">
字符串
</button>
<button style="width: 150px; height: auto" onclick="navigate('Color')">
颜色
</button>
<button style="width: 150px; height: auto" onclick="navigate('Effect')">
效果
</button>
<button
style="width: 150px; height: auto"
onclick="navigate('Projectile')"
>
弹道
</button>
</div>
</body>
</html>
`;
      }

      function getModeTableHtml() {
        const mode = 常量.模式
          .map((element) => {
            return `<tr><td style="text-align: center;">${element.名称}</td></tr>`;
          })
          .join("");
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>模式</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>模式</h3></i>
<table style="min-width: 300px; max-width: 400px;">
${mode}
</table>
</body>
</html>`;
      }

      function getMapTableHtml() {
        const maps = 常量.地图
          .map((element) => {
            return `<tr><td style="text-align: center;">${element.名称}</td></tr>`;
          })
          .join("");
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>地图</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>地图</h3></i>
<table style="min-width: 300px; max-width: 500px;">
${maps}
</table>
</body>
</html>`;
      }

      function getStringTableHtml() {
        const strings = 常量.字符串
          .map((element, index) => {
            if (index % 2 === 0) {
              return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
            } else {
              return `<td style="text-align: center;">${element.名称}</td>`;
            }
          })
          .join("");
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>字符串</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>字符串</h3></i>
<table style="min-width: 300px; max-width: 400px;">
<tr>
${strings}
</tr>
</table>
</body>
</html>`;
      }

      function getColorTableHtml() {
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>颜色</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>颜色</h3></i>
<table style="min-width: 300px; max-width: 400px;">
<tr>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "white.png"
          )
        )}" width="35" height="auto"><br>白色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "yellow.png"
          )
        )}" width="35" height="auto"><br>黄色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "green.png"
          )
        )}" width="35" height="auto"><br>绿色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "violet.png"
          )
        )}" width="35" height="auto"><br>紫色<br></td>
</tr>
<tr>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(EXTENSION_URI, "images", "ow", "color", "red.png")
        )}" width="35" height="auto"><br>红色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "blue.png"
          )
        )}" width="35" height="auto"><br>蓝色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "aqua.png"
          )
        )}" width="35" height="auto"><br>水绿色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "orange.png"
          )
        )}" width="35" height="auto"><br>橙色<br></td>
</tr>
<tr>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "sky_blue.png"
          )
        )}" width="35" height="auto"><br>天蓝色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "turquoise.png"
          )
        )}" width="35" height="auto"><br>青绿色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "lime_green.png"
          )
        )}" width="35" height="auto"><br>灰绿色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "purple.png"
          )
        )}" width="35" height="auto"><br>亮紫色<br></td>
</tr>
<tr>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "black.png"
          )
        )}" width="35" height="auto"><br>黑色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "rose.png"
          )
        )}" width="35" height="auto"><br>玫红<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "gray.png"
          )
        )}" width="35" height="auto"><br>灰色<br></td>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "team1.png"
          )
        )}" width="35" height="auto"><br>队伍1<br></td>
</tr>
<tr>
<td style="text-align: center; font-weight: 500;"><img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "color",
            "team2.png"
          )
        )}" width="35" height="auto"><br>队伍2<br></td>
</tr>
</table>
</body>
</html>`;
      }

      function getIconTableHtml() {
        const numCols = 4;
        const numRows = Math.ceil(36 / numCols);
        const tableRows = Array(numRows)
          .fill(0)
          .map((_, rowIndex) => {
            const startImageIndex = rowIndex * numCols + 1;
            const endImageIndex = Math.min(startImageIndex + numCols - 1, 36);
            const imageCells = Array(endImageIndex - startImageIndex + 1)
              .fill(0)
              .map((_, colIndex) => {
                const imageNumber = startImageIndex + colIndex;
                const imageSrc = webviewView.webview.asWebviewUri(
                  vscode.Uri.joinPath(
                    EXTENSION_URI,
                    "images",
                    "ow",
                    "icon",
                    `${imageNumber}.png`
                  )
                );
                const icons = 常量.图标.map((element) => element.名称);
                return `<td style="text-align:center; font-weight: 500;">
<img src="${imageSrc}" style="height: 32px; transform: translateY(-100px); filter: drop-shadow(0px 100px var(--vscode-sideBar-foreground));">

<br>${icons[imageNumber - 1]}</td>`;
              })
              .join("");
            return `<tr>${imageCells}</tr>`;
          });
        const tableHtml = `<table style="min-width: 300px; max-width: 400px;">${tableRows.join(
          ""
        )}</table>`;

        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>字符串</title>
</head>

<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>图标</h3></i>
${tableHtml}
</body>
</html>`;
      }

      function getHeroIconTableHtml() {
        function buildAvatar(src: string) {
          return `
<img src="${webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
              EXTENSION_URI,
              "images",
              "ow",
              "hero",
              "avatar",
              src
            )
          )}" style="height: 48px;/>`;
        }

        function buildWeapon(src: string) {
          return `
<img src="${webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
              EXTENSION_URI,
              "images",
              "ow",
              "hero",
              "ability",
              src
            )
          )}" style="height: 32px;"/>`;
        }

        function buildIcon(src: string) {
          return `
<div class="ability-icon">
<img src="${webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
              EXTENSION_URI,
              "images",
              "ow",
              "hero",
              "ability",
              src
            )
          )}" />
</div>`;
        }

        function buildHero(infos: {
          name: string;
          avatar: string;
          primary?: string;
          primaryWeapon?: string;
          secondary?: string;
          secondaryWeapon?: string;
          ultimate?: string;
          ability1?: string;
          ability2?: string;
          melee?: string;
          jump?: string;
          crouch?: string;
        }) {
          return `
<tr>
<td style="text-align: center;">
${buildAvatar(infos.avatar)}
</td>
<td style="text-align: center;">
<br>${infos.name}<br>
</td>
<td style="text-align: center;">
${
  infos.primaryWeapon
    ? buildWeapon(infos.primaryWeapon)
    : infos.primary
    ? buildIcon(infos.primary)
    : ""
}
</td>
<td style="text-align: center;">
${
  infos.secondaryWeapon
    ? buildWeapon(infos.secondaryWeapon)
    : infos.secondary
    ? buildIcon(infos.secondary)
    : ""
}
</td>
<td style="text-align: center;">
${infos.ultimate ? buildIcon(infos.ultimate) : ""}
</td>
<td style="text-align: center;">
${infos.ability1 ? buildIcon(infos.ability1) : ""}
</td>
<td style="text-align: center;">
${infos.ability2 ? buildIcon(infos.ability2) : ""}
</td>
<td style="text-align: center;">
${infos.melee ? buildIcon(infos.melee) : ""}
</td>
<td style="text-align: center;">
${infos.jump ? buildIcon(infos.jump) : ""}
</td>
<td style="text-align: center;">
${infos.crouch ? buildIcon(infos.crouch) : ""}
</td>
</tr>`;
        }

        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>英雄技能图标选项</title>
</head>

<body>

<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>

<i><h3>英雄技能图标</h3></i>

<h4 style="display: flex; align-items: center;">
<div class="icon-box">
<img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "hero",
            "type",
            "tank.png"
          )
        )}" class="icon"/>
</div>
&nbsp;重装</h4>
<table style="min-width: 700px; max-width: 800px;">
<thead>
<td style="text-align: center; font-weight: 600;">英雄</td>
<td style="text-align: center; font-weight: 600;">主要攻击模式</td>
<td style="text-align: center; font-weight: 600;">辅助攻击模式</td>
<td style="text-align: center; font-weight: 600;">终极技能</td>
<td style="text-align: center; font-weight: 600;">技能1</td>
<td style="text-align: center; font-weight: 600;">技能2</td>
<td style="text-align: center; font-weight: 600;">近身攻击</td>
<td style="text-align: center; font-weight: 600;">跳跃</td>
<td style="text-align: center; font-weight: 600;">蹲下</td>
</thead>

<tbody>
${buildHero({
  name: "末日铁拳",
  avatar: "tank_doomfist_avatar.png",
  primaryWeapon: "tank_doomfist_weapon.png",
  secondary: "tank_doomfist_secondaryfire.png",
  ultimate: "tank_doomfist_ultimate.png",
  ability1: "tank_doomfist_ability1.png",
  ability2: "tank_doomfist_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "D.Va",
  avatar: "tank_dva_avatar.png",
  primaryWeapon: "tank_dva_weapon1.png",
  secondary: "tank_dva_secondaryfire.png",
  ultimate: "tank_dva_ultimate1.png",
  ability1: "tank_dva_ability1.png",
  ability2: "tank_dva_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "破坏球",
  avatar: "tank_wrecking_ball_avatar.png",
  primaryWeapon: "tank_wrecking_ball_weapon.png",
  secondary: "tank_wrecking_ball_secondaryfire.png",
  ultimate: "tank_wrecking_ball_ultimate.png",
  ability1: "tank_wrecking_ball_ability1.png",
  ability2: "tank_wrecking_ball_ability2.png",
  melee: "melee.png",
  crouch: "tank_wrecking_ball_crouch.png",
})}

${buildHero({
  name: "渣客女王",
  avatar: "tank_junker-queen_avatar.png",
  primaryWeapon: "tank_junker-queen_weapon.png",
  secondary: "tank_junker-queen_secondaryfire.png",
  ultimate: "tank_junker-queen_ultimate.png",
  ability1: "tank_junker-queen_ability1.png",
  ability2: "tank_junker-queen_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "奥丽莎",
  avatar: "tank_orisa_avatar.png",
  primaryWeapon: "tank_orisa_weapon.png",
  secondary: "tank_orisa_secondaryfire.png",
  ultimate: "tank_orisa_ultimate.png",
  ability1: "tank_orisa_ability1.png",
  ability2: "tank_orisa_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "莱因哈特",
  avatar: "tank_reinhardt_avatar.png",
  primaryWeapon: "tank_reinhardt_weapon.png",
  secondary: "tank_reinhardt_secondaryfire.png",
  ultimate: "tank_reinhardt_ultimate.png",
  ability1: "tank_reinhardt_ability1.png",
  ability2: "tank_reinhardt_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "路霸",
  avatar: "tank_roadhog_avatar.png",
  primaryWeapon: "tank_roadhog_weapon.png",
  secondary: "tank_roadhog_secondaryfire.png",
  ultimate: "tank_roadhog_ultimate.png",
  ability1: "tank_roadhog_ability1.png",
  ability2: "tank_roadhog_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "西格玛",
  avatar: "tank_sigma_avatar.png",
  primaryWeapon: "tank_sigma_weapon.png",
  secondary: "tank_sigma_secondaryfire.png",
  ultimate: "tank_sigma_ultimate.png",
  ability1: "tank_sigma_ability1.png",
  ability2: "tank_sigma_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "温斯顿",
  avatar: "tank_winston_avatar.png",
  primaryWeapon: "tank_winston_weapon.png",
  secondaryWeapon: "tank_winston_weapon.png",
  ultimate: "tank_winston_ultimate.png",
  ability1: "tank_winston_ability1.png",
  ability2: "tank_winston_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "查莉娅",
  avatar: "tank_zarya_avatar.png",
  primaryWeapon: "tank_zarya_weapon.png",
  secondaryWeapon: "tank_zarya_weapon.png",
  ultimate: "tank_zarya_ultimate.png",
  ability1: "tank_zarya_ability1.png",
  ability2: "tank_zarya_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "拉玛刹",
  avatar: "tank_ramattra_avatar.png",
  primaryWeapon: "tank_ramattra_weapon1.png",
  secondary: "tank_ramattra_secondaryfire1.png",
  ultimate: "tank_ramattra_ultimate.png",
  ability1: "tank_ramattra_ability1.png",
  ability2: "tank_ramattra_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "毛加",
  avatar: "tank_mauga_avatar.png",
  primaryWeapon: "tank_mauga_weapon1.png",
  secondaryWeapon: "tank_mauga_weapon2.png",
  ultimate: "tank_mauga_ultimate.png",
  ability1: "tank_mauga_ability1.png",
  ability2: "tank_mauga_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "骇灾",
  avatar: "tank_hazard_avatar.png",
  primaryWeapon: "tank_hazard_weapon.png",
  secondary: "tank_hazard_secondaryfire.png",
  ultimate: "tank_hazard_ultimate.png",
  ability1: "tank_hazard_ability1.png",
  ability2: "tank_hazard_ability2.png",
  melee: "melee.png",
  jump: "tank_hazard_jump.png",
})}

</tbody>
</table>

<h4 style="display: flex; align-items: center;"><div class="icon-box">
<img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "hero",
            "type",
            "damage.png"
          )
        )}" class="icon">
</div>
&nbsp;输出</h4>
<table style="min-width: 700px; max-width: 800px;">
<thead>
<td style="text-align: center; font-weight: 600;">英雄</td>
<td style="text-align: center; font-weight: 600;">主要攻击模式</td>
<td style="text-align: center; font-weight: 600;">辅助攻击模式</td>
<td style="text-align: center; font-weight: 600;">终极技能</td>
<td style="text-align: center; font-weight: 600;">技能1</td>
<td style="text-align: center; font-weight: 600;">技能2</td>
<td style="text-align: center; font-weight: 600;">近身攻击</td>
<td style="text-align: center; font-weight: 600;">跳跃</td>
<td style="text-align: center; font-weight: 600;">蹲下</td>
</thead>

<tbody>
${buildHero({
  name: "艾什",
  avatar: "damage_ashe_avatar.png",
  primaryWeapon: "damage_ashe_weapon.png",
  ultimate: "damage_ashe_ultimate.png",
  ability1: "damage_ashe_ability1.png",
  ability2: "damage_ashe_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "堡垒",
  avatar: "damage_bastion_avatar.png",
  primaryWeapon: "damage_bastion_weapon1.png",
  secondary: "damage_bastion_secondaryfire.png",
  ultimate: "damage_bastion_ultimate.png",
  ability1: "damage_bastion_ability1.png",
  melee: "melee.png",
})}

${buildHero({
  name: "回声",
  avatar: "damage_echo_avatar.png",
  primaryWeapon: "damage_echo_weapon.png",
  secondary: "damage_echo_secondaryfire.png",
  ultimate: "damage_echo_ultimate.png",
  ability1: "damage_echo_ability1.png",
  ability2: "damage_echo_ability2.png",
  melee: "melee.png",
  jump: "damage_echo_jump.png",
})}

${buildHero({
  name: "源氏",
  avatar: "damage_genji_avatar.png",
  primaryWeapon: "damage_genji_weapon.png",
  secondaryWeapon: "damage_genji_weapon.png",
  ultimate: "damage_genji_ultimate.png",
  ability1: "damage_genji_ability1.png",
  ability2: "damage_genji_ability2.png",
  melee: "melee.png",
  jump: "damage_genji_jump.png",
})}

${buildHero({
  name: "半藏",
  avatar: "damage_hanzo_avatar.png",
  primaryWeapon: "damage_hanzo_weapon.png",
  ultimate: "damage_hanzo_ultimate.png",
  ability1: "damage_hanzo_ability1.png",
  ability2: "damage_hanzo_ability2.png",
  melee: "melee.png",
  jump: "damage_hanzo_jump.png",
})}

${buildHero({
  name: "狂鼠",
  avatar: "damage_junkrat_avatar.png",
  primaryWeapon: "damage_junkrat_weapon.png",
  ultimate: "damage_junkrat_ultimate.png",
  ability1: "damage_junkrat_ability1.png",
  ability2: "damage_junkrat_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "卡西迪",
  avatar: "damage_cassidy_avatar.png",
  primaryWeapon: "damage_cassidy_weapon.png",
  secondaryWeapon: "damage_cassidy_weapon.png",
  ultimate: "damage_cassidy_ultimate.png",
  ability1: "damage_cassidy_ability1.png",
  ability2: "damage_cassidy_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "美",
  avatar: "damage_mei_avatar.png",
  primaryWeapon: "damage_mei_weapon.png",
  secondaryWeapon: "damage_mei_weapon.png",
  ultimate: "damage_mei_ultimate.png",
  ability1: "damage_mei_ability1.png",
  ability2: "damage_mei_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "法老之鹰",
  avatar: "damage_pharah_avatar.png",
  primaryWeapon: "damage_pharah_weapon.png",
  secondary: "damage_pharah_secondaryfire.png",
  ultimate: "damage_pharah_ultimate.png",
  ability1: "damage_pharah_ability1.png",
  ability2: "damage_pharah_ability2.png",
  melee: "melee.png",
  jump: "damage_pharah_jump.png",
})}

${buildHero({
  name: "死神",
  avatar: "damage_reaper_avatar.png",
  primaryWeapon: "damage_reaper_weapon.png",
  ultimate: "damage_reaper_ultimate.png",
  ability1: "damage_reaper_ability1.png",
  ability2: "damage_reaper_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "索杰恩",
  avatar: "damage_sojourn_avatar.png",
  primaryWeapon: "damage_sojourn_weapon.png",
  secondary: "damage_sojourn_secondaryfire.png",
  ultimate: "damage_sojourn_ultimate.png",
  ability1: "damage_sojourn_ability1.png",
  ability2: "damage_sojourn_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "士兵：76",
  avatar: "damage_soldier76_avatar.png",
  primaryWeapon: "damage_soldier76_weapon.png",
  secondary: "damage_soldier76_secondaryfire.png",
  ultimate: "damage_soldier76_ultimate.png",
  ability1: "damage_soldier76_ability1.png",
  ability2: "damage_soldier76_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "黑影",
  avatar: "damage_sombra_avatar.png",
  primaryWeapon: "damage_sombra_weapon.png",
  secondary: "damage_sombra_secondaryfire.png",
  ultimate: "damage_sombra_ultimate.png",
  ability1: "damage_sombra_ability1.png",
  ability2: "damage_sombra_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "秩序之光",
  avatar: "damage_symmetra_avatar.png",
  primaryWeapon: "damage_symmetra_weapon.png",
  secondaryWeapon: "damage_symmetra_weapon.png",
  ultimate: "damage_symmetra_ultimate.png",
  ability1: "damage_symmetra_ability1.png",
  ability2: "damage_symmetra_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "托比昂",
  avatar: "damage_torbjorn_avatar.png",
  primaryWeapon: "damage_torbjorn_weapon1.png",
  secondaryWeapon: "damage_torbjorn_weapon1.png",
  ultimate: "damage_torbjorn_ultimate.png",
  ability1: "damage_torbjorn_ability1.png",
  ability2: "damage_torbjorn_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "猎空",
  avatar: "damage_tracer_avatar.png",
  primaryWeapon: "damage_tracer_weapon.png",
  ultimate: "damage_tracer_ultimate.png",
  ability1: "damage_tracer_ability1.png",
  ability2: "damage_tracer_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "黑百合",
  avatar: "damage_widowmaker_avatar.png",
  primaryWeapon: "damage_widowmaker_weapon.png",
  ultimate: "damage_widowmaker_ultimate.png",
  ability1: "damage_widowmaker_ability1.png",
  ability2: "damage_widowmaker_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "探奇",
  avatar: "damage_venture_avatar.png",
  primaryWeapon: "damage_venture_weapon.png",
  secondary: "damage_venture_secondaryfire.png",
  ultimate: "damage_venture_ultimate.png",
  ability1: "damage_venture_ability1.png",
  melee: "damage_venture_melee.png",
})}

${buildHero({
  name: "弗蕾娅",
  avatar: "damage_freja_avatar.png",
  primaryWeapon: "damage_freja_weapon.png",
  secondary: "damage_freja_secondaryfire.png",
  ultimate: "damage_freja_ultimate.png",
  ability1: "damage_freja_ability1.png",
  ability2: "damage_freja_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "斩仇",
  avatar: "damage_vendetta_avatar.png",
  primaryWeapon: "damage_vendetta_weapon.png",
  secondary: "damage_vendetta_secondaryfire.png",
  ultimate: "damage_vendetta_ultimate.png",
  ability1: "damage_vendetta_ability1.png",
  ability2: "damage_vendetta_ability2.png",
  melee: "melee.png",
})}

</tbody>
</table>

<h4 style="display: flex; align-items: center;"><div class="icon-box">
<img src="${webviewView.webview.asWebviewUri(
          vscode.Uri.joinPath(
            EXTENSION_URI,
            "images",
            "ow",
            "hero",
            "type",
            "support.png"
          )
        )}" class="icon">
</div>
&nbsp;支援</h4>
<table style="min-width: 700px; max-width: 800px;">
<thead>
<td style="text-align: center; font-weight: 600;">英雄</td>
<td style="text-align: center; font-weight: 600;">主要攻击模式</td>
<td style="text-align: center; font-weight: 600;">辅助攻击模式</td>
<td style="text-align: center; font-weight: 600;">终极技能</td>
<td style="text-align: center; font-weight: 600;">技能1</td>
<td style="text-align: center; font-weight: 600;">技能2</td>
<td style="text-align: center; font-weight: 600;">近身攻击</td>
<td style="text-align: center; font-weight: 600;">跳跃</td>
<td style="text-align: center; font-weight: 600;">蹲下</td>
</thead>

<tbody>
${buildHero({
  name: "安娜",
  avatar: "support_ana_avatar.png",
  primaryWeapon: "support_ana_weapon.png",
  ultimate: "support_ana_ultimate.png",
  ability1: "support_ana_ability1.png",
  ability2: "support_ana_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "巴蒂斯特",
  avatar: "support_baptiste_avatar.png",
  primaryWeapon: "support_baptiste_weapon1.png",
  secondaryWeapon: "support_baptiste_weapon2.png",
  ultimate: "support_baptiste_ultimate.png",
  ability1: "support_baptiste_ability1.png",
  ability2: "support_baptiste_ability2.png",
  melee: "melee.png",
  jump: "support_baptiste_jump.png",
})}

${buildHero({
  name: "布丽吉塔",
  avatar: "support_brigitte_avatar.png",
  primaryWeapon: "support_brigitte_weapon.png",
  secondary: "support_brigitte_secondaryfire1.png",
  ultimate: "support_brigitte_ultimate.png",
  ability1: "support_brigitte_ability1.png",
  ability2: "support_brigitte_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "雾子",
  avatar: "support_kiriko_avatar.png",
  primaryWeapon: "support_kiriko_weapon1.png",
  secondaryWeapon: "support_kiriko_weapon2.png",
  ultimate: "support_kiriko_ultimate.png",
  ability1: "support_kiriko_ability1.png",
  ability2: "support_kiriko_ability2.png",
  melee: "melee.png",
  jump: "support_kiriko_jump.png",
})}

${buildHero({
  name: "卢西奥",
  avatar: "support_lucio_avatar.png",
  primaryWeapon: "support_lucio_weapon.png",
  secondary: "support_lucio_secondaryfire.png",
  ultimate: "support_lucio_ultimate.png",
  ability1: "support_lucio_ability1.png",
  ability2: "support_lucio_ability2.png",
  melee: "melee.png",
  jump: "support_lucio_jump.png",
})}

${buildHero({
  name: "天使",
  avatar: "support_mercy_avatar.png",
  primaryWeapon: "support_mercy_weapon1.png",
  secondaryWeapon: "support_mercy_weapon1.png",
  ultimate: "support_mercy_ultimate.png",
  ability1: "support_mercy_ability1.png",
  ability2: "support_mercy_ability2.png",
  melee: "melee.png",
  jump: "support_mercy_jump.png",
})}

${buildHero({
  name: "莫伊拉",
  avatar: "support_moira_avatar.png",
  primaryWeapon: "support_moira_weapon.png",
  secondary: "support_moira_secondaryfire.png",
  ultimate: "support_moira_ultimate.png",
  ability1: "support_moira_ability1.png",
  ability2: "support_moira_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "禅雅塔",
  avatar: "support_zenyatta_avatar.png",
  primaryWeapon: "support_zenyatta_weapon.png",
  secondaryWeapon: "support_zenyatta_weapon.png",
  ultimate: "support_zenyatta_ultimate.png",
  ability1: "support_zenyatta_ability1.png",
  ability2: "support_zenyatta_ability2.png",
  melee: "support_zenyatta_melee.png",
})}

${buildHero({
  name: "生命之梭",
  avatar: "support_lifeweaver_avatar.png",
  primaryWeapon: "support_lifeweaver_weapon1.png",
  secondaryWeapon: "support_lifeweaver_weapon2.png",
  ultimate: "support_lifeweaver_ultimate.png",
  ability1: "support_lifeweaver_ability1.png",
  ability2: "support_lifeweaver_ability2.png",
  melee: "melee.png",
  jump: "support_lifeweaver_jump.png",
})}

${buildHero({
  name: "伊拉锐",
  avatar: "support_illari_avatar.png",
  primaryWeapon: "support_illari_weapon.png",
  secondary: "support_illari_secondaryfire.png",
  ultimate: "support_illari_ultimate.png",
  ability1: "support_illari_ability1.png",
  ability2: "support_illari_ability2.png",
  melee: "melee.png",
})}

${buildHero({
  name: "朱诺",
  avatar: "support_juno_avatar.png",
  primaryWeapon: "support_juno_weapon.png",
  secondary: "support_juno_secondaryfire.png",
  ultimate: "support_juno_ultimate.png",
  ability1: "support_juno_ability1.png",
  ability2: "support_juno_ability2.png",
  melee: "melee.png",
  jump: "support_juno_jump.png",
})}
        
${buildHero({
  name: "无漾",
  avatar: "support_wuyang_avatar.png",
  primaryWeapon: "support_wuyang_weapon.png",
  secondary: "support_wuyang_secondaryfire.png",
  ultimate: "support_wuyang_ultimate.png",
  ability1: "support_wuyang_ability1.png",
  ability2: "support_wuyang_ability2.png",
  melee: "melee.png",
})}
</tbody>
</table>
</body>
</html>`;
      }

      function getProjectileTableHtml() {
        const projectile = 常量.弹道
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        const projectileExplosion = 常量.弹道爆炸效果
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        const projectileExplosionSound = 常量.弹道爆炸声音
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>弹道</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>
<i><h3>弹道</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${projectile}
</tr>
</table>

<i><h3>弹道爆炸效果</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${projectileExplosion}
</tr>
</table>

<i><h3>弹道爆炸声音</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${projectileExplosionSound}
</tr>
</table>
</body>
</html>`;
      }

      function getEffectTableHtml() {
        const effects = 常量.效果
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        const beamEffects = 常量.光束效果
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        const playerEffects = 常量.播放效果
          .map((element, index) => {
            return `</tr><tr><td style="text-align: center;">${element.名称}</td>`;
          })
          .join("");
        return `<!DOCTYPE html>
<html>
<head>
<link href="${styleUri}" rel="stylesheet">
<script src="${scriptUri}"></script>
<title>效果</title>
</head>
<body>
<br>
<button style="width: auto; height: 25px;" onclick="navigate('Home')">返回</button>

<i><h3>效果</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${effects}
</tr>
</table>

<i><h3>光束效果</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${beamEffects}
</tr>
</table>

<i><h3>播放效果</h3></i>
<table style="min-width: 300px; max-width: 525px;">
<tr>
${playerEffects}
</tr>
</table>

</body>
</html>`;
      }

      webviewView.webview.html = getHomeHtml();
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [EXTENSION_URI],
      };
      webviewView.webview.onDidReceiveMessage((message) => {
        switch (message) {
          case "Home":
            webviewView.webview.html = getHomeHtml();
            return;
          case "HeroIcon":
            webviewView.webview.html = getHeroIconTableHtml();
            return;
          case "Icon":
            webviewView.webview.html = getIconTableHtml();
            return;
          case "String":
            webviewView.webview.html = getStringTableHtml();
            return;
          case "Mode":
            webviewView.webview.html = getModeTableHtml();
            return;
          case "Map":
            webviewView.webview.html = getMapTableHtml();
            return;
          case "Color":
            webviewView.webview.html = getColorTableHtml();
            return;
          case "Projectile":
            webviewView.webview.html = getProjectileTableHtml();
            return;
          case "Effect":
            webviewView.webview.html = getEffectTableHtml();
            return;
          default:
            console.log("Unknown command: " + message.command);
            return;
        }
      });
    } catch (error) {
      console.log("错误：resolveWebviewView 面板手册能力");
      console.log(error);
    }
  }
}

//面板手册能力
const disposable = vscode.window.registerWebviewViewProvider(
  "ow.view.manual",
  new WebviewViewProvider()
);

export default disposable;
