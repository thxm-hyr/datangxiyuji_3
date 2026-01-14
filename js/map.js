// 地图初始化
let map;
let markers = [];
let routeLayer;
let currentCountryId = null;
let activeRoute = null;

// 初始化地图
function initMap() {
    console.log('初始化地图...');
    
    // 检查地图是否已经初始化
    if (map) {
        console.log('地图已经初始化，跳过重复初始化');
        return;
    }
    
    try {
        // 创建地图实例，设置中心点和缩放级别
        map = L.map('map').setView([38.0, 75.0], 4);
        
        // 使用可靠的地形地图 - 采用ESRI的地形服务
        const mapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            retryOnError: true
        }).addTo(map);
        

        
        console.log('添加国家标记...');
        // 添加国家标记
        addCountryMarkers();
        
        console.log('添加西行路线...');
        // 添加西行路线
        addRoute();
        
        // 添加地图控件
        addMapControls();
        
        // 添加图例
        addLegend();
        
        console.log('地图初始化完成');
    } catch (error) {
        console.error('地图初始化失败:', error);
        // 如果地图初始化失败，显示错误信息
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: #666;">地图加载失败，请检查网络连接后刷新页面</div>';
        }
    }
}

// 添加国家标记
function addCountryMarkers() {
    console.log('countriesData长度:', countriesData.length);
    countriesData.forEach((country, index) => {
        // 简化颜色方案 - 使用统一的棕色系
        const markerColor = '#8b5a2b'; // 统一的棕色
        
        // 创建自定义图标
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px;">${index + 1}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // 创建标记
        const marker = L.marker(country.coordinates, { 
            icon: icon,
            countryId: country.id
        }).addTo(map);
        
        // 添加悬浮提示框
        marker.bindTooltip(`
            <div style="min-width: 200px;">
                <h4 style="color: #8b5a2b; margin: 0 0 8px 0; border-bottom: 1px solid #e8e1d1; padding-bottom: 3px; font-size: 16px;">${country.name}</h4>
                <p style="margin: 4px 0; font-size: 14px;"><strong>现代名称：</strong>${country.modern_name}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>位置：</strong>${country.location}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>现代国家：</strong>${country.modern_country}</p>
                <p style="margin: 8px 0 0 0; color: #666; font-style: italic; font-size: 13px; line-height: 1.4;">${country.description}</p>
                <div style="margin-top: 10px; text-align: center;">
                    <button onclick="showCountryInfo(${country.id})" style="background: #8b5a2b; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">查看详细资料</button>
                </div>
            </div>
        `, {
            permanent: false,
            direction: 'top',
            offset: [0, -10],
            className: 'custom-tooltip'
        });
        
        // 添加鼠标点击事件（跳转到详情页）
        marker.on('click', function() {
            showCountryInfo(country.id);
        });
        
        markers.push(marker);
    });
    console.log('标记添加完成，共添加', markers.length, '个标记');
}

// 添加西行路线
function addRoute() {
    routeLayer = L.polyline(routeCoordinates, {
        color: '#8b5a2b',
        weight: 6,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);
    
    // 添加路线点击事件
    routeLayer.on('click', function(e) {
        showRouteInfo();
    });
    
    // 添加路线弹出框
    routeLayer.bindPopup(`
        <div style="min-width: 200px;">
            <h3 style="color: #8b5a2b; margin: 0 0 10px 0;">玄奘西行路线</h3>
            <p><strong>总距离：</strong>约12,000公里</p>
            <p><strong>途经国家：</strong>38个</p>
            <p><strong>时间：</strong>公元629年-645年</p>
            <p style="margin-top: 10px;">点击路线可查看详细信息，点击国家标记可查看具体国家信息</p>
        </div>
    `);
}

// 显示国家信息 - 跳转到详情页
function showCountryInfo(countryId) {
    const country = countriesData.find(c => c.id === countryId);
    if (!country) return;
    
    // 跳转到国家详情页
    window.location.href = `country.html?id=${countryId}`;
}

// 获取国家类型文本
function getCountryTypeText(type) {
    switch(type) {
        case 'important': return '重要城市';
        case 'buddhist': return '佛教中心';
        default: return '普通国家';
    }
}

// 高亮国家
function highlightCountry(countryId) {
    // 重置所有标记样式
    markers.forEach(marker => {
        const markerElement = marker.getElement();
        if (markerElement) {
            markerElement.style.transform = 'scale(1)';
        }
    });
    
    // 高亮当前国家
    const currentMarker = markers.find(marker => marker.options.countryId === countryId);
    if (currentMarker && currentMarker.getElement()) {
        const markerElement = currentMarker.getElement();
        markerElement.style.transform = 'scale(1.5)';
    }
}

// 显示路线信息
function showRouteInfo() {
    const panel = document.getElementById('countryInfoPanel');
    const nameElement = document.getElementById('countryName');
    const detailsElement = document.getElementById('countryDetails');
    
    nameElement.textContent = '玄奘西行路线';
    detailsElement.innerHTML = `
        <p><strong>总距离：</strong>约12,000公里</p>
        <p><strong>途经国家：</strong>38个</p>
        <p><strong>时间：</strong>公元629年-645年（16年）</p>
        <p><strong>起点：</strong>长安（今西安）</p>
        <p><strong>终点：</strong>那烂陀寺（今印度比哈尔邦）</p>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #e8e1d1;">
        <p style="font-style: italic; color: #666;">
            玄奘法师历时16年，跋涉数万里，途经38个国家，最终抵达印度那烂陀寺求学佛法。
            这段旅程不仅是佛教传播史上的壮举，也是中外文化交流的重要里程碑。
        </p>
    `;
    
    panel.classList.add('show');
    currentCountryId = null;
}

// 高亮到指定国家的路线
function highlightRouteToCountry(countryId) {
    const countryIndex = countriesData.findIndex(c => c.id === countryId);
    if (countryIndex === -1) return;
    
    // 创建到该国家的路线
    const routeToCountry = routeCoordinates.slice(0, countryIndex + 1);
    
    // 移除之前的路线高亮
    if (activeRoute) {
        map.removeLayer(activeRoute);
    }
    
    // 添加高亮路线
    activeRoute = L.polyline(routeToCountry, {
        color: '#e74c3c',
        weight: 8,
        opacity: 0.9,
        dashArray: null
    }).addTo(map);
    
    // 显示该国家信息
    showCountryInfo(countryId);
}

// 关闭信息面板
function closeInfoPanel() {
    const panel = document.getElementById('countryInfoPanel');
    panel.classList.remove('show');
    currentCountryId = null;
    
    // 重置标记样式
    markers.forEach(marker => {
        const markerElement = marker.getElement();
        if (markerElement) {
            markerElement.style.transform = 'scale(1)';
        }
    });
    
    // 移除路线高亮
    if (activeRoute) {
        map.removeLayer(activeRoute);
        activeRoute = null;
    }
}

// 重置地图
function resetMap() {
    // 显示所有标记和路线
    markers.forEach(marker => {
        map.addLayer(marker);
    });
    map.addLayer(routeLayer);
    
    // 移除路线高亮
    if (activeRoute) {
        map.removeLayer(activeRoute);
        activeRoute = null;
    }
    
    // 重置视图
    map.setView([38.0, 75.0], 4);
    
    // 关闭信息面板
    closeInfoPanel();
}

// 添加地图控件
function addMapControls() {
    // 缩放控件
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    
    // 比例尺
    L.control.scale({
        imperial: false,
        metric: true
    }).addTo(map);
}

// 添加图例
function addLegend() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 1px solid #e8e1d1;
            backdrop-filter: blur(10px);
            min-width: 180px;
            font-family: 'Noto Serif SC', 'SimSun', '宋体', serif;
        `;
        
        div.innerHTML = `
            <h4 style="margin: 0 0 12px 0; color: #8b5a2b; font-size: 14px; border-bottom: 2px solid #e8e1d1; padding-bottom: 5px;">图例</h4>
            <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 12px;">
                <div style="width: 16px; height: 16px; background-color: #8b5a2b; border-radius: 50%; border: 2px solid white; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
                <span>国家标记</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 12px;">
                <div style="width: 15px; height: 4px; background-color: #8b5a2b; margin-right: 8px; border-radius: 2px;"></div>
                <span>西行路线</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 12px;">
                <div style="width: 16px; height: 16px; background-color: #e74c3c; border-radius: 50%; border: 2px solid white; margin-right: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
                <span>当前选中</span>
            </div>
        `;
        return div;
    };
    
    legend.addTo(map);
}

// 页面加载完成后初始化地图
function initializeMap() {
    if (typeof initMap === 'function') {
        initMap();
    } else {
        console.error('initMap函数未找到，请检查map.js文件');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待页面完全加载后再初始化地图
    setTimeout(initializeMap, 1000);
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Escape':
                closeInfoPanel();
                break;
            case 'Home':
                showCountryInfo(1);
                break;
            case 'End':
                showCountryInfo(38);
                break;
        }
    });
});

// 确保函数在全局可用
window.initializeMap = initializeMap;
window.resetMap = resetMap;
window.closeInfoPanel = closeInfoPanel;
window.showCountryInfo = showCountryInfo;
window.highlightRouteToCountry = highlightRouteToCountry;



// 显示地图消息提示
function showMapMessage(message, duration = 3000) {
    // 移除现有的消息提示
    const existingMessage = document.getElementById('map-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新的消息提示
    const messageDiv = document.createElement('div');
    messageDiv.id = 'map-message';
    messageDiv.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(139, 90, 43, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // 自动移除消息
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, duration);
}

// 添加动画样式到CSS
function addMapMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后添加样式
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMapMessageStyles);
} else {
    addMapMessageStyles();
}