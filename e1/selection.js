function selectOption(option) {
    const selectedOption = option.toLowerCase();
    
    // 保存用户选择的方案到localStorage
    localStorage.setItem('selectedPlan', selectedOption);
    
    if (selectedOption === 'a') {
        window.location.href = 'plan-a.html';
    } else if (selectedOption === 'b') {
        window.location.href = 'plan-b.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});