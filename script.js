
/* =========================
   CUSTOM CURSOR MOVEMENT
========================= */

const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate(
            {
                left: `${posX}px`,
                top: `${posY}px`
            },
            {
                duration: 500,
                fill: "forwards"
            }
        );
    });

    const hoverables = document.querySelectorAll(
        "a, .project-card, button"
    );

    hoverables.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursorOutline.style.transform =
                "translate(-50%, -50%) scale(1.8)";

            cursorOutline.style.backgroundColor =
                "rgba(239, 71, 111, 0.1)";
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.transform =
                "translate(-50%, -50%) scale(1)";

            cursorOutline.style.backgroundColor = "transparent";
        });
    });
}


/* =========================
   ACTIVE NAVIGATION ON SCROLL
========================= */

const sections = document.querySelectorAll(".content-section");
const navItems = document.querySelectorAll(".nav-item");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");

        if (item.getAttribute("href") === `#${currentSection}`) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


/* =========================
   ANIMATED SIDE MENU
========================= */

const sideMenu = document.getElementById("sideMenu");
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");

const menuLinks = document.querySelectorAll(".menu nav a");

function openSideMenu() {
    if (!sideMenu || !menuToggle) return;

    sideMenu.classList.remove("closed");
    sideMenu.inert = false;

    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");

    document.body.style.overflow = "hidden";
}

function closeSideMenu() {
    if (!sideMenu || !menuToggle) return;

    sideMenu.classList.add("closed");
    sideMenu.inert = true;

    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    document.body.style.overflow = "";
}

if (sideMenu && menuToggle && closeMenu) {
    // Ensure the menu starts closed.
    sideMenu.classList.add("closed");
    sideMenu.inert = true;

    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    menuToggle.addEventListener("click", () => {
        if (sideMenu.classList.contains("closed")) {
            openSideMenu();
        } else {
            closeSideMenu();
        }
    });

    closeMenu.addEventListener("click", closeSideMenu);

    // Close the menu after selecting a menu link.
    menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        closeSideMenu();
    });
});

    // Close the menu with Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSideMenu();
        }
    });
}


/* =========================
   INTERNAL SECTION SCROLLING
========================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener("click", function(event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        let target;

        try {
            target = document.querySelector(targetId);
        } catch (error) {
            return;
        }

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        history.replaceState(null, "", targetId);
    });
});


/* =========================
   PORTFOLIO SLIDER
========================= */

const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioPrev = document.getElementById("portfolioPrev");
const portfolioNext = document.getElementById("portfolioNext");

function getScrollAmount() {
    if (!portfolioGrid) return 0;

    const card = portfolioGrid.querySelector(".project-card");

    if (!card) return 0;

    const styles = getComputedStyle(portfolioGrid);
    const gap = parseFloat(styles.gap) || 0;

    return card.getBoundingClientRect().width + gap;
}

// NEXT
if (portfolioGrid && portfolioNext) {
    portfolioNext.addEventListener("click", () => {
        const amount = getScrollAmount();

        if (!amount) return;

        portfolioGrid.scrollBy({
            left: amount,
            behavior: "smooth"
        });

        setTimeout(() => {
            const firstCard = portfolioGrid.firstElementChild;

            if (!firstCard) return;

            portfolioGrid.appendChild(firstCard);
            portfolioGrid.scrollLeft -= amount;
        }, 400);
    });
}

// PREVIOUS
if (portfolioGrid && portfolioPrev) {
    portfolioPrev.addEventListener("click", () => {
        const amount = getScrollAmount();

        if (!amount) return;

        const lastCard = portfolioGrid.lastElementChild;

        if (!lastCard) return;

        portfolioGrid.prepend(lastCard);
        portfolioGrid.scrollLeft += amount;

        portfolioGrid.scrollBy({
            left: -amount,
            behavior: "smooth"
        });
    });
}


/* =========================
   PROJECT PREVIEW
========================= */

function openPreview(url) {
    const modal = document.getElementById("previewModal");
    const frame = document.getElementById("previewFrame");

    if (!modal || !frame) return;

    frame.src = url;
    modal.style.display = "flex";
}

function closePreview() {
    const modal = document.getElementById("previewModal");
    const frame = document.getElementById("previewFrame");

    if (!modal || !frame) return;

    modal.style.display = "none";
    frame.src = "";
}

// Close when clicking outside the preview.
const previewModal = document.getElementById("previewModal");

if (previewModal) {
    previewModal.addEventListener("click", function(event) {
        if (event.target === this) {
            closePreview();
        }
    });
}

// Close preview with Escape.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePreview();
    }
});


/* =========================
   EMAILJS CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");
const formStatus = document.getElementById("formStatus");

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "MTD9LWcZItCBhwkvG"
    });
}

if (
    contactForm &&
    sendButton &&
    formStatus &&
    typeof emailjs !== "undefined"
) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        sendButton.disabled = true;
        sendButton.textContent = "Sending... ♡";
        formStatus.textContent = "";

        emailjs.sendForm(
            "service_79l24mo",
            "template_c6iknho",
            this
        )
        .then(() => {
            formStatus.textContent =
                "Message sent! I'll get back to you soon ♡";

            sendButton.textContent = "Sent! ♡";

            contactForm.reset();

            setTimeout(() => {
                sendButton.disabled = false;
                sendButton.textContent = "Send it my way ♡";
            }, 3000);
        })
        .catch((error) => {
            console.error("EmailJS error:", error);

            formStatus.textContent =
                "Something went wrong. Please try again ♡";

            sendButton.disabled = false;
            sendButton.textContent = "Send it my way ♡";
        });
    });
}
