document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
    
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        const savedTheme = localStorage.getItem('portfolio-theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.classList.replace('ph-moon', 'ph-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.classList.replace('ph-sun', 'ph-moon');
            }
        });
    }

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== null) {
                link.classList.add('active');
            }
        });
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon && icon.classList.contains('ph-x')) {
                    icon.classList.replace('ph-x', 'ph-list');
                }
            });
        });
    }

    const typingText = document.querySelector('.typing-text');
    const words = ["Frontend Developer", "MCA Student", "UI/UX Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1500);
    }

    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

});
