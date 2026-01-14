// 离线地图数据 - 专门为离线使用优化
const offlineCountriesData = [
    // 中国境内重要国家
    {
        id: 1,
        name: "阿耆尼国",
        modern_name: "焉耆",
        coordinates: [41.75, 86.50],
        location: "新疆塔里木盆地东北部",
        modern_country: "中国",
        region: "新疆",
        type: "important",
        description: "玄奘西行的第一个国家，佛教文化中心"
    },
    {
        id: 2,
        name: "屈支国",
        modern_name: "龟兹",
        coordinates: [41.72, 82.95],
        location: "龟兹国以库车绿洲为中心",
        modern_country: "中国",
        region: "新疆",
        type: "buddhist",
        description: "著名的克孜尔石窟所在地，佛教艺术中心"
    },
    {
        id: 3,
        name: "跋禄迦国",
        modern_name: "姑墨",
        coordinates: [41.30, 80.25],
        location: "新疆阿克苏地区拜城县一带",
        modern_country: "中国",
        region: "新疆",
        type: "normal",
        description: "玄奘西行的重要中转站"
    },
    
    // 中亚重要国家
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
    
    // 阿富汗境内重要佛教中心
    {
        id: 32,
        name: "缚喝国",
        modern_name: "巴尔赫",
        coordinates: [36.76, 66.90],
        location: "阿富汗马扎里沙里夫以西23公里处",
        modern_country: "阿富汗",
        region: "巴尔赫省",
        type: "buddhist",
        description: "古代佛教文化中心，号称'千寺之城'"
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

// 简化的玄奘西行路线（只包含关键节点）
const simplifiedRoute = [
    [41.75, 86.50], // 阿耆尼国
    [41.72, 82.95], // 屈支国
    [41.30, 80.25], // 跋禄迦国
    [39.65, 66.96], // 飒秣建国
    [39.77, 64.42], // 捕喝国
    [36.76, 66.90], // 缚喝国
    [34.82, 67.82], // 梵衍那国
    [34.97, 69.30]  // 迦毕试国
];

// 离线地图配置
const offlineMapConfig = {
    width: 800,
    height: 600,
    backgroundColor: '#f8f4e9',
    landColor: '#e8e1d1',
    waterColor: '#a8d0e6',
    routeColor: '#8b5a2b',
    cityColor: '#e74c3c',
    countryColor: '#3498db',
    templeColor: '#2ecc71',
    borderColor: '#654321',
    textColor: '#333333'
};

// 地图边界和缩放参数
const mapBounds = {
    north: 45,
    south: 25,
    west: 60,
    east: 110,
    center: [35, 85],
    zoom: 4
};