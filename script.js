document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMobileMenuBtn = document.querySelector('.close-mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    // Open Mobile Menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            mobileMenuContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close Mobile Menu
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuContainer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close all submenus
        const mobileSubmenus = document.querySelectorAll('.mobile-menu .sub-menu');
        mobileSubmenus.forEach(submenu => {
            submenu.classList.remove('active');
        });
        
        const mobileMenuItems = document.querySelectorAll('.mobile-menu .menu-item-has-children > a i');
        mobileMenuItems.forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });
    }
    
    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Mobile Submenu Toggle
    const mobileMenuParents = document.querySelectorAll('.mobile-menu .menu-item-has-children > a');
    
    mobileMenuParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenu = this.parentElement.querySelector('.sub-menu');
            const icon = this.querySelector('i');
            
            // Close other submenus
            mobileMenuParents.forEach(otherParent => {
                if (otherParent !== this) {
                    const otherSubmenu = otherParent.parentElement.querySelector('.sub-menu');
                    const otherIcon = otherParent.querySelector('i');
                    otherSubmenu.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current submenu
            submenu.classList.toggle('active');
            icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });
    
    // Desktop Menu Hover Effect
    const desktopMenuItems = document.querySelectorAll('.desktop-nav .menu-item-has-children');
    
    desktopMenuItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Close mobile menu when clicking a link (optional)
    const mobileLinks = document.querySelectorAll('.mobile-menu a:not(.menu-item-has-children > a)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scroll for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in menu (optional)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.main-menu a, .mobile-menu a');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === '#')) {
            link.classList.add('active');
            link.parentElement.classList.add('active');
        }
    });
});









document.addEventListener('DOMContentLoaded', function() {
    // شمارنده انیمیشنی
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                // مقدار نهایی
                element.textContent = target.toLocaleString('fa-IR');
                clearInterval(timer);
            } else {
                // مقدار فعلی
                element.textContent = Math.floor(start).toLocaleString('fa-IR');
            }
        }, 16);
    }

    // بررسی آیا المان در viewport است
    function isElementInViewport(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= (windowHeight - offset) &&
            rect.bottom >= offset
        );
    }

    // راه‌اندازی شمارنده‌ها
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const statsSection = document.getElementById('stats-section') || 
                            document.querySelector('.box-status-service');
        
        let animationStarted = false;
        
        if (!counters.length || !statsSection) {
            console.log('عناصر شمارنده یا بخش آمار پیدا نشد');
            return;
        }
        
        console.log('تعداد شمارنده‌ها:', counters.length);
        
        // ذخیره مقادیر اصلی و تنظیم مقدار اولیه به 0
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log('مقدار target:', target);
            counter.setAttribute('data-original', target);
            counter.textContent = '۰'; // صفر فارسی
        });
        
        // تابع برای شروع انیمیشن
        function startCounterAnimation() {
            if (animationStarted) return;
            
            console.log('شروع انیمیشن شمارنده‌ها');
            
            counters.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-target'));
                
                // تأخیر متوالی برای افکت بهتر
                setTimeout(() => {
                    animateCounter(counter, target, 1500);
                }, index * 300);
            });
            
            animationStarted = true;
        }
        
        // بررسی اولیه موقع لود صفحه
        if (isElementInViewport(statsSection, 150)) {
            console.log('بخش آمار در ابتدا قابل مشاهده است');
            setTimeout(startCounterAnimation, 500);
        }
        
        // بررسی هنگام اسکرول
        let scrollHandler = function() {
            if (!animationStarted && isElementInViewport(statsSection, 150)) {
                console.log('بخش آمار با اسکرول قابل مشاهده شد');
                startCounterAnimation();
                // حذف event listener بعد از شروع
                window.removeEventListener('scroll', scrollHandler);
            }
        };
        
        window.addEventListener('scroll', scrollHandler);
        
        // همچنین با IntersectionObserver (مدرن‌تر)
        if ('IntersectionObserver' in window) {
            console.log('استفاده از IntersectionObserver');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationStarted) {
                        console.log('IntersectionObserver: بخش آمار قابل مشاهده است');
                        startCounterAnimation();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3, // وقتی 30% المان قابل مشاهده شد
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(statsSection);
        }
        
        // همچنین یک بار دیگر بعد از 3 ثانیه چک کن (برای حالت‌های خاص)
        setTimeout(() => {
            if (!animationStarted && isElementInViewport(statsSection, 150)) {
                console.log('بررسی مجدد بعد از 3 ثانیه');
                startCounterAnimation();
            }
        }, 3000);
    }
    
    // راه‌اندازی بعد از لود کامل صفحه
    window.addEventListener('load', function() {
        console.log('صفحه کامل لود شد');
        setTimeout(initCounters, 1000);
    });
    
    // همچنین روی DOMContentLoaded
    setTimeout(initCounters, 1500);
});