document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Initializations ---

    // Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. High-End Interaction System ---

    // Magnetic Interaction Effect
    const magnets = document.querySelectorAll('.magnetic, .cta-button, .filter-btn, nav a');
    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;

            gsap.to(el, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // --- 3. Typography Reveals (SplitType) ---
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
        const splitter = new SplitType(text, { types: 'words,chars' });

        gsap.from(splitter.chars, {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // --- 4. Scrollytelling & Section Reveals ---
    // Hero Pinning Effect
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        scale: 0.8,
        opacity: 0,
        y: -100,
        ease: 'none'
    });

    // General Section Reveals
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // --- 5. Project Gallery (Bento & Tilt) ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // Project Filtering (Refined with GSAP)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    gsap.to(card, {
                        duration: 0.4,
                        opacity: 1,
                        scale: 1,
                        display: 'flex',
                        overwrite: true
                    });
                } else {
                    gsap.to(card, {
                        duration: 0.4,
                        opacity: 0,
                        scale: 0.8,
                        display: 'none',
                        overwrite: true
                    });
                }
            });
        });
    });

    // --- 6. Skills Marquee Interaction ---
    const marquee = document.querySelector('.skills-marquee');
    if (marquee) {
        window.addEventListener('mousemove', (e) => {
            const movement = (e.clientX / window.innerWidth) - 0.5;
            gsap.to(marquee, {
                x: movement * 100,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }
});
