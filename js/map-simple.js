// 简化版地图功能
console.log('地图脚本开始加载...');

// 地图变量
let map;

// 简单的地图初始化函数
function initSimpleMap() {
    console.log('开始初始化地图...');
    
    try {
        // 检查地图容器是否存在
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error('找不到地图容器');
            return;
        }
        
        // 创建地图实例
        map = L.map('map').setView([38.0, 75.0], 4);
        
        // 添加地图图层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        console.log('地图初始化成功');
        
        // 添加几个测试标记
        addTestMarkers();
        
    } catch (error) {
        console.error('地图初始化失败:', error);
        // 显示错误信息
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #d00;">
                    <h3>地图加载失败</h3>
                    <p>错误信息: ${error.message}</p>
                    <p>请检查网络连接或刷新页面重试</p>
                </div>
            `;
        }
    }
}

// 添加测试标记
function addTestMarkers() {
    // 添加几个关键国家的标记
    const testMarkers = [
        {name: "阿耆尼国", coords: [41.75, 86.50], desc: "玄奘西行的第一个国家"},
        {name: "屈支国", coords: [41.72, 82.95], desc: "著名的克孜尔石窟所在地"},
        {name: "飒秣建国", coords: [39.65, 66.96], desc: "中亚最古老的城市之一"},
        {name: "梵衍那国", coords: [34.82, 67.82], desc: "巴米扬大佛所在地"}
    ];
    
    testMarkers.forEach(country => {
        L.marker(country.coords)
            .addTo(map)
            .bindPopup(`
                <div style="min-width: 200px;">
                    <h3 style="color: #8b5a2b; margin: 0 0 10px 0;">${country.name}</h3>
                    <p>${country.desc}</p>
                    <button onclick="alert('查看${country.name}详情')" style="background: #8b5a2b; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-top: 10px;">查看详情</button>
                </div>
            `);
    });
    
    console.log('测试标记添加完成');
}

// 简单的控制函数
function showAllCountries() {
    alert('显示所有国家功能');
    console.log('显示所有国家');
}

function showRoute() {
    alert('显示行进路线功能');
    console.log('显示路线');
}

function resetMap() {
    alert('重置地图功能');
    console.log('重置地图');
}

// 页面加载完成后初始化地图
window.addEventListener('load', function() {
    console.log('页面加载完成，准备初始化地图');
    
    // 延迟初始化以确保所有资源加载完成
    setTimeout(function() {
        initSimpleMap();
    }, 500);
});

// 导出函数供HTML调用
window.initSimpleMap = initSimpleMap;
window.showAllCountries = showAllCountries;
window.showRoute = showRoute;
window.resetMap = resetMap;

console.log('地图脚本加载完成');