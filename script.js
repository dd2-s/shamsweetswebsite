document.addEventListener('DOMContentLoaded', () => {
    // Game-like navigation elements
    const menuToggle = document.querySelector('.menu-toggle');
    const interactiveNav = document.querySelector('.interactive-nav');
    const animatedHeader = document.getElementById('animated-header');
    const navItems = document.querySelectorAll('.nav-item');
    const heroLogo = document.querySelector('.hero-logo');
    const miniLogo = document.querySelector('.mini-logo');
    const heroLogoImg = document.getElementById('hero-logo-img');
    const miniLogoImg = document.getElementById('mini-logo-img');
    
    // Animated SVG handling - Make golden petals blink/shimmer
    // This will be handled by CSS with targeted selectors for the petals
    
    // Initialize animations for hero logo
    heroLogo.style.transform = 'scale(1)';
    heroLogo.style.opacity = '1';
    
    // Show menu toggle and interactive nav after a delay
    setTimeout(() => {
        menuToggle.classList.add('visible');
    }, 1500);
    
    // Menu toggle click event
    menuToggle.addEventListener('click', () => {
        interactiveNav.classList.toggle('visible');
        menuToggle.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-cookie-bite"></i>';
        }
    });
    
    // Navigation item click event
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get target section
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            // Smooth scroll to section
            if (targetSection) {
                const headerOffset = 60;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Hide nav menu on small screens after clicking
            if (window.innerWidth < 768) {
                interactiveNav.classList.remove('visible');
                menuToggle.innerHTML = '<i class="fas fa-cookie-bite"></i>';
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Animated header and logo transition on scroll
    let lastScrollTop = 0;
    const scrollThreshold = 300; // How far down the user needs to scroll before the header appears
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide animated header based on scroll position and direction
        if (scrollTop > scrollThreshold) {
            animatedHeader.classList.add('visible');
            menuToggle.classList.add('visible');
            
            // If scrolling down, add the logo shrink animation
            if (scrollTop > lastScrollTop) {
                // Animate logo shrinking as user scrolls down
                const shrinkFactor = Math.min(1, (scrollTop - scrollThreshold) / 300);
                heroLogo.style.transform = `scale(${1 - (shrinkFactor * 0.3)})`;
                heroLogo.style.opacity = `${1 - (shrinkFactor * 0.5)}`;
            }
            // If scrolling up
            else {
                // Animate logo growing back as user scrolls up
                const shrinkFactor = Math.min(1, (scrollTop - scrollThreshold) / 300);
                heroLogo.style.transform = `scale(${1 - (shrinkFactor * 0.3)})`;
                heroLogo.style.opacity = `${1 - (shrinkFactor * 0.5)}`;
            }
        } else {
            animatedHeader.classList.remove('visible');
            
            // Only hide menu toggle if at the very top
            if (scrollTop < 50) {
                if (interactiveNav.classList.contains('visible')) {
                    // Keep menu toggle visible if nav is open
                } else {
                    // Otherwise hide it when at the top
                    menuToggle.classList.remove('visible');
                }
            }
        }
        
        // Update active nav item based on scroll position
        updateActiveNavItem();
        
        lastScrollTop = scrollTop;
    });
    
    // Update which nav item is active based on scroll position
    function updateActiveNavItem() {
        const scrollPosition = window.scrollY + 300;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to current section's nav item
                const activeNavItem = document.querySelector(`.nav-item[data-target="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }
    
    // Handle button in hero section
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 60;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Menu filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Set staggered animation delay for menu items
    menuItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuItems.forEach((item, index) => {
                // Reset animation for visible items
                item.style.animationDelay = `${index * 0.1}s`;
                
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // Header scroll animation
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll animations for elements
    const animateOnScroll = () => {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        const triggerBottom = window.innerHeight * 0.85;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
        
        // For existing menu items that don't have the animate-on-scroll class
        menuItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
        
        // For gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });

        // For feature cards
        const featureCards = document.querySelectorAll('.feature-card, .history');
        featureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Initialize animations on page load
    window.addEventListener('load', () => {
        animateOnScroll();
        
        // Add subtle animations to hero section on load
        document.querySelector('.hero-background').style.animation = 'scaleBackground 20s infinite alternate ease-in-out';
    });

    // Add hover effect for gallery items with enhanced animations
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            // Find and animate the image inside
            const image = item.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            // Reset image animation
            const image = item.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Add hover effect for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            // Animate the icon
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            // Reset icon animation
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add active state to navigation links based on scroll position
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 150;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Listen for scroll events to update active nav link
    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize active nav link on page load
    window.addEventListener('load', updateActiveNavLink);

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition < window.innerHeight) {
            const parallaxOffset = scrollPosition * 0.4;
            heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
    });
    
    // Add animation delays to stagger menu items
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});
