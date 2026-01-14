document.addEventListener('DOMContentLoaded', () => {
    // Header effect on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation - Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animateElements.forEach(el => observer.observe(el));

    // Floating CTA Button Logic
    const floatingCta = document.querySelector('.floating-cta');
    if (floatingCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    // Interactive Scroll Vine Logic
    const vineStem = document.getElementById('vine-stem');
    const vineNodes = document.querySelectorAll('.vine-node');

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));

        // 1. Ranke wächst (der Stiel)
        if (vineStem) {
            vineStem.style.strokeDashoffset = 1000 - (scrollPercent * 1000);
        }

        // 2. Knoten (Blätter/Blüten) erscheinen bei Erreichen ihres Trigger-Werts
        vineNodes.forEach(node => {
            const trigger = parseFloat(node.getAttribute('data-trigger'));
            if (scrollPercent >= trigger) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('open');
            navLinks.classList.toggle('open');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                navLinks.classList.remove('open');
                body.classList.remove('menu-open');
            });
        });
    }
});
