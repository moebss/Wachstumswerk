// Peggy Coaching Website - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Form submission
    const contactForm = document.querySelector('.kontakt-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            alert('Vielen Dank für deine Nachricht! Ich melde mich bald bei dir.');
            contactForm.reset();
        });
    }

    // Floating CTA visibility
    const floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animateElements.forEach(el => observer.observe(el));

    // Interactive Scroll Flower Logic
    const stem = document.getElementById('flower-stem');
    const leaf1 = document.getElementById('flower-leaf-1');
    const leaf2 = document.getElementById('flower-leaf-2');
    const head = document.getElementById('flower-head');

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));

        // 1. Stiel wächst (0% - 60% scroll)
        if (stem) {
            const stemProgress = Math.min(scrollPercent / 0.6, 1);
            stem.style.strokeDashoffset = 100 - (stemProgress * 100);
        }

        // 2. Blatt 1 erscheint (ab 20% scroll)
        if (leaf1) {
            const leaf1Progress = Math.max(0, Math.min((scrollPercent - 0.2) / 0.2, 1));
            leaf1.style.transform = `scale(${leaf1Progress})`;
        }

        // 3. Blatt 2 erscheint (ab 40% scroll)
        if (leaf2) {
            const leaf2Progress = Math.max(0, Math.min((scrollPercent - 0.4) / 0.2, 1));
            leaf2.style.transform = `scale(${leaf2Progress})`;
        }

        // 4. Blüte öffnet sich (ab 60% scroll)
        if (head) {
            const headProgress = Math.max(0, Math.min((scrollPercent - 0.6) / 0.4, 1));
            head.style.transform = `scale(${headProgress})`;
        }
    });
});
