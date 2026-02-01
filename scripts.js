// Premium Freelancer Portfolio - Enhanced JavaScript
'use strict';

// DOM Elements with error handling
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const nav = document.querySelector('.nav');

// State management
let isSubmitting = false;
let lastScrollY = 0;
let ticking = false;

// Premium Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
        
        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', !isOpen);
        navMenu.setAttribute('aria-hidden', isOpen);
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    });
});

// Premium Smooth Scrolling with offset calculation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const navHeight = nav ? nav.offsetHeight : 72;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Premium Navigation Scroll Effects
function updateNavOnScroll() {
    const scrollY = window.scrollY;
    
    if (nav) {
        // Add/remove scrolled class for backdrop blur
        nav.classList.toggle('scrolled', scrollY > 50);
        
        // Hide/show navigation on scroll
        if (scrollY > lastScrollY && scrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

// Throttled scroll handler for performance
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Enhanced Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.skill-item, .project-card, .timeline-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Active navigation link based on scroll position (debounced)
let scrollTimeout;
function updateActiveNavLink() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 50);
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// Premium Contact Form Handling with Enhanced Validation
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();
        
        // Enhanced validation
        const errors = [];
        
        if (!name || name.length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!email || !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!message || message.length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (message.length > 1000) {
            errors.push('Message must be less than 1000 characters');
        }
        
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        // Disable submit button and show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        submitBtn.setAttribute('aria-busy', 'true');
        
        // Simulate form submission (replace with actual backend call)
        try {
            await simulateFormSubmission({ name, email, message });
            
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.setAttribute('aria-busy', 'false');
            isSubmitting = false;
            
        } catch (error) {
            showNotification('Sorry, something went wrong. Please try again.', 'error');
            
            // Reset button state on error
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.setAttribute('aria-busy', 'false');
            isSubmitting = false;
        }
    });
}

// Simulate form submission with delay
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1500);
    });
}

// Enhanced Email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// Premium Notification System with Enhanced Styling
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Enhanced styling with CSS variables
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        font-size: 14px;
        line-height: 1.5;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Set background color based on type with gradients
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in with spring effect
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    });
    
    // Auto-remove after 5 seconds with smooth animation
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.95)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Premium CSS Animations and Initializations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .nav-link.active {
        color: var(--color-accent);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item,
    .project-card,
    .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: loadingShimmer 1.5s infinite;
    }
    
    @keyframes loadingShimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`;
document.head.appendChild(style);

// Initialize premium features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const fadeElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .timeline, .contact-content, .contact-form');
    
    fadeElements.forEach((element, index) => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .skill-item, .project-card, .contact-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = element.style.transform || 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('project-card')) {
                element.style.transform = '';
            }
        });
    });
    
    // Initialize form inputs with floating labels effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add parallax effect to hero section (subtle)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${parallax}px)`;
            }
        }, { passive: true });
    }
    
    // Add smooth reveal animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});

// Premium keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
        
        // Close any notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class when using mouse
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Premium performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['measure'] });
}

// Premium error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // You could send this to an error tracking service
});

// Premium analytics placeholder (replace with actual analytics)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // Replace with actual analytics implementation
    // gtag('event', eventName, properties);
}

// Track page view
trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_type: e.target.className
        });
    }
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_type: 'contact'
        });
    });
}

// Console welcome message
console.log('%c Premium Freelancer Portfolio', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cBuilt with premium design and performance in mind', 'font-size: 14px; color: #666;');
console.log('%c 2024 Piyush Sharma - Full Stack Developer', 'font-size: 12px; color: #999;');
