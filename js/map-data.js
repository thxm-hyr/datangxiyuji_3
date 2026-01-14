// 玄奘西行38个国家坐标数据（基于《大唐西域记》和地点信息文件整理）
const countriesData = [
    {
        id: 1,
        name: "阿耆尼国",
        modern_name: "焉耆",
        coordinates: [41.75, 86.50],
        location: "新疆塔里木盆地东北部",
        modern_country: "中国",
        region: "新疆",
        type: "important",
        description: "玄奘西行的第一个国家，佛教文化中心。焉耆国都为员渠城，离长安七千三百里。公元前二世纪至元年间约四千户，人口约三万余人，兵士六千人。"
    },
    {
        id: 2,
        name: "屈支国",
        modern_name: "龟兹",
        coordinates: [41.72, 82.95],
        location: "龟兹国以库车绿洲为中心，北枕天山，南临大漠，西与疏勒接，东与焉耆为邻",
        modern_country: "中国",
        region: "新疆",
        type: "buddhist",
        description: "著名的克孜尔石窟所在地，佛教艺术中心。龟兹国汉时旧国，都城方六里，胜兵者数千，是丝绸之路北道的重要国家。"
    },
    {
        id: 3,
        name: "跋禄迦国",
        modern_name: "姑墨",
        coordinates: [41.30, 80.25],
        location: "新疆阿克苏地区拜城县一带，都城位于今新疆阿克苏市温宿县一带",
        modern_country: "中国",
        region: "新疆",
        type: "normal",
        description: "玄奘西行的重要中转站。控制范围包括今阿克苏河流域的绿洲群，西接疏勒（喀什），东连龟兹（库车），北依天山南麓，处于丝绸之路'北道'要冲。"
    },
    {
        id: 4,
        name: "素叶水城",
        modern_name: "碎叶城",
        coordinates: [42.80, 75.60],
        location: "吉尔吉斯斯坦楚河州托克莫克西南8公里处",
        modern_country: "吉尔吉斯斯坦",
        region: "楚河州",
        type: "important",
        description: "唐代西域重镇，李白出生地。公元6世纪末，位于楚河畔的碎叶城，因地处丝绸之路要冲，水土丰美，成为西突厥十姓部落的牙庭。"
    },
    {
        id: 5,
        name: "呾逻私城",
        modern_name: "怛罗斯",
        coordinates: [42.90, 71.37],
        location: "哈萨克斯坦江布尔州境内，地处塔拉斯河左岸",
        modern_country: "哈萨克斯坦",
        region: "江布尔州",
        type: "important",
        description: "著名的怛罗斯战役发生地。公元5世纪由善于经商的粟特人建立，公元751年唐朝安西节度使高仙芝与阿拉伯阿拔斯王朝联军在此激战。"
    },
    {
        id: 6,
        name: "白水城",
        modern_name: "赛兰",
        coordinates: [42.30, 69.60],
        location: "哈萨克斯坦奇姆肯特州境内，具体可能在奇姆肯特市以东约15公里处的赛兰镇附近",
        modern_country: "哈萨克斯坦",
        region: "奇姆肯特州",
        type: "normal",
        description: "丝绸之路上的重要城市。由善于经商的粟特人建立，是丝绸之路上的重要商业城邦之一。"
    },
    {
        id: 7,
        name: "恭御城",
        modern_name: "塔拉兹",
        coordinates: [42.90, 71.37],
        location: "哈萨克斯坦江布尔州塔拉兹市以西约18公里处，坐落在塔拉斯河南岸的一处高地上",
        modern_country: "哈萨克斯坦",
        region: "江布尔州",
        type: "normal",
        description: "中亚古城，军事要塞。作为怛罗斯城的近邻和外围支撑点，恭御城无疑是高仙芝唐军与阿拉伯联军对峙和交战区域的重要组成部分。"
    },
    {
        id: 8,
        name: "笯赤建国",
        modern_name: "奇姆肯特",
        coordinates: [42.32, 69.59],
        location: "哈萨克斯坦奇姆肯特（Shymkent）一带",
        modern_country: "哈萨克斯坦",
        region: "奇姆肯特州",
        type: "normal",
        description: "丝绸之路上的商业中心。粟特语'Nujkath'或'Nujkent'，意为'新城'，是丝绸之路上的重要商业据点。"
    },
    {
        id: 9,
        name: "赭时国",
        modern_name: "石国",
        coordinates: [41.31, 69.24],
        location: "乌兹别克斯坦共和国的塔什干州及周边，其中心是当今乌兹别克斯坦首都塔什干及其以东的锡尔河沿岸地区",
        modern_country: "乌兹别克斯坦",
        region: "塔什干州",
        type: "important",
        description: "中亚重要的商业和文化中心。由粟特人建立，逐渐发展成为锡尔河流域的政治、经济和文化中心，是丝绸之路上的重要节点。"
    },
    {
        id: 10,
        name: "㤄捍国",
        modern_name: "大宛",
        coordinates: [40.38, 71.78],
        location: "费尔干纳盆地（Fergana Valley），天山和吉萨尔－阿赖山的山间盆地，位于乌兹别克斯坦、塔吉克斯坦和吉尔吉斯斯坦三国的交界地区",
        modern_country: "乌兹别克斯坦",
        region: "费尔干纳州",
        type: "important",
        description: "以出产汗血宝马闻名。汉代称大宛国，是丝绸之路上的重要国家，以出产优良战马而闻名于世。"
    },
    {
        id: 11,
        name: "窣堵利瑟那国",
        modern_name: "东曹",
        coordinates: [39.92, 68.81],
        location: "塔吉克斯坦西北列宁纳巴德与撒马尔罕之间",
        modern_country: "塔吉克斯坦",
        region: "索格特州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 12,
        name: "飒秣建国",
        modern_name: "康国",
        coordinates: [39.65, 66.96],
        location: "乌兹别克斯坦撒马尔罕地区",
        modern_country: "乌兹别克斯坦",
        region: "撒马尔罕州",
        type: "buddhist",
        description: "中亚最古老的城市之一，佛教文化中心"
    },
    {
        id: 13,
        name: "弭秣贺国",
        modern_name: "米国",
        coordinates: [39.50, 66.00],
        location: "乌兹别克斯坦朱马巴札尔或模安",
        modern_country: "乌兹别克斯坦",
        region: "撒马尔罕州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 14,
        name: "劫布呾那国",
        modern_name: "曹国",
        coordinates: [39.70, 66.30],
        location: "乌兹别克斯坦撒马尔罕北部至塔吉克斯坦西北部一带",
        modern_country: "乌兹别克斯坦",
        region: "撒马尔罕州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 15,
        name: "屈霜你迦国",
        modern_name: "何国",
        coordinates: [39.40, 66.20],
        location: "乌兹别克斯坦撒马尔罕州与布哈拉州之间",
        modern_country: "乌兹别克斯坦",
        region: "撒马尔罕州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 16,
        name: "喝捍国",
        modern_name: "东安国",
        coordinates: [39.80, 64.40],
        location: "乌兹别克斯坦布哈拉东北部",
        modern_country: "乌兹别克斯坦",
        region: "布哈拉州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 17,
        name: "捕喝国",
        modern_name: "安国",
        coordinates: [39.77, 64.42],
        location: "乌兹别克斯坦布哈拉地区",
        modern_country: "乌兹别克斯坦",
        region: "布哈拉州",
        type: "buddhist",
        description: "中亚重要的佛教中心"
    },
    {
        id: 18,
        name: "伐地国",
        modern_name: "西安国",
        coordinates: [39.10, 63.60],
        location: "土库曼斯坦列巴普州土库曼纳巴德",
        modern_country: "土库曼斯坦",
        region: "列巴普州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 19,
        name: "货利习弥伽国",
        modern_name: "花剌子模",
        coordinates: [41.55, 60.63],
        location: "乌兹别克斯坦及土库曼斯坦交界的阿姆河下游两岸",
        modern_country: "乌兹别克斯坦",
        region: "花剌子模州",
        type: "important",
        description: "古代中亚强国，文化发达"
    },
    {
        id: 20,
        name: "羯霜那国",
        modern_name: "史国",
        coordinates: [38.87, 65.80],
        location: "乌兹别克斯坦卡什卡河州南部",
        modern_country: "乌兹别克斯坦",
        region: "卡什卡河州",
        type: "normal",
        description: "昭武九姓国家之一"
    },
    {
        id: 21,
        name: "睹货逻国",
        modern_name: "吐火罗",
        coordinates: [37.00, 68.00],
        location: "帕米尔高原西南与阿姆河上游",
        modern_country: "阿富汗",
        region: "巴尔赫省",
        type: "important",
        description: "古代中亚重要国家，佛教文化发达"
    },
    {
        id: 22,
        name: "呾蜜国",
        modern_name: "泰尔梅兹",
        coordinates: [37.22, 67.27],
        location: "乌兹别克斯坦苏尔汉河州首府泰尔梅兹",
        modern_country: "乌兹别克斯坦",
        region: "苏尔汉河州",
        type: "buddhist",
        description: "重要的佛教遗址所在地"
    },
    {
        id: 23,
        name: "赤鄂衍那国",
        modern_name: "石汗那",
        coordinates: [37.40, 67.50],
        location: "乌兹别克斯坦南部，苏尔汉河上游西之迭脑一带",
        modern_country: "乌兹别克斯坦",
        region: "苏尔汉河州",
        type: "normal",
        description: "中亚小国，佛教文化影响区"
    },
    {
        id: 24,
        name: "忽露摩国",
        modern_name: "忽露摩",
        coordinates: [37.60, 67.80],
        location: "具体位置待考",
        modern_country: "塔吉克斯坦",
        region: "未知",
        type: "normal",
        description: "玄奘途经的小国"
    },
    {
        id: 25,
        name: "愉漫国",
        modern_name: "愉漫",
        coordinates: [38.54, 68.78],
        location: "可能位于塔吉克斯坦杜尚别附近",
        modern_country: "塔吉克斯坦",
        region: "杜尚别",
        type: "normal",
        description: "中亚小国"
    },
    {
        id: 26,
        name: "鞠和衍那国",
        modern_name: "久越得健",
        coordinates: [37.90, 68.70],
        location: "塔吉克斯坦卡巴迪安",
        modern_country: "塔吉克斯坦",
        region: "卡巴迪安",
        type: "normal",
        description: "中亚小国，佛教文化影响区"
    },
    {
        id: 27,
        name: "镬沙国",
        modern_name: "沃沙城",
        coordinates: [37.80, 69.00],
        location: "塔吉克斯坦西南部库尔提尤别北瓦赫什河畔",
        modern_country: "塔吉克斯坦",
        region: "瓦赫什",
        type: "normal",
        description: "中亚小国"
    },
    {
        id: 28,
        name: "拘谜陀国",
        modern_name: "俱蜜",
        coordinates: [37.50, 71.50],
        location: "塔吉克斯坦阿姆河上游喷赤河北岸",
        modern_country: "塔吉克斯坦",
        region: "戈尔诺-巴达赫尚",
        type: "normal",
        description: "帕米尔高原上的小国"
    },
    {
        id: 29,
        name: "䌸伽浪国",
        modern_name: "巴格兰",
        coordinates: [36.02, 68.70],
        location: "阿富汗北部巴格兰省一带",
        modern_country: "阿富汗",
        region: "巴格兰省",
        type: "normal",
        description: "阿富汗北部重要地区"
    },
    {
        id: 30,
        name: "纥露悉泯健国",
        modern_name: "萨曼甘",
        coordinates: [36.30, 68.00],
        location: "阿富汗中部萨曼甘省",
        modern_country: "阿富汗",
        region: "萨曼甘省",
        type: "normal",
        description: "阿富汗中部小国"
    },
    {
        id: 31,
        name: "忽懔国",
        modern_name: "忽懔",
        coordinates: [35.90, 67.80],
        location: "具体位置待考",
        modern_country: "阿富汗",
        region: "未知",
        type: "normal",
        description: "玄奘途经的小国"
    },
    {
        id: 32,
        name: "䌸喝国",
        modern_name: "巴尔赫",
        coordinates: [36.76, 66.90],
        location: "阿富汗马扎里沙里夫以西23公里处",
        modern_country: "阿富汗",
        region: "巴尔赫省",
        type: "buddhist",
        description: "古代佛教文化中心，号称'千寺之城'"
    },
    {
        id: 33,
        name: "锐秣陀国",
        modern_name: "锐秣陀",
        coordinates: [36.50, 66.50],
        location: "具体位置待考",
        modern_country: "阿富汗",
        region: "未知",
        type: "normal",
        description: "玄奘途经的小国"
    },
    {
        id: 34,
        name: "胡实健国",
        modern_name: "朱兹詹",
        coordinates: [36.75, 65.80],
        location: "阿富汗喀布尔西北席巴尔甘南",
        modern_country: "阿富汗",
        region: "朱兹詹省",
        type: "normal",
        description: "阿富汗北部地区"
    },
    {
        id: 35,
        name: "呾剌健国",
        modern_name: "塔卢坎",
        coordinates: [36.72, 69.12],
        location: "阿富汗西北部或土库曼斯坦东南部",
        modern_country: "阿富汗",
        region: "塔哈尔省",
        type: "normal",
        description: "阿富汗东北部重要城市"
    },
    {
        id: 36,
        name: "揭职国",
        modern_name: "揭职",
        coordinates: [34.50, 69.20],
        location: "具体位置待考",
        modern_country: "阿富汗",
        region: "未知",
        type: "normal",
        description: "玄奘途经的小国"
    },
    {
        id: 37,
        name: "梵衍那国",
        modern_name: "巴米扬",
        coordinates: [34.82, 67.82],
        location: "阿富汗兴都库什山中",
        modern_country: "阿富汗",
        region: "巴米扬省",
        type: "buddhist",
        description: "著名的巴米扬大佛所在地"
    },
    {
        id: 38,
        name: "迦毕试国",
        modern_name: "贝格拉姆",
        coordinates: [34.97, 69.30],
        location: "喀布尔西北60公里的贝格拉姆城",
        modern_country: "阿富汗",
        region: "帕尔旺省",
        type: "important",
        description: "古代佛教文化中心，玄奘在此停留多时"
    }
];

