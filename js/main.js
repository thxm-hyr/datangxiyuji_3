// 主JavaScript文件 - 网站通用功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏高亮
    initNavigation();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化响应式功能
    initResponsiveFeatures();
    
    // 初始化动画效果
    initAnimations();
});

// 导航栏初始化
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 滚动效果初始化
function initScrollEffects() {
    // 注释掉头部滚动隐藏效果，确保导航栏始终可见
    /*
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    */
    
    // 滚动到顶部按钮
    createScrollToTopButton();
}

// 创建滚动到顶部按钮
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.id = 'scrollToTop';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #8b5a2b;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // 点击滚动到顶部
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 响应式功能初始化
function initResponsiveFeatures() {
    // 移动端菜单切换
    createMobileMenu();
    
    // 图片懒加载
    initLazyLoading();
    
    // 响应式图片处理
    handleResponsiveImages();
}

// 创建移动端菜单
function createMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #f8f4e9;
        cursor: pointer;
        padding: 10px;
    `;
    
    const headerContainer = document.querySelector('.site-header .container');
    if (headerContainer) {
        headerContainer.appendChild(menuToggle);
    }
    
    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
    });
    
    // 媒体查询监听
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileChange(e) {
        if (e.matches) {
            menuToggle.style.display = 'block';
            nav.classList.add('mobile-nav');
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('mobile-nav', 'mobile-open');
        }
    }
    
    mediaQuery.addListener(handleMobileChange);
    handleMobileChange(mediaQuery);
}

// 图片懒加载初始化
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 响应式图片处理
function handleResponsiveImages() {
    // 为图片添加响应式类
    document.querySelectorAll('img').forEach(img => {
        if (!img.classList.contains('country-image') && !img.parentElement.classList.contains('feature-icon')) {
            img.classList.add('responsive-image');
        }
    });
}

// 动画效果初始化
function initAnimations() {
    // 滚动动画
    initScrollAnimations();
    
    // 页面过渡效果
    initPageTransitions();
    
    // 交互反馈动画
    initInteractionAnimations();
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .stat-item, .zhaowu-card').forEach(el => {
        observer.observe(el);
    });
}

// 页面过渡效果
function initPageTransitions() {
    // 添加页面加载动画
    document.body.classList.add('page-loading');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        }, 100);
    });
    
    // 链接点击过渡
    document.querySelectorAll('a').forEach(link => {
        if (link.href && link.href.includes(window.location.origin) && !link.href.includes('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('page-exiting');
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });
}

// 交互反馈动画
function initInteractionAnimations() {
    // 按钮点击效果
    document.querySelectorAll('button, .cta-button, .control-button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 卡片悬停效果增强
    document.querySelectorAll('.feature-card, .zhaowu-card, .example-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出全局函数
window.debounce = debounce;
window.throttle = throttle;