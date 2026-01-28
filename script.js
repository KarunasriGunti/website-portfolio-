// ===================================
// PORTFOLIO INTERACTIVE FEATURES
// ===================================

// Smooth Scroll Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
    
    // Smooth Scroll to Sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Get target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    
    const highlightNavLink = () => {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all glass cards and sections
    const animatedElements = document.querySelectorAll('.glass-card, .experience-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Typing Animation for Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const subtitleText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    const typeWriter = () => {
        if (charIndex < subtitleText.length) {
            heroSubtitle.textContent += subtitleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
    
    // Skill Tag Hover Effect - Add ripple
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project Card Hover Enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Parallax Effect for Background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add floating animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isNumber = !isNaN(parseInt(finalValue));
                
                if (isNumber) {
                    const numericValue = parseInt(finalValue);
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    const suffix = finalValue.includes('+') ? '+' : '';
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            target.textContent = numericValue + suffix;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(currentValue) + suffix;
                        }
                    }, 30);
                }
                
                observer.unobserve(target);
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Smooth reveal for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Add cursor trail effect (optional - subtle)
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Email copy functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show a subtle notification
                    const notification = document.createElement('div');
                    notification.textContent = 'Email copied to clipboard!';
                    notification.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                        color: white;
                        padding: 1rem 1.5rem;
                        border-radius: 0.5rem;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                        z-index: 10000;
                        animation: fadeInUp 0.3s ease;
                    `;
                    
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 2000);
                });
            }
        });
    });
    
    // Add fade out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(10px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization - Lazy load images if any are added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Console Easter Egg
console.log('%c👋 Hi there, fellow developer!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'color: #3b82f6; font-size: 14px;');
console.log('%c📧 guntikarunasri@gmail.com', 'color: #06b6d4; font-size: 12px;');
