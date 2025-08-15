// Smooth scroll and interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to package cards
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect to buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe package cards
    packageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add typing effect to logo
    const logo = document.querySelector('.logo');
    const logoText = logo.textContent;
    logo.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < logoText.length) {
            logo.textContent += logoText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// WhatsApp link handler with tracking
function handleWhatsAppClick(packageName) {
    console.log(`User clicked ${packageName} package`);
}

// Add click handlers to buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
    const packageCard = button.closest('.package-card');
    const packageName = packageCard.querySelector('.package-name').textContent;
    
    button.addEventListener('click', function() {
        handleWhatsAppClick(packageName);
    });
});

// Add floating animation to social icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'float 0.6s ease-in-out infinite alternate';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Add floating animation CSS
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(floatStyle);
