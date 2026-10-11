export function initAnimations() {
    // Confetti Effect for CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#5d4037', '#8d6e63', '#f4f1ea', '#d7ccc8']
            });
        });
    }

    // Magnetic Interaction Effect
    const magnets = document.querySelectorAll('.magnetic, .cta-button, .filter-btn, nav a');
    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

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

    // Typography Reveals (SplitType)
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
}
