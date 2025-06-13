// 检查用户偏好或本地存储
document.addEventListener('DOMContentLoaded', function() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // 设置初始主题
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
    }
    
    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});