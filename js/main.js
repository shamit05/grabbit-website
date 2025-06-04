// Grabbit Website Shared JavaScript

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 100) {
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
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // App Store link tracking
    const appStoreBtn = document.querySelector('.app-store-btn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('App Store download initiated');
        });
    }
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

// Handle invite banner and app redirects
function handleInviteBanner() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    const groupName = urlParams.get('groupName');
    const from = urlParams.get('from');
    
    // Show invite banner if we have invite parameters
    if (inviteCode && groupName) {
        showInviteBanner(groupName, inviteCode);
    }
    
    // Handle app route redirects
    const path = window.location.pathname;
    if (path.startsWith('/app')) {
        // Redirect to download page with all query parameters
        const currentUrl = new URL(window.location);
        const downloadUrl = new URL('/download.html', window.location.origin);
        
        // Copy all search parameters
        currentUrl.searchParams.forEach((value, key) => {
            downloadUrl.searchParams.set(key, value);
        });
        
        // Add the original path as 'from' parameter if not already present
        if (!downloadUrl.searchParams.has('from')) {
            downloadUrl.searchParams.set('from', path);
        }
        
        window.location.replace(downloadUrl.toString());
    }
}

function showInviteBanner(groupName, inviteCode) {
    const inviteBanner = document.querySelector('.invite-banner');
    if (inviteBanner) {
        const decodedGroupName = decodeURIComponent(groupName.replace(/\+/g, ' '));
        
        inviteBanner.querySelector('h3').innerHTML = `
            <i class="fas fa-users"></i>
            You're invited to join "${decodedGroupName}"!
        `;
        
        inviteBanner.querySelector('p').textContent = 
            `Download the Grabbit app to accept this group invitation and start collaborating with your community.`;
        
        inviteBanner.classList.add('show');
        
        // Update the download button to include invite parameters
        const appStoreBtn = document.querySelector('.app-store-btn');
        if (appStoreBtn) {
            const originalHref = appStoreBtn.href;
            // For now, we'll keep the same App Store link, but you could add campaign parameters
            // appStoreBtn.href = originalHref + '?invite=' + inviteCode + '&groupName=' + groupName;
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
