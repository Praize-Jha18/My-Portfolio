(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Header + mobile nav ---------- */
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = Array.from(navbar.querySelectorAll('a'));

    function closeMenu() {
        navbar.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
    }

    menuToggle.addEventListener('click', () => {
        const open = navbar.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    function onScroll() {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Active nav link ---------- */
    const sections = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function setActive(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
    }

    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(sec => navObserver.observe(sec));
    }

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Skill bars ---------- */
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.style.setProperty('--level', skill.dataset.level + '%');
    });

    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.4 });
        skills.forEach(skill => skillObserver.observe(skill));
    } else {
        skills.forEach(skill => skill.classList.add('is-visible'));
    }

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('[data-count]');

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (reduceMotion) {
            el.textContent = target + suffix;
            return;
        }
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.6 });
        counters.forEach(c => countObserver.observe(c));
    } else {
        counters.forEach(animateCount);
    }

    /* ---------- Typewriter ---------- */
    const typeEl = document.getElementById('typewriter');
    if (typeEl) {
        let words = [];
        try { words = JSON.parse(typeEl.dataset.words); } catch (e) { words = ['Full Stack Developer']; }

        if (reduceMotion) {
            typeEl.textContent = words[0];
        } else {
            let wordIndex = 0;
            let charIndex = 0;
            let deleting = false;

            function type() {
                const word = words[wordIndex];
                charIndex += deleting ? -1 : 1;
                typeEl.textContent = word.slice(0, charIndex);

                let delay = deleting ? 45 : 90;
                if (!deleting && charIndex === word.length) {
                    delay = 1800;
                    deleting = true;
                } else if (deleting && charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    delay = 350;
                }
                setTimeout(type, delay);
            }
            setTimeout(type, 600);
        }
    }

    /* ---------- Card spotlight (mouse-follow glow) ---------- */
    document.querySelectorAll('[data-spotlight]').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });

    /* ---------- Footer year ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
