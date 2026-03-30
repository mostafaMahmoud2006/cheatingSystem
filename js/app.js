document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Language Switcher (EN / AR) ---
    const langToggleBtn = document.getElementById('langToggle');
    const mobileLangToggleBtn = document.getElementById('mobileLangToggle');
    const currentLangSpans = [document.getElementById('currentLang'), document.getElementById('mobileCurrentLang')];
    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update toggle button text
        currentLangSpans.forEach(span => {
            if (span) span.innerText = translations[lang === 'en' ? 'en' : 'ar'].current_lang_btn;
        });

        // Reinitialize icons if any got overwritten by innerHTML
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    [langToggleBtn, mobileLangToggleBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                setLanguage(currentLang === 'en' ? 'ar' : 'en');
            });
        }
    });


    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 3. Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && closeMenuBtn && mobileNavOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initial Trigger for Hero section elements
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Set Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
