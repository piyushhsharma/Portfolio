// ===== GSAP & SCROLL TRIGGER INITIALIZATION =====
gsap.registerPlugin(ScrollTrigger);

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
        duration: 0.1,
        x: mouseX,
        y: mouseY,
        ease: "power2.out"
    });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-preview, .dot');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HERO ANIMATIONS =====
window.addEventListener('load', () => {
    // Hero background animations
    gsap.from('.glow-orb', {
        duration: 2,
        scale: 0,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.floating-particles', {
        duration: 3,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Avatar 3D effect
    const avatar = document.querySelector('#avatar-3d');
    const avatarContainer = document.querySelector('.avatar-container');
    
    gsap.from(avatar, {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Parallax effect on avatar
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX - innerWidth / 2) / innerWidth;
        const yPos = (clientY - innerHeight / 2) / innerHeight;
        
        gsap.to(avatarContainer, {
            duration: 0.1,
            rotationY: xPos * 15,
            rotationX: -yPos * 15,
            ease: "power2.out"
        });
    });
    
    // Hero text animations with stagger
    gsap.from('.hero-left', {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.hero-right', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Staggered text animation
    gsap.from('.greeting-text', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
    });
    
    gsap.from('.name-word', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.7,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    gsap.from('.role-text', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.1,
        ease: "power2.out"
    });
});

// ===== ABOUT SECTION ANIMATIONS =====
ScrollTrigger.create({
    trigger: '.about',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.about-avatar', {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power2.out"
        });
        
        gsap.from('.about-text', {
            duration: 1,
            x: 50,
            opacity: 0,
            delay: 0.3,
            ease: "power2.out"
        });
        
        gsap.from('.section-title', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: "power2.out"
        });
    }
});

// ===== WHAT I DO SECTION ANIMATIONS =====
ScrollTrigger.create({
    trigger: '.what-i-do',
    start: 'top 80%',
    onEnter: () => {
        // Character 3D animation
        gsap.from('.character-3d', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            ease: "elastic.out(1, 0.5)"
        });
        
        // Glass cards stagger animation
        gsap.from('.skill-card', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            delay: 0.5,
            ease: "power2.out"
        });
        
        gsap.from('.what-i-do .section-title', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: "power2.out"
        });
    }
});

// ===== EXPERIENCE TIMELINE ANIMATIONS =====
ScrollTrigger.create({
    trigger: '.experience-timeline',
    start: 'top 80%',
    onEnter: () => {
        // Timeline roles
        gsap.from('.timeline-role', {
            duration: 1,
            x: -30,
            opacity: 0,
            stagger: 0.3,
            ease: "power2.out"
        });
        
        // Timeline descriptions
        gsap.from('.timeline-desc', {
            duration: 1,
            x: 30,
            opacity: 0,
            stagger: 0.3,
            delay: 0.5,
            ease: "power2.out"
        });
        
        // Animate timeline progress
        gsap.to('.timeline-progress', {
            duration: 1.5,
            height: '100%',
            delay: 0.8,
            ease: "power2.out"
        });
        
        // Animate timeline dot
        gsap.to('.timeline-dot', {
            duration: 1.5,
            top: '100%',
            delay: 0.8,
            ease: "power2.out"
        });
    }
});

// ===== PROJECTS CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        gsap.to(slide, {
            duration: 0.5,
            x: i < index ? -100 : 100,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide
    setTimeout(() => {
        slides[index].classList.add('active');
        gsap.fromTo(slides[index], {
            x: index > currentSlide ? 100 : -100,
            opacity: 0
        }, {
            duration: 0.8,
            x: 0,
            opacity: 1,
            ease: "power2.out"
        });
        
        dots[index].classList.add('active');
    }, 100);
    
    currentSlide = index;
}

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-advance carousel
setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000);

// Initial project animation
ScrollTrigger.create({
    trigger: '.projects-showcase',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.project-slide.active', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: "power2.out"
        });
        
        gsap.from('.projects-showcase .section-title', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: "power2.out"
        });
    }
});

// ===== CONTACT SECTION ANIMATIONS =====
ScrollTrigger.create({
    trigger: '.contact',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.contact-info', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        });
        
        gsap.from('.contact-form', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: "power2.out"
        });
        
        gsap.from('.contact .section-title', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: "power2.out"
        });
    }
});

// ===== SMOOTH SCROLLING =====
// Lenis-like smooth scrolling
let scrollTimeout;
function smoothScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 66);
}

window.addEventListener('scroll', smoothScroll);

// ===== PROJECT PREVIEW HOVER EFFECTS =====
const projectPreviews = document.querySelectorAll('.project-preview');
projectPreviews.forEach(preview => {
    preview.addEventListener('mouseenter', () => {
        gsap.to(preview, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out"
        });
    });
    
    preview.addEventListener('mouseleave', () => {
        gsap.to(preview, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out"
        });
    });
});

// ===== SKILL CARD HOVER EFFECTS =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -5,
            scale: 1.02,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: "power2.out"
        });
    });
});

// ===== NAVIGATION SMOOTH SCROLL =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
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

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for performance
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

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Scroll-based animations
}, 16);

window.addEventListener('scroll', optimizedScroll);

// ===== LAUNCH ANIMATIONS =====
// Ensure all animations start after page load
window.addEventListener('DOMContentLoaded', () => {
    // Add loading complete class
    document.body.classList.add('loaded');
});

console.log('🚀 Portfolio animations initialized successfully!');
