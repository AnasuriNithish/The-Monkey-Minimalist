/* ==============================
   GLOBAL HELPERS
============================== */

const exists = (selector) => document.querySelector(selector);

/* ==============================
   DOM READY
============================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     LENIS – SMOOTH SCROLL
  ============================== */

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  /* ==============================
     GSAP
  ============================== */

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (exists(".home-title")) {
    gsap.from(".home-title", {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: "power3.out",
    });
  }

  if (exists(".article-main-title")) {
    gsap.from(".article-main-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });
  }

  /* ==============================
     ANIME.JS
  ============================== */

  if (exists(".article-body p") && typeof anime !== "undefined") {
    anime({
      targets: ".article-body p",
      opacity: [0, 1],
      translateY: [12, 0],
      delay: anime.stagger(100, { start: 500 }),
      easing: "easeOutQuad",
    });
  }

  /* ==============================
     MOBILE NAV TOGGLE — FIXED
  ============================== */

  const toggle = document.querySelector(".article-nav-toggle");
  const mobileNav = document.querySelector(".article-mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      toggle.classList.toggle("open");

      if (mobileNav.classList.contains("open")) {
        toggle.textContent = "✕";
      } else {
        toggle.textContent = "☰";
      }
    });
  }
});

/* ==============================
   BARBA TRANSITIONS
============================== */

if (typeof barba !== "undefined") {
  barba.init({
    transitions: [
      {
        name: "fade",

        async leave(data) {
          await gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },

        enter(data) {
          gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },
      },
    ],
  });
}
