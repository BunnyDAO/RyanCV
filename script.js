const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 32, 220)}ms`;
  revealObserver.observe(item);
});

// Mobile hamburger menu
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("open");
    siteNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  siteNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveLink = () => {
  const scrollOffset = window.scrollY + 140;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (scrollOffset >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const match = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", match);
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<img class="lightbox-img" alt="">';
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector(".lightbox-img");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// Profile illustration cycling
const outfitTshirt = document.getElementById("outfit-tshirt");
const outfitSpace = document.getElementById("outfit-space");
const sunglasses = document.getElementById("accessory-sunglasses");

if (outfitTshirt && outfitSpace && sunglasses) {
  const states = [
    // State 0: Base t-shirt
    () => {
      outfitTshirt.setAttribute("opacity", "1");
      outfitSpace.setAttribute("opacity", "0");
      sunglasses.setAttribute("opacity", "0");
    },
    // State 1: Space suit
    () => {
      outfitTshirt.setAttribute("opacity", "0");
      outfitSpace.setAttribute("opacity", "1");
      sunglasses.setAttribute("opacity", "0");
    },
    // State 2: T-shirt + Sunglasses
    () => {
      outfitTshirt.setAttribute("opacity", "1");
      outfitSpace.setAttribute("opacity", "0");
      sunglasses.setAttribute("opacity", "1");
    },
  ];

  let current = 0;
  setInterval(() => {
    current = (current + 1) % states.length;
    states[current]();
  }, 5000);
}