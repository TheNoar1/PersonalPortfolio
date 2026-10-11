import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initFanCarousel } from './carousel.js';

function createBackgroundBoxes() {
    const grid = document.getElementById('boxes-grid');
    if (!grid) return;

    const rows = 60;
    const cols = 80;
    const colors = [
        "rgb(125, 211, 252)", "rgb(249, 168, 212)", "rgb(134, 239, 172)",
        "rgb(253, 224, 71)", "rgb(252, 165, 165)", "rgb(216, 180, 254)",
        "rgb(147, 197, 253)", "rgb(165, 180, 252)", "rgb(196, 181, 253)"
    ];

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'box-row';

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'box-cell';

            if (j % 2 === 0 && i % 2 === 0) {
                const plus = document.createElement('div');
                plus.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor" class="box-plus">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>`;
                cell.appendChild(plus);
            }

            cell.addEventListener('mouseenter', () => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                cell.style.setProperty('--hover-color', randomColor);
                cell.style.backgroundColor = randomColor;
            });

            cell.addEventListener('mouseleave', () => {
                cell.style.backgroundColor = 'transparent';
            });

            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Initializations ---

    // Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        syncTouch: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Background Interaction
    createBackgroundBoxes();

    // --- 2. Interaction Modules ---
    initAnimations();
    initGallery();
    initFanCarousel();

    // --- 3. Other Global Interactions ---
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