// 玄奘西行路线（按国家顺序连接）
const routeCoordinates = [
    [41.75, 86.50], // 阿耆尼国
    [41.72, 82.95], // 屈支国
    [41.30, 80.25], // 跋禄迦国
    [42.80, 75.60], // 素叶水城
    [42.90, 71.37], // 呾逻私城
    [42.30, 69.60], // 白水城
    [42.90, 71.37], // 恭御城
    [42.32, 69.59], // 笯赤建国
    [41.31, 69.24], // 赭时国
    [40.38, 71.78], // 㤄捍国
    [39.92, 68.81], // 窣堵利瑟那国
    [39.65, 66.96], // 飒秣建国
    [39.50, 66.00], // 弭秣贺国
    [39.70, 66.30], // 劫布呾那国
    [39.40, 66.20], // 屈霜你迦国
    [39.80, 64.40], // 喝捍国
    [39.77, 64.42], // 捕喝国
    [39.10, 63.60], // 伐地国
    [41.55, 60.63], // 货利习弥伽国
    [38.87, 65.80], // 羯霜那国
    [37.00, 68.00], // 睹货逻国
    [37.22, 67.27], // 呾蜜国
    [37.40, 67.50], // 赤鄂衍那国
    [37.60, 67.80], // 忽露摩国
    [38.54, 68.78], // 愉漫国
    [37.90, 68.70], // 鞠和衍那国
    [37.80, 69.00], // 镬沙国
    [37.50, 71.50], // 拘谜陀国
    [36.02, 68.70], // 䌸伽浪国
    [36.30, 68.00], // 纥露悉泯健国
    [35.90, 67.80], // 忽懔国
    [36.76, 66.90], // 䌸喝国
    [36.50, 66.50], // 锐秣陀国
    [36.75, 65.80], // 胡实健国
    [36.72, 69.12], // 呾剌健国
    [34.50, 69.20], // 揭职国
    [34.82, 67.82], // 梵衍那国
    [34.97, 69.30]  // 迦毕试国
];