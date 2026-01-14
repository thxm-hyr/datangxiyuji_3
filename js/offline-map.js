// 离线地图核心功能
class OfflineMap {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.countries = offlineCountriesData;
        this.route = simplifiedRoute;
        this.config = offlineMapConfig;
        this.bounds = mapBounds;
        
        // 初始化画布尺寸
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        
        this.init();
    }
    
    init() {
        this.drawBackground();
        this.drawLandMasses();
        this.drawRoute();
        this.drawCountries();
        this.drawLegend();
        this.addEventListeners();
    }
    
    // 绘制背景
    drawBackground() {
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // 绘制陆地轮廓（简化的亚洲地图）
    drawLandMasses() {
        this.ctx.fillStyle = this.config.landColor;
        this.ctx.strokeStyle = this.config.borderColor;
        this.ctx.lineWidth = 1;
        
        // 绘制中国西部区域
        this.ctx.beginPath();
        this.ctx.moveTo(this.lngToX(75), this.latToY(45));
        this.ctx.lineTo(this.lngToX(110), this.latToY(45));
        this.ctx.lineTo(this.lngToX(110), this.latToY(25));
        this.ctx.lineTo(this.lngToX(75), this.latToY(25));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // 绘制中亚区域
        this.ctx.beginPath();
        this.ctx.moveTo(this.lngToX(60), this.latToY(45));
        this.ctx.lineTo(this.lngToX(75), this.latToY(45));
        this.ctx.lineTo(this.lngToX(75), this.latToY(35));
        this.ctx.lineTo(this.lngToX(60), this.latToY(35));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // 绘制南亚区域
        this.ctx.beginPath();
        this.ctx.moveTo(this.lngToX(60), this.latToY(35));
        this.ctx.lineTo(this.lngToX(80), this.latToY(35));
        this.ctx.lineTo(this.lngToX(80), this.latToY(25));
        this.ctx.lineTo(this.lngToX(60), this.latToY(25));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    // 绘制玄奘西行路线
    drawRoute() {
        if (this.route.length < 2) return;
        
        this.ctx.strokeStyle = this.config.routeColor;
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([]);
        
        this.ctx.beginPath();
        const firstPoint = this.route[0];
        this.ctx.moveTo(this.lngToX(firstPoint[1]), this.latToY(firstPoint[0]));
        
        for (let i = 1; i < this.route.length; i++) {
            const point = this.route[i];
            this.ctx.lineTo(this.lngToX(point[1]), this.latToY(point[0]));
        }
        
        this.ctx.stroke();
        
        // 绘制路线上的点
        this.route.forEach(point => {
            this.drawPoint(point[0], point[1], this.config.routeColor, 6);
        });
    }
    
    // 绘制国家标记
    drawCountries() {
        this.countries.forEach(country => {
            const [lat, lng] = country.coordinates;
            let color = this.config.countryColor;
            
            if (country.type === 'buddhist') {
                color = this.config.templeColor;
            } else if (country.type === 'important') {
                color = this.config.cityColor;
            }
            
            this.drawPoint(lat, lng, color, 8);
            
            // 绘制国家名称
            this.ctx.fillStyle = this.config.textColor;
            this.ctx.font = '12px Arial, sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(country.name, this.lngToX(lng), this.latToY(lat) - 15);
        });
    }
    
    // 绘制图例
    drawLegend() {
        const legendX = this.canvas.width - 150;
        const legendY = 20;
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.strokeStyle = this.config.borderColor;
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(legendX, legendY, 130, 120);
        this.ctx.strokeRect(legendX, legendY, 130, 120);
        
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = 'bold 14px Arial, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('图例', legendX + 10, legendY + 20);
        
        this.ctx.font = '12px Arial, sans-serif';
        
        // 路线
        this.drawPointOnLegend(legendX + 10, legendY + 40, this.config.routeColor, 6);
        this.ctx.fillText('西行路线', legendX + 25, legendY + 45);
        
        // 重要城市
        this.drawPointOnLegend(legendX + 10, legendY + 60, this.config.cityColor, 8);
        this.ctx.fillText('重要城市', legendX + 25, legendY + 65);
        
        // 佛教中心
        this.drawPointOnLegend(legendX + 10, legendY + 80, this.config.templeColor, 8);
        this.ctx.fillText('佛教中心', legendX + 25, legendY + 85);
        
        // 途经国家
        this.drawPointOnLegend(legendX + 10, legendY + 100, this.config.countryColor, 8);
        this.ctx.fillText('途经国家', legendX + 25, legendY + 105);
    }
    
    // 在图例上绘制点
    drawPointOnLegend(x, y, color, size) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = this.config.borderColor;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    
    // 绘制点标记
    drawPoint(lat, lng, color, size) {
        const x = this.lngToX(lng);
        const y = this.latToY(lat);
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加白色边框
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    // 经纬度转换为画布坐标
    lngToX(lng) {
        return ((lng - this.bounds.west) / (this.bounds.east - this.bounds.west)) * this.canvas.width;
    }
    
    latToY(lat) {
        return ((this.bounds.north - lat) / (this.bounds.north - this.bounds.south)) * this.canvas.height;
    }
    
    // 添加事件监听器
    addEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.handleClick(x, y);
        });
    }
    
    // 处理点击事件
    handleClick(x, y) {
        // 检查是否点击了国家标记
        for (const country of this.countries) {
            const [lat, lng] = country.coordinates;
            const countryX = this.lngToX(lng);
            const countryY = this.latToY(lat);
            
            const distance = Math.sqrt(Math.pow(x - countryX, 2) + Math.pow(y - countryY, 2));
            
            if (distance < 15) {
                this.showCountryInfo(country);
                return;
            }
        }
    }
    
    // 显示国家信息
    showCountryInfo(country) {
        // 创建或更新信息面板
        let infoPanel = document.getElementById('country-info-panel');
        if (!infoPanel) {
            infoPanel = document.createElement('div');
            infoPanel.id = 'country-info-panel';
            infoPanel.style.cssText = `
                position: absolute;
                top: 20px;
                left: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
                border: 2px solid #8b5a2b;
                font-family: Arial, sans-serif;
            `;
            
            const closeBtn = document.createElement('span');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 5px;
                right: 10px;
                cursor: pointer;
                font-size: 20px;
                color: #666;
            `;
            closeBtn.onclick = () => infoPanel.remove();
            
            infoPanel.appendChild(closeBtn);
            document.body.appendChild(infoPanel);
        }
        
        infoPanel.innerHTML = `
            <span style="position: absolute; top: 5px; right: 10px; cursor: pointer; font-size: 20px; color: #666;" onclick="this.parentElement.remove()">×</span>
            <h3 style="color: #8b5a2b; margin: 0 0 10px 0;">${country.name}</h3>
            <p style="margin: 5px 0;"><strong>现代名称：</strong>${country.modern_name}</p>
            <p style="margin: 5px 0;"><strong>位置：</strong>${country.location}</p>
            <p style="margin: 5px 0;"><strong>现代国家：</strong>${country.modern_country}</p>
            <p style="margin: 5px 0;"><strong>描述：</strong>${country.description}</p>
            <button onclick="viewCountryDetail(${country.id})" style="margin-top: 10px; background: #8b5a2b; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">查看详情</button>
        `;
    }
}

// 初始化离线地图
function initOfflineMap() {
    new OfflineMap('map-canvas');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initOfflineMap, 100);
});

// 查看国家详情（简化版）
function viewCountryDetail(countryId) {
    const country = offlineCountriesData.find(c => c.id === countryId);
    if (country) {
        alert(`即将查看 ${country.name} 的详细信息...`);
        // 在实际应用中，这里可以跳转到详细页面
    }
}