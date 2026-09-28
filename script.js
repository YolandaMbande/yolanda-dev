// Custom Cursor Movement
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Smooth trail effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Scaling Effect on Links and Cards
const hoverables = document.querySelectorAll('a, .project-card, button');

hoverables.forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorOutline.style.backgroundColor = 'rgba(239, 71, 111, 0.1)';
  });

  element.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.backgroundColor = 'transparent';
  });
});

// Scroll Active State for Navigation
const sections = document.querySelectorAll('.content-section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
});