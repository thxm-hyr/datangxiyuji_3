// 佛教词典 - 存储从CSV加载的词汇和解释
let buddhistDictionary = {};
let dictionaryLoaded = false;

// 加载佛教词典
function loadBuddhistDictionary() {
    const csvPath = 'buddhist_concept.csv';
    
    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('词典文件未找到');
            }
            return response.text();
        })
        .then(csvText => {
            // 解析CSV
            const lines = csvText.split('\n');
            
            // 跳过标题行，从第2行开始
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    // 处理CSV格式，支持逗号分隔
                    const parts = line.split(',');
                    if (parts.length >= 2) {
                        const term = parts[0].trim();
                        const definition = parts.slice(1).join(',').trim().replace(/"/g, '');
                        
                        if (term && definition) {
                            buddhistDictionary[term] = definition;
                        }
                    }
                }
            }
            
            dictionaryLoaded = true;
            console.log('✅ 佛教词典加载完成，词汇数量:', Object.keys(buddhistDictionary).length);
        })
        .catch(error => {
            console.error('加载佛教词典失败:', error);
            dictionaryLoaded = false;
        });
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 转义HTML属性值
function escapeHtmlAttribute(string) {
    return string
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// 高亮文本中的佛教词汇
function highlightBuddhistTerms(text) {
    if (!dictionaryLoaded || Object.keys(buddhistDictionary).length === 0) {
        return text;
    }
    
    // 按词汇长度降序排序，避免短词先匹配导致长词无法匹配
    const terms = Object.keys(buddhistDictionary).sort((a, b) => b.length - a.length);
    
    let highlightedText = text;
    
    terms.forEach(term => {
        // 转义正则特殊字符
        const escapedTerm = escapeRegExp(term);
        // 创建正则表达式，匹配整个词，避免部分匹配
        const regex = new RegExp(`(${escapedTerm})`, 'g');
        
        // 替换为带有点击事件的span，使用 this.dataset.term 获取术语
        highlightedText = highlightedText.replace(regex, 
            `<span class="buddhist-term" data-term="${term.replace(/"/g, '&quot;')}" onclick="showDefinition(this.dataset.term)">$1</span>`
        );
    });
    
    return highlightedText;
}

// 显示词汇解释卡片
function showDefinition(term) {
    const definition = buddhistDictionary[term];
    if (!definition) return;
    
    // 移除已存在的解释卡片
    const existingCard = document.getElementById('definition-card');
    if (existingCard) {
        existingCard.remove();
    }
    
    // 创建解释卡片
    const card = document.createElement('div');
    card.id = 'definition-card';
    card.innerHTML = `
        <div class="definition-content">
            <div class="definition-header">
                <strong>${term}</strong>
                <button class="close-btn" onclick="closeDefinition()">&times;</button>
            </div>
            <div class="definition-body">
                ${definition}
            </div>
        </div>
    `;
    
    document.body.appendChild(card);
    
    // 3秒后自动关闭
    setTimeout(() => {
        closeDefinition();
    }, 5000);
}

// 关闭解释卡片
function closeDefinition() {
    const card = document.getElementById('definition-card');
    if (card) {
        card.remove();
    }
}

// 国家详情页功能
function loadCountryDetail() {
    // 加载佛教词典
    loadBuddhistDictionary();
    
    // 从URL参数获取国家ID
    const urlParams = new URLSearchParams(window.location.search);
    const countryId = urlParams.get('id');
    
    if (!countryId) {
        showError('未指定国家ID');
        return;
    }
    
    // 查找对应国家数据
    const country = countriesData.find(c => c.id == countryId);
    if (!country) {
        showError('未找到对应的国家数据');
        return;
    }
    
    // 更新页面标题和头部信息
    updateCountryHeader(country);
    
    // 加载国家信息
    loadCountryInfo(country);
    
    // 加载原文内容
    loadOriginalText(country);
    
    // 加载国家图片
    loadCountryImages(country);
}

// 更新国家头部信息
function updateCountryHeader(country) {
    document.title = `${country.name} - 《大唐西域记》玄奘西行旅程`;
    document.getElementById('countryName').textContent = country.name;
    
    const modernNameElement = document.getElementById('countryModernName');
    const locationElement = document.getElementById('countryLocation');
    
    if (modernNameElement) {
        modernNameElement.textContent = `现代名称：${country.modern_name}`;
    }
    
    if (locationElement) {
        locationElement.textContent = `地理位置：${country.location}`;
    }
}

// 加载国家信息
function loadCountryInfo(country) {
    const infoElement = document.getElementById('countryInfo');
    if (!infoElement) return;
    
    // 构建文件路径
    const fileName = `${country.id}${country.name}信息.txt`;
    const filePath = `地点信息/${fileName}`;
    
    // 使用fetch加载文本文件
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('文件未找到');
            }
            return response.text();
        })
        .then(text => {
            infoElement.innerHTML = `<div class="text-content">${formatTextContent(text)}</div>`;
        })
        .catch(error => {
            console.error('加载国家信息失败:', error);
            infoElement.innerHTML = '<p class="error-message">国家信息文件未找到</p>';
        });
}

// 加载原文内容
function loadOriginalText(country) {
    const originalElement = document.getElementById('originalText');
    if (!originalElement) return;
    
    // 尝试加载完整的国家文件（优先）
    const countryFileName = `${country.id}${country.name}.txt`;
    const countryFilePath = `原文分段/${countryFileName}`;
    
    console.log('尝试加载国家原文文件:', countryFilePath);
    
    // 首先尝试加载完整的国家文件
    fetch(countryFilePath)
        .then(response => {
            if (response.ok) {
                // 成功加载国家文件
                return response.text().then(text => {
                    console.log('✅ 成功加载国家原文文件，内容长度:', text.length);
                    console.log('文件:', countryFileName);
                    return text;
                });
            } else {
                // 国家文件不存在，尝试加载范围文件作为备用
                const rangeFileName = `${country.id}-${country.id + 1}.txt`;
                const rangeFilePath = `原文分段/${rangeFileName}`;
                
                console.log('国家文件未找到，尝试加载范围文件:', rangeFilePath);
                
                return fetch(rangeFilePath).then(rangeResponse => {
                    if (rangeResponse.ok) {
                        return rangeResponse.text().then(text => {
                            console.log('✅ 成功加载范围文件，内容长度:', text.length);
                            return text;
                        });
                    } else {
                        throw new Error(`找不到原文文件: ${countryFileName} 或 ${rangeFileName}`);
                    }
                });
            }
        })
        .then(text => {
            console.log('原文全部内容:', text.substring(0, 500) + '...');
            
            // 显示原文和翻译（奇偶行格式）
            originalElement.innerHTML = formatClassicalText(text);
            
            console.log('格式化后的HTML长度:', originalElement.innerHTML.length);
        })
        .catch(error => {
            console.error('加载原文失败:', error);
            originalElement.innerHTML = '<p class="error-message">' + error.message + '</p>';
        });
}

// 加载国家图片
function loadCountryImages(country) {
    const imagesElement = document.getElementById('countryImages');
    
    if (!imagesElement) return;
    
    // 从图片映射表中查找对应国家的图片
    const countryImages = countryImageMapping[country.id] || [];
    
    if (countryImages.length === 0) {
        imagesElement.innerHTML = '<p class="no-image-message">暂无相关图片</p>';
        return;
    }
    
    // 显示主图（第一张图片）
    const mainImage = countryImages[0];
    imagesElement.innerHTML = `
        <div class="main-image">
            <img src="${mainImage.path}" alt="${mainImage.alt}" loading="lazy" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='none'">
            <p class="image-caption">${mainImage.alt}</p>
        </div>
    `;
}

// 根据国家ID获取国家名称
function getCountryNameById(countryId) {
    const country = countriesData.find(c => c.id == countryId);
    return country ? country.name : '未知国家';
}

// 格式化文本内容
function formatTextContent(text) {
    // 将文本中的换行符转换为HTML段落
    return text.split('\n').filter(line => line.trim()).map(line => 
        `<p>${line.trim()}</p>`
    ).join('');
}

// 格式化古典文本内容（简洁显示原文和翻译）
function formatClassicalText(text) {
    console.log('开始格式化文本，原始长度:', text.length);
    console.log('原始文本内容:', text); // 调试用：输出全部内容
    
    // 将文本按行分割
    const lines = text.split('\n');
    console.log('总行数:', lines.length);
    
    let html = '';
    let lineCount = 0;
    
    // 简单处理：奇数行是原文，偶数行是翻译
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line) {  // 只处理非空行
            lineCount++;
            
            // 应用佛教词汇高亮
            const highlightedLine = highlightBuddhistTerms(line);
            
            if (i % 2 === 0) {
                // 原文行 - 加粗，深棕色
                html += `<p class="original-text">${highlightedLine}</p>`;
            } else {
                // 翻译行 - 正常，深灰色
                html += `<p class="translation-text">${highlightedLine}</p>`;
            }
        }
    }
    
    console.log('处理了', lineCount, '行内容');
    console.log('生成的HTML长度:', html.length);
    console.log('生成的HTML:', html); // 调试用
    
    if (lineCount === 0) {
        html = '<p class="no-content">暂无内容</p>';
    }
    
    return html;
}

// 显示错误信息
function showError(message) {
    const detailElement = document.getElementById('countryDetail');
    if (detailElement) {
        detailElement.innerHTML = `
            <div class="error-container">
                <h2>错误</h2>
                <p>${message}</p>
                <a href="map.html" class="cta-button">返回地图</a>
            </div>
        `;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadCountryDetail();
    
    // 更新导航按钮状态
    const urlParams = new URLSearchParams(window.location.search);
    const countryId = urlParams.get('id');
    if (countryId) {
        setTimeout(() => {
            updateNavigationButtons(parseInt(countryId));
        }, 100);
    }
});

// 导航到相邻国家
function navigateToAdjacentCountry(direction) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = parseInt(urlParams.get('id'));
    
    const adjacentCountry = getAdjacentCountry(currentId, direction);
    if (adjacentCountry) {
        window.location.href = `country.html?id=${adjacentCountry.id}`;
    }
}

// 更新导航按钮状态
function updateNavigationButtons(currentId) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    if (prevButton) {
        const prevCountry = getAdjacentCountry(currentId, -1);
        if (!prevCountry) {
            prevButton.disabled = true;
            prevButton.innerHTML = '← 第一个国家';
        } else {
            prevButton.disabled = false;
            prevButton.innerHTML = '← 上一个国家';
        }
    }
    
    if (nextButton) {
        const nextCountry = getAdjacentCountry(currentId, 1);
        if (!nextCountry) {
            nextButton.disabled = true;
            nextButton.innerHTML = '最后一个国家 →';
        } else {
            nextButton.disabled = false;
            nextButton.innerHTML = '下一个国家 →';
        }
    }
}

// 键盘导航支持
document.addEventListener('keydown', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = parseInt(urlParams.get('id'));
    
    if (event.key === 'ArrowLeft') {
        // 上一个国家
        navigateToAdjacentCountry(-1);
    } else if (event.key === 'ArrowRight') {
        // 下一个国家
        navigateToAdjacentCountry(1);
    } else if (event.key === 'Escape') {
        // 返回地图
        window.location.href = 'map.html';
    }
});

// 获取相邻国家
function getAdjacentCountry(currentId, direction) {
    const currentIndex = countriesData.findIndex(c => c.id == currentId);
    if (currentIndex === -1) return null;
    
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < countriesData.length) {
        return countriesData[newIndex];
    }
    return null;
}