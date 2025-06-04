// Grabbit Website Shared JavaScript

// Header scroll effect with pill navbar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 50) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(el => {
        observer.observe(el);
    });

    // Observe screenshot cards with staggered animation
    document.querySelectorAll('.screenshot-card').forEach((el, index) => {
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });

    // Observe feature cards with staggered animation
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });

    // Handle invite banner logic
    handleInviteBanner();

    // Handle form submission if form exists
    const form = document.querySelector('form');
    if (form) {
        // form.addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     alert('Thank you for your message! We\'ll get back to you soon.');
        //     this.reset();
        // });
    }

    // App Store link tracking
    const appStoreBtn = document.querySelector('.app-store-btn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('App Store download initiated');
        });
    }

    // Handle email list nav button clicks
    const emailListBtns = document.querySelectorAll('#email-list-nav-btn, #email-list-mobile-btn');
    emailListBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to email list section
            const emailSection = document.querySelector('.email-list-section');
            if (emailSection) {
                emailSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus on email input after scroll
                setTimeout(() => {
                    const emailInput = emailSection.querySelector('input[type="email"]');
                    if (emailInput) {
                        emailInput.focus();
                    }
                }, 600);
            }
        });
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Form handling
    handleForms();
    
    // Handle invite banner
    handleInviteBanner();
    
    // Handle modals
    handleModals();
});

// Form handling function
function handleForms() {
    // Handle email list form
    const emailForms = document.querySelectorAll('form[action*="google.com/forms"]');
    emailForms.forEach(form => {
        if (form.querySelector('input[name="entry.181124231"]')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = form.querySelector('input[name="entry.181124231"]').value;
                
                if (email) {
                    // Submit to Google Forms in background
                    const formData = new FormData();
                    formData.append('entry.181124231', email);
                    
                    fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors'
                    }).then(() => {
                        showSuccessMessage('Thanks for joining!', 'We\'ll keep you updated on Grabbit\'s progress.');
                        form.reset();
                    }).catch(() => {
                        showSuccessMessage('Thanks for joining!', 'We\'ll keep you updated on Grabbit\'s progress.');
                        form.reset();
                    });
                }
            });
        }
    });

    // Handle contact form
    const contactForms = document.querySelectorAll('form[action*="formResponse"]');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            }).then(() => {
                showSuccessMessage('Message sent!', 'Thanks for reaching out. We\'ll get back to you soon.');
                form.reset();
            }).catch(() => {
                showSuccessMessage('Message sent!', 'Thanks for reaching out. We\'ll get back to you soon.');
                form.reset();
            });
        });
    });
}

// Success message function
function showSuccessMessage(title, message) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>${title}</h3>
        <p>${message}</p>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(successDiv);
    
    // Show with animation
    setTimeout(() => {
        overlay.classList.add('show');
        successDiv.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        overlay.classList.remove('show');
        successDiv.classList.remove('show');
        
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
    
    // Allow clicking to close
    overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
        successDiv.classList.remove('show');
        
        setTimeout(() => {
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            if (document.body.contains(successDiv)) document.body.removeChild(successDiv);
        }, 300);
    });
}

// Handle invite banner functionality
function handleInviteBanner() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteBanner = document.getElementById('invite-banner');
    
    if (inviteBanner && (urlParams.has('invite') || urlParams.has('groupName') || urlParams.has('from'))) {
        const groupName = urlParams.get('groupName') || 'a group';
        
        // Update banner content
        const bannerTitle = inviteBanner.querySelector('h3');
        const bannerText = inviteBanner.querySelector('p');
        
        if (bannerTitle && bannerText) {
            bannerTitle.innerHTML = `<i class="fas fa-users"></i> You're invited to join ${decodeURIComponent(groupName)}!`;
            bannerText.textContent = 'Download the Grabbit app to accept this group invitation and start collaborating with your community.';
        }
        
        // Show banner
        inviteBanner.classList.add('show');
        document.body.classList.add('invite-shown');
        
        // Handle close button
        const closeBtn = inviteBanner.querySelector('.banner-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                inviteBanner.classList.remove('show');
                document.body.classList.remove('invite-shown');
            });
        }
    }
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Utility function to update URL parameters without page reload
function updateUrlParameter(key, value) {
    const url = new URL(window.location);
    if (value) {
        url.searchParams.set(key, value);
    } else {
        url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
}

// Handle modals functionality
function handleModals() {
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    const closePrivacy = document.getElementById('close-privacy');
    const closeTerms = document.getElementById('close-terms');

    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    if (privacyLink) {
        privacyLink.onclick = function(e) {
            e.preventDefault();
            openModal(privacyModal);
        };
    }
    
    if (termsLink) {
        termsLink.onclick = function(e) {
            e.preventDefault();
            openModal(termsModal);
        };
    }
    
    if (closePrivacy) {
        closePrivacy.onclick = function() {
            closeModal(privacyModal);
        };
    }
    
    if (closeTerms) {
        closeTerms.onclick = function() {
            closeModal(termsModal);
        };
    }
    
    window.onclick = function(event) {
        if (event.target === privacyModal) closeModal(privacyModal);
        if (event.target === termsModal) closeModal(termsModal);
    };
}
