// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initSkillBars();
    initDataVisualization();
    initScrollIndicator();
    initParallaxElements();
    initHoverEffects();
});

// Scroll-based animations inspired by Apple's design
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to bento items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(60px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        fadeInObserver.observe(item);
    });

    // Parallax effect for hero text
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-text');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Animate skill bars when in view
function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => {
        skillObserver.observe(bar.parentElement);
    });
}

// Create data visualization chart
function initDataVisualization() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'User Engagement',
            data: [65, 75, 80, 85, 90, 95],
            borderColor: '#E31937',
            backgroundColor: 'rgba(227, 25, 55, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#E31937',
            pointBorderColor: '#E31937',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#888888',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#888888',
                    font: {
                        size: 12
                    }
                },
                beginAtZero: true,
                max: 100
            }
        },
        elements: {
            point: {
                hoverBackgroundColor: '#E31937',
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 3
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

// Scroll progress indicator
function initScrollIndicator() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.height = scrollPercent + '%';
    });
}

// Parallax effects for various elements
function initParallaxElements() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Stats numbers animation on scroll
        const statsElements = document.querySelectorAll('.gradient-text');
        statsElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = 1 - (rect.top / window.innerHeight);
                const scale = 0.8 + (scrollProgress * 0.2);
                element.style.transform = `scale(${Math.min(scale, 1.1)})`;
            }
        });
    });
}

// Hover effects and micro interactions
function initHoverEffects() {
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('button, .bento-item');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add ripple effect
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(227, 25, 55, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Text reveal animation for large headings
    const largeHeadings = document.querySelectorAll('h1, h2');
    largeHeadings.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = text.split('').map(char => 
            `<span style="opacity: 0; transform: translateY(50px); display: inline-block; transition: all 0.5s ease;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .bento-item {
        will-change: transform;
    }
    
    .hero-text {
        will-change: transform;
    }
    
    .floating-element {
        will-change: transform;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #111;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #E31937;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #cc1530;
    }
    
    /* Loading animation for page load */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    .loader-text {
        font-size: 2rem;
        font-weight: 900;
        color: #E31937;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Page loader
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-text">RICKON</div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    // Implementation for mobile menu if added later
}

// Contact form handling (if needed)
function handleContactForm() {
    // Implementation for contact form if added later
}

// Performance optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update scroll-based animations here for better performance
    ticking = false;
}

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(requestTick);
});

// Add loading states for interactive elements
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        e.target.style.opacity = '0.8';
        setTimeout(() => {
            e.target.style.opacity = '1';
        }, 150);
    }
});

// Console message for developers
console.log(`
%c🎨 Rickon's Portfolio Website
%cDesigned with passion by Rickon
%cBuilt with modern web technologies
`, 
'color: #E31937; font-size: 20px; font-weight: bold;',
'color: #888; font-size: 14px;',
'color: #555; font-size: 12px;'
); 