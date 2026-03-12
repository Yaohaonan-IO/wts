// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const scrollOffset = 20; // 额外的间距，让内容不会紧贴导航栏

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - scrollOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏高亮功能
function initNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const scrollOffset = 20; // 与平滑滚动保持一致的偏移量

    function highlightNav() {
        let current = '';
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - scrollOffset)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
}

// 响应式导航栏
function initResponsiveNav() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        nav.scrollLeft = 0;
    });

    // 点击导航链接后滚动到对应位置
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                nav.scrollLeft = 0;
            }, 500);
        });
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initNavHighlight();
    initResponsiveNav();
    initPricePopup();
    
    // 为导航链接添加active样式
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加导航栏点击效果
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// 初始化价格弹窗
function initPricePopup() {
    const popup = document.getElementById('price-popup');
    if (!popup) {
        console.error('Price popup element not found');
        return;
    }
    
    const closeBtn = popup.querySelector('.price-popup-close');
    const overlay = popup.querySelector('.price-popup-overlay');
    const priceTable = document.querySelector('.price-table-container');
    
    if (!priceTable) {
        console.error('Price table not found');
        return;
    }
    
    // 为价格表格添加点击事件
    priceTable.style.cursor = 'pointer';
    priceTable.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        popup.classList.add('show');
        document.body.classList.add('no-scroll');
    });
    
    // 关闭按钮点击事件
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popup.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // 遮罩层点击关闭
    if (overlay) {
        overlay.addEventListener('click', function() {
            popup.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });
}

// 初始化免责确认弹窗
function initDisclaimerPopup() {
    const checkbox = document.getElementById('agree-checkbox');
    const confirmButton = document.getElementById('confirm-button');
    const popup = document.getElementById('disclaimer-popup');
    
    // 默认显示弹窗
    popup.style.display = 'flex';
    
    // 弹窗显示时禁止背景滚动
    document.body.classList.add('no-scroll');
    
    // 监听复选框状态变化
    checkbox.addEventListener('change', function() {
        confirmButton.disabled = !checkbox.checked;
    });
    
    // 监听确认按钮点击
    confirmButton.addEventListener('click', function() {
        if (checkbox.checked) {
            popup.style.display = 'none';
            // 关闭弹窗时恢复背景滚动
            document.body.classList.remove('no-scroll');
        }
    });
    
    // 阻止点击弹窗内容时关闭弹窗
    popup.querySelector('.disclaimer-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 确保遮罩层能够正确捕获鼠标事件，阻止用户与下层内容交互
    popup.querySelector('.disclaimer-overlay').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// 页面加载完成后初始化弹窗
window.addEventListener('load', initDisclaimerPopup);

// 初始化兑换码弹窗
function initRedeemPopup() {
    const redeemBtn = document.getElementById('redeem-code-btn');
    const redeemPopup = document.getElementById('redeem-popup');
    const closeBtn = redeemPopup.querySelector('.redeem-popup-close');
    const overlay = redeemPopup.querySelector('.redeem-popup-overlay');
    const submitBtn = document.getElementById('redeem-submit-btn');
    const codeInput = document.getElementById('redeem-code-input');
    const message = document.getElementById('redeem-message');
    
    const CORRECT_CODE = '130427';
    const DISCOUNT = 31;
    
    // 打开兑换码弹窗
    redeemBtn.addEventListener('click', function() {
        redeemPopup.classList.add('show');
        document.body.classList.add('no-scroll');
        codeInput.value = '';
        message.textContent = '';
        message.className = 'redeem-message';
        codeInput.focus();
    });
    
    // 关闭弹窗
    function closePopup() {
        redeemPopup.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && redeemPopup.classList.contains('show')) {
            closePopup();
        }
    });
    
    // 提交兑换码
    submitBtn.addEventListener('click', function() {
        const code = codeInput.value.trim();
        
        if (!code) {
            message.textContent = '请输入兑换码';
            message.className = 'redeem-message error';
            return;
        }
        
        if (code === CORRECT_CODE) {
            message.textContent = '兑换成功！价格已更新';
            message.className = 'redeem-message success';
            
            // 更新所有价格
            updatePrices(DISCOUNT);
            
            // 延迟关闭弹窗
            setTimeout(() => {
                closePopup();
            }, 1500);
        } else {
            message.textContent = '兑换码错误，请重试';
            message.className = 'redeem-message error';
            codeInput.value = '';
            codeInput.focus();
        }
    });
    
    // 回车键提交
    codeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}

// 更新价格
function updatePrices(discount) {
    const priceElements = document.querySelectorAll('.price-table td:last-child');
    
    priceElements.forEach(element => {
        const currentPrice = element.textContent;
        const priceValue = parseInt(currentPrice.match(/\d+/)[0]);
        const newPrice = priceValue - discount;
        
        // 添加动画类
        element.classList.add('price-updated');
        
        // 更新价格文本
        element.textContent = newPrice + '元/人';
        
        // 移除动画类
        setTimeout(() => {
            element.classList.remove('price-updated');
        }, 600);
    });
}

// 页面加载完成后初始化兑换码弹窗
document.addEventListener('DOMContentLoaded', () => {
    initRedeemPopup();
});