document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    // Move cursor with mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Expand cursor on hoverable elements
    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        trigger.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to fade in
                entry.target.classList.add('active');

                // Special Logic for Skill Bars
                // If the revealed element contains a skill bar, animate the width
                const skillBar = entry.target.querySelector('.skill-bar-fill');
                if (skillBar) {
                    // Reset width to 0 then force reflow to restart animation
                    const targetWidth = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(() => {
                        skillBar.style.width = targetWidth;
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Watch all elements with class 'reveal'
    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});