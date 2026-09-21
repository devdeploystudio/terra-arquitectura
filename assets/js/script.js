gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Se vuelve de una ficha de proyecto con links tipo "index.html#proyectos".
   Si dejamos que el navegador salte solo al ancla, compite con el pin de la
   galería horizontal (ScrollTrigger todavía no calculó las alturas, y las
   imágenes del hero ni siquiera terminaron de cargar) y rompe el scroll de
   toda la página. Por eso sacamos el hash de la URL al toque, forzamos
   scroll 0 y hacemos nosotros el salto más abajo, ya con todo calculado. */
const landingHash = location.hash;
if (landingHash) {
  history.replaceState(null, "", location.pathname + location.search);
}
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

/* ---------- Loader ---------- */
const loaderTl = gsap.timeline({
  onComplete: () => {
    document.getElementById("loader").style.display = "none";
    introTl.play();
  }
});
loaderTl
  .to(".loader__text", { opacity: 1, duration: 0.6, ease: "power2.out" })
  .to(".loader__text", { opacity: 1, duration: 0.4 })
  .to(".loader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" });

/* ---------- Hero intro (words fly in) ---------- */
const introTl = gsap.timeline({ paused: true });
introTl
  .from(".hero__title .word", {
    yPercent: 130,
    stagger: 0.04,
    duration: 1,
    ease: "power4.out"
  }, 0)
  .from(".hero__scroll", { opacity: 0, duration: 0.8 }, 0.6)
  .from(".nav", { yPercent: -100, duration: 0.8, ease: "power3.out" }, 0.2);

/* ---------- Custom cursor ---------- */
const cursor = document.getElementById("cursor");
const cursorX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
const cursorY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  cursorX(e.clientX);
  cursorY(e.clientY);
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
});

/* ---------- Fullscreen menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");
menuBtn.addEventListener("click", () => {
  menuOverlay.classList.toggle("is-open");
});
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => menuOverlay.classList.remove("is-open"));
});

/* ---------- Hero parallax (scroll) ---------- */
gsap.to("[data-parallax]", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

/* ---------- Hero parallax (mouse tilt) ---------- */
const heroBg = document.querySelector("[data-parallax]");
const heroBgX = gsap.quickTo(heroBg, "x", { duration: 1.1, ease: "power3" });
const heroBgY = gsap.quickTo(heroBg, "y", { duration: 1.1, ease: "power3" });
document.querySelector(".hero").addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const relX = (e.clientX / innerWidth - 0.5) * 2;
  const relY = (e.clientY / innerHeight - 0.5) * 2;
  heroBgX(relX * -22);
  heroBgY(relY * -14);
});
document.querySelector(".hero").addEventListener("mouseleave", () => {
  heroBgX(0);
  heroBgY(0);
});

/* ---------- Page transition (curtain) ---------- */
const pageTransition = document.getElementById("pageTransition");
document.querySelectorAll('a[href*=".html"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (link.target === "_blank") return;
    e.preventDefault();
    gsap.to(pageTransition, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => { window.location.href = href; }
    });
  });
});

/* ---------- Project image reveal + parallax ---------- */
document.querySelectorAll(".project-reveal").forEach((el) => {
  const wrap = el.querySelector(".project-reveal__img-wrap");
  const img = el.querySelector(".project-reveal__img");
  const info = el.querySelector(".project-reveal__info");

  gsap.fromTo(wrap,
    { clipPath: "inset(35% 0 35% 0)" },
    {
      clipPath: "inset(0% 0 0% 0)",
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 80%" }
    }
  );
  gsap.to(img, {
    yPercent: -10,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
  });
  gsap.from(info.children, {
    opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 75%" }
  });
});

/* ---------- Horizontal scroll gallery ---------- */
const track = document.querySelector(".h-track");
const panels = gsap.utils.toArray(".h-panel");

function getScrollDistance() {
  return track.scrollWidth - window.innerWidth;
}

gsap.to(track, {
  x: () => -getScrollDistance(),
  ease: "none",
  scrollTrigger: {
    trigger: ".h-scroll",
    start: "top top",
    end: () => "+=" + getScrollDistance(),
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true
  }
});

/* ---------- About reveal ---------- */
gsap.from(".about__img", {
  clipPath: "inset(0 0 100% 0)",
  duration: 1.2, ease: "power4.out",
  scrollTrigger: { trigger: ".about", start: "top 70%" }
});
gsap.from(".about__content > *", {
  opacity: 0, y: 30, stagger: 0.1, duration: 0.9, ease: "power3.out",
  scrollTrigger: { trigger: ".about__content", start: "top 75%" }
});

/* ---------- Animated counters ---------- */
document.querySelectorAll(".stat__num").forEach((el) => {
  const target = parseInt(el.dataset.target, 10);
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 1.6,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          el.innerText = Math.floor(el.innerText);
        }
      });
    }
  });
});

/* ---------- CTA reveal ---------- */
gsap.from(".cta h2, .cta__link", {
  opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".cta", start: "top 75%" }
});

/* ---------- Footer logo reveal ---------- */
gsap.from(".footer__logo", {
  opacity: 0, y: 60, duration: 1.2, ease: "power3.out",
  scrollTrigger: { trigger: ".footer", start: "top 90%" }
});

/* ---------- Land on the right section when arriving with a #hash ---------- */
window.addEventListener("load", () => {
  if (landingHash) {
    const target = document.querySelector(landingHash);
    if (target) {
      setTimeout(() => {
        ScrollTrigger.refresh();
        gsap.to(window, { scrollTo: target, duration: 0.1 });
      }, 500);
    }
  }
});

/* ---------- Smooth anchor scroll for nav links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: targetEl,
          duration: 1,
          ease: "power3.inOut"
        });
      }
    }
  });
});
