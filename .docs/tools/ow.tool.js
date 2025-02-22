//调试工具：正则排序
function sortAndFilterChineseKeyword(s) {
  const str = s.split("|");
  const set = new Set(str);
  let arr = Array.from(set).sort((b, a) => a.localeCompare(b, "zh-Hans-CN"));
  console.log(arr.join("|"));
}

//node ow.tool.js

//调试工具：正则字符串
function getModelString() {
  let str = "";
  for (i in MODEL.规则.条件) {
    str += "|" + i;
  }
  for (i in MODEL.规则.动作) {
    str += "|" + i;
  }
  sortAndFilterChineseKeyword(str.slice(1));
}

//调试工具：对象属性数组化
function convertObjectToArray() {
  try {
    const inputObject = MODEL.规则.条件;

    const outputArray = [];

    // Sort the property names
    const sortedPropNames = Object.keys(inputObject).sort((b, a) =>
      a.localeCompare(b, "zh-Hans-CN")
    );

    for (const propName of sortedPropNames) {
      const prop = inputObject[propName];

      const outputItem = {
        match: propName,
      };

      if (prop.hasOwnProperty("参数")) {
        outputItem.patterns = prop["参数"].map((param) => {
          return {
            include: `#${param["类型"]}`,
          };
        });
      }

      outputArray.push(outputItem);
    }

    const outputString = JSON.stringify(outputArray, null, 2);

    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

//调试工具：多音字数组 (npm install pinyinlite)
function buildPinYinArray() {
  try {
    let obj = MODEL.常量;

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          if (item.名称) {
            item.拼音 = require("pinyin-pro")
              .pinyin(item.名称, {
                toneType: "none",
                type: "array",
              })
              .join(" ");
          }
        });
      } else if (typeof obj[key] === "object") {
        addPinyin(obj[key]);
      }
    }

    const outputString = JSON.stringify(obj, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinPropertyToObjectElement() {
  try {
    let obj = MODEL.常量;

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          if (item.名称) {
            item.拼音 = require("pinyin-pro")
              .pinyin(item.名称, {
                toneType: "none",
                type: "array",
              })
              .join(" ");
          }
        });
      } else if (typeof obj[key] === "object") {
        addPinyin(obj[key]);
      }
    }

    const outputString = JSON.stringify(obj, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinToSubSubObject() {
  try {
    let obj = MODEL.规则.事件;

    for (const key in obj) {
      if (typeof obj[key] === "object") {
        for (const subKey in obj[key]) {
          if (typeof obj[key][subKey] === "object") {
            // Assuming you have a getPinyin function to get the 拼音
            obj[key][subKey].拼音 = require("pinyin-pro")
              .pinyin(subKey, {
                toneType: "none",
                type: "array",
              })
              .join(" ");
          }
        }
      }
    }

    const outputString = JSON.stringify(obj, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinToSubObject() {
  try {
    //先换成字符串防止属性展开
    //选项: 常量\.(.*), | 选项: "常量.$1",

    //完成后替换回来
    //选项: "常量\.(.*)", | 选项: 常量.$1,

    let obj = MODEL.规则.条件;

    for (const key in obj) {
      obj[key].拼音 = require("pinyin-pro")
        .pinyin(key, {
          toneType: "none",
          type: "array",
        })
        .join(" ");
    }

    const outputString = JSON.stringify(MODEL.规则.条件, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinToSubObject() {
  try {
    //先换成字符串防止属性展开
    //选项: 常量\.(.*), | 选项: "常量.$1",

    //完成后替换回来
    //选项: "常量\.(.*)", | 选项: 常量.$1,

    let sampleObject = MODEL.规则.动作;

    function replaceProperty(obj, propName, replacement) {
      if (typeof obj === "object") {
        if (obj.hasOwnProperty(propName)) {
          obj[propName] = obj[propName]
            .split(" ")
            .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
            .join(" ");
        }
        for (var key in obj) {
          if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            replaceProperty(obj[key], propName, replacement);
          }
        }
      }
    }

    replaceProperty(sampleObject, "拼音", sampleObject["拼音"]);

    const outputString = JSON.stringify(MODEL.规则.动作, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinToSubObject() {
  try {
    //先换成字符串防止属性展开
    //选项: 常量\.(.*), | 选项: "常量.$1",

    //完成后替换回来
    //选项: "常量\.(.*)", | 选项: 常量.$1,

    let obj = MODEL.常量;

    for (const key in obj) {
      for (const subKey in obj[key]) {
        for (const subsubKey in obj[key][subKey]) {
          if (subsubKey == "拼音") {
            console.log(obj[key][subKey][subsubKey]);
            obj[key][subKey][subsubKey] = obj[key][subKey][subsubKey]
              .split(" ")
              .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
              .join(" ");
          }
        }
      }
    }

    const outputString = JSON.stringify(MODEL.常量, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function buildPinYinToSubObject() {
  try {
    //先换成字符串防止属性展开
    //选项: 常量\.(.*), | 选项: "常量.$1",

    //完成后替换回来
    //选项: "常量\.(.*)", | 选项: 常量.$1,

    let obj = MODEL.扩展;

    for (const key in obj) {
      obj[key].拼音 = require("pinyin-pro")
        .pinyin(key, {
          toneType: "none",
          type: "array",
        })
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ");
    }

    const outputString = JSON.stringify(MODEL.扩展, null, 2);
    fs.writeFileSync("output.txt", outputString, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

//node ow.tool.js
//console.log(sortAndFilterChineseKeyword(""));

const compareMap = () => {
  const 地图 = [
    {
      名称: "66号公路",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "66 Hao Gong Lu",
    },
    {
      名称: "“地平线”月球基地",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "“ Di Ping Xian ” Yue Qiu Ji Di",
    },
    {
      名称: "万圣节吉拉德堡",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Wan Sheng Jie Ji La De Bao",
    },
    {
      名称: "万圣节好莱坞",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Wan Sheng Jie Hao Lai Wu",
    },
    {
      名称: "万圣节艾兴瓦尔德",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Wan Sheng Jie Ai Xing Wa Er De",
    },
    {
      名称: "中城",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Zhong Cheng",
    },
    {
      名称: "伊利奥斯",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Yi Li Ao Si",
    },
    {
      名称: "伊利奥斯废墟",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Yi Li Ao Si Fei Xu",
    },
    {
      名称: "伊利奥斯深井",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Yi Li Ao Si Shen Jing",
    },
    {
      名称: "伊利奥斯灯塔",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Yi Li Ao Si Deng Ta",
    },
    {
      名称: "佩特拉",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Pei Te La",
    },
    {
      名称: "努巴尼",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Nu Ba Ni",
    },
    {
      名称: "南极半岛",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Nan Ji Ban Dao",
    },
    {
      名称: "吉拉德堡",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ji La De Bao",
    },
    {
      名称: "哈瓦那",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ha Wa Na",
    },
    {
      名称: "国王大道",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Guo Wang Da Dao",
    },
    {
      名称: "圣诞节国王大道",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Guo Wang Da Dao",
    },
    {
      名称: "圣诞节尼泊尔村庄",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Ni Bo Er Cun Zhuang",
    },
    {
      名称: "圣诞节暴雪世界",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Bao Xue Shi Jie",
    },
    {
      名称: "圣诞节生态监测站：南极洲",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Sheng Tai Jian Ce Zhan ： Nan Ji Zhou",
    },
    {
      名称: "圣诞节花村",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Hua Cun",
    },
    {
      名称: "圣诞节黑森林",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Dan Jie Hei Sen Lin",
    },
    {
      名称: "地图工坊室内",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Shi Nei",
    },
    {
      名称: "地图工坊岛屿",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Dao Yu",
    },
    {
      名称: "地图工坊岛屿（夜间）",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Dao Yu （ Ye Jian ）",
    },
    {
      名称: "地图工坊空地",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Kong Di",
    },
    {
      名称: "地图工坊空地（夜间）",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Kong Di （ Ye Jian ）",
    },
    {
      名称: "地图工坊绿幕",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Di Tu Gong Fang Lv Mu",
    },
    {
      名称: "埃斯佩兰萨",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ai Si Pei Lan Sa",
    },
    {
      名称: "城堡",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Cheng Bao",
    },
    {
      名称: "墓园",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Mu Yuan",
    },
    {
      名称: "多拉多",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Duo La Duo",
    },
    {
      名称: "好莱坞",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Hao Lai Wu",
    },
    {
      名称: "尼泊尔",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ni Bo Er",
    },
    {
      名称: "尼泊尔圣坛",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ni Bo Er Sheng Tan",
    },
    {
      名称: "尼泊尔圣所",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ni Bo Er Sheng Suo",
    },
    {
      名称: "尼泊尔村庄",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ni Bo Er Cun Zhuang",
    },
    {
      名称: "巴黎",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ba Li",
    },
    {
      名称: "帕拉伊苏",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Pa La Yi Su",
    },
    {
      名称: "弗格体育场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Fu Ge Ti Yu Chang",
    },
    {
      名称: "怪鼠复仇",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Guai Shu Fu Chou",
    },
    {
      名称: "悉尼海港竞技场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Xi Ni Hai Gang Jing Ji Chang",
    },
    {
      名称: "斗兽场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Dou Shou Chang",
    },
    {
      名称: "新渣客城",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Xin Zha Ke Cheng",
    },
    {
      名称: "新皇后街",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Xin Huang Hou Jie",
    },
    {
      名称: "春节漓江塔",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Li Jiang Ta",
    },
    {
      名称: "春节漓江塔夜市",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Li Jiang Ta Ye Shi",
    },
    {
      名称: "春节漓江塔庭院",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Li Jiang Ta Ting Yuan",
    },
    {
      名称: "春节漓江塔控制中心",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Li Jiang Ta Kong Zhi Zhong Xin",
    },
    {
      名称: "春节釜山城区",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Fu Shan Cheng Qu",
    },
    {
      名称: "春节釜山寺院",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Chun Jie Fu Shan Si Yuan",
    },
    {
      名称: "暴雪世界",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Bao Xue Shi Jie",
    },
    {
      名称: "沃斯卡娅工业区",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Wo Si Ka Ya Gong Ye Qu",
    },
    {
      名称: "渣客镇",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Zha Ke Zhen",
    },
    {
      名称: "漓江塔",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Li Jiang Ta",
    },
    {
      名称: "漓江塔夜市",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Li Jiang Ta Ye Shi",
    },
    {
      名称: "漓江塔庭院",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Li Jiang Ta Ting Yuan",
    },
    {
      名称: "漓江塔控制中心",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Li Jiang Ta Kong Zhi Zhong Xin",
    },
    {
      名称: "生态监测站：南极洲",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sheng Tai Jian Ce Zhan ： Nan Ji Zhou",
    },
    {
      名称: "皇家赛道",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Huang Jia Sai Dao",
    },
    {
      名称: "监测站：直布罗陀",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Jian Ce Zhan ： Zhi Bu Luo Tuo",
    },
    {
      名称: "监测站：直布罗陀（黑爪）",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Jian Ce Zhan ： Zhi Bu Luo Tuo （ Hei Zhao ）",
    },
    {
      名称: "绿洲城",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Lv Zhou Cheng",
    },
    {
      名称: "绿洲城中心",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Lv Zhou Cheng Zhong Xin",
    },
    {
      名称: "绿洲城大学",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Lv Zhou Cheng Da Xue",
    },
    {
      名称: "绿洲城花园",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Lv Zhou Cheng Hua Yuan",
    },
    {
      名称: "艾兴瓦尔德",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ai Xing Wa Er De",
    },
    {
      名称: "花冈",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Hua Gang",
    },
    {
      名称: "花村",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Hua Cun",
    },
    {
      名称: "苏拉瓦萨",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Su La Wa Sa",
    },
    {
      名称: "英雄精通：试炼场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ying Xiong Jing Tong ： Shi Lian Chang",
    },
    {
      名称: "萨摩亚",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Sa Mo Ya",
    },
    {
      名称: "训练靶场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Xun Lian Ba Chang",
    },
    {
      名称: "里阿尔托",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Li A Er Tuo",
    },
    {
      名称: "釜山",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Fu Shan",
    },
    {
      名称: "釜山体育场",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Fu Shan Ti Yu Chang",
    },
    {
      名称: "铁坂",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Tie Ban",
    },
    {
      名称: "阿努比斯王座",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "A Nu Bi Si Wang Zuo",
    },
    {
      名称: "阿努比斯神殿",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "A Nu Bi Si Shen Dian",
    },
    {
      名称: "阿育陀耶",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "A Yu Tuo Ye",
    },
    {
      名称: "香巴里寺院",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Xiang Ba Li Si Yuan",
    },
    {
      名称: "马莱温多",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Ma Lai Wen Duo",
    },
    {
      名称: "鲁纳塞彼",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Lu Na Sai Bi",
    },
    {
      名称: "黑森林",
      标签: ["地图"],
      提示: "一张地图。",
      拼音: "Hei Sen Lin",
    },
  ];

  const 模式 = [
    {
      名称: "乐动爱斗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Le Dong Ai Dou",
    },
    {
      名称: "决斗先锋",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Jue Dou Xian Feng",
    },
    {
      名称: "动感斗球",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Dong Gan Dou Qiu",
    },
    {
      名称: "勇夺锦旗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Yong Duo Jin Qi",
    },
    {
      名称: "占领要点",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Zhan Ling Yao Dian",
    },
    {
      名称: "团队死斗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Tuan Dui Si Dou",
    },
    {
      名称: "怪鼠复仇",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Guai Shu Fu Chou",
    },
    {
      名称: "攻击护送",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Gong Ji Hu Song",
    },
    {
      名称: "攻防作战",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Gong Fang Zuo Zhan",
    },
    {
      名称: "攻防阵线",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Gong Fang Zhen Xian",
    },
    {
      名称: "星际守望：银河救兵",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Xing Ji Shou Wang ： Yin He Jiu Bing",
    },
    {
      名称: "机动推进",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Ji Dong Tui Jin",
    },
    {
      名称: "死斗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Si Dou",
    },
    {
      名称: "温斯顿的沙滩排球",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Wen Si Dun De Sha Tan Pai Qiu",
    },
    {
      名称: "突击模式",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Tu Ji Mo Shi",
    },
    {
      名称: "融冰决斗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Rong Bing Jue Dou",
    },
    {
      名称: "训练靶场",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Xun Lian Ba Chang",
    },
    {
      名称: "赏金猎手",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Shang Jin Lie Shou",
    },
    {
      名称: "路霸的小鱿抓抓乐",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Lu Ba De Xiao You Zhua Zhua Le",
    },
    {
      名称: "运载目标",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Yun Zai Mu Biao",
    },
    {
      名称: "镜影守望占领要点",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Jing Ying Shou Wang Zhan Ling Yao Dian",
    },
    {
      名称: "镜影守望攻击护送",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Jing Ying Shou Wang Gong Ji Hu Song",
    },
    {
      名称: "镜影守望运载目标",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Jing Ying Shou Wang Yun Zai Mu Biao",
    },
    {
      名称: "闪点作战",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Shan Dian Zuo Zhan",
    },
    {
      名称: "雪域狩猎",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Xue Yu Shou Lie",
    },
    {
      名称: "雪球攻势",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Xue Qiu Gong Shi",
    },
    {
      名称: "雪球死斗",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Xue Qiu Si Dou",
    },
    {
      名称: "魔法淘气包",
      标签: ["模式"],
      提示: "一个模式选项。",
      拼音: "Mo Fa Tao Qi Bao",
    },
  ];

  console.log("模式", 模式.map((map) => map.名称).join("|"));
  console.log("地图", 地图.map((map) => map.名称).join("|"));

  /*
  "乐动爱斗|决斗先锋|动感斗球|勇夺锦旗|占领要点|团队死斗|怪鼠复仇|攻击护送|攻防作战|攻防阵线|星际守望：银河救兵|机动推进|死斗|温斯顿的沙滩排球|突击模式|融冰决斗|训练靶场|赏金猎手|路霸的小鱿抓抓乐|运载目标|镜影守望占领要点|镜影守望攻击护送|镜影守望运载目标|闪点作战|雪域狩猎|雪球攻势|雪球死斗|魔法淘气包"
  "66号公路|万圣节吉拉德堡|万圣节好莱坞|万圣节艾兴瓦尔德|中城|伊利奥斯|伊利奥斯废墟|伊利奥斯深井|伊利奥斯灯塔|佩特拉|努巴尼|南极半岛|吉拉德堡|哈瓦那|国王大道|圣诞节国王大道|圣诞节尼泊尔村庄|圣诞节暴雪世界|圣诞节生态监测站：南极洲|圣诞节花村|圣诞节黑森林|地图工坊室内|地图工坊岛屿|地图工坊空地|地图工坊绿幕|埃斯佩兰萨|城堡|墓园|多拉多|好莱坞|尼泊尔|尼泊尔圣坛|尼泊尔圣所|尼泊尔村庄|巴黎|帕拉伊苏|弗格体育场|怪鼠复仇|悉尼海港竞技场|斗兽场|新渣客城|新皇后街|春节漓江塔|春节漓江塔夜市|春节漓江塔庭院|春节漓江塔控制中心|春节釜山城区|春节釜山寺院|暴雪世界|沃斯卡娅工业区|渣客镇|漓江塔|漓江塔夜市|漓江塔庭院|漓江塔控制中心|生态监测站：南极洲|皇家赛道|监测站：直布罗陀|绿洲城|绿洲城中心|绿洲城大学|绿洲城花园|艾兴瓦尔德|花冈|花村|苏拉瓦萨|英雄精通：试炼场|萨摩亚|训练靶场|里阿尔托|釜山|釜山体育场|铁坂|阿努比斯王座|阿努比斯神殿|阿育陀耶|香巴里寺院|马莱温多|鲁纳塞彼|黑森林"

  "“地平线”月球基地"
  "地图工坊岛屿（夜间）|地图工坊空地（夜间）|监测站：直布罗陀（黑爪）"
  */
};

compareMap();

