gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PROJECTS = {
  "casa-duna": {
    title: "Casa Duna",
    location: "Punta del Este, Uruguay",
    category: "Residencial",
    year: "2024",
    area: "620 m²",
    hero: "assets/img/proyecto-01-escalera.png",
    gallery: ["assets/img/hero-exterior-atardecer.png", "assets/img/galeria-03-spa.png"],
    text: [
      "Casa Duna se apoya en la ladera y se abre por completo hacia el mar. La escalera de piedra caliza que recibe a quien entra funciona como umbral entre el paisaje exterior y la intimidad de la casa.",
      "La madera cálida, la piedra local y la luz natural son los tres materiales que ordenan cada ambiente, buscando que la arquitectura se sienta parte del terreno y no una imposición sobre él."
    ]
  },
  "casa-carilo": {
    title: "Casa Cariló",
    location: "Cariló, Argentina",
    category: "Residencial",
    year: "2023",
    area: "480 m²",
    hero: "assets/img/proyecto-02-comedor.png",
    gallery: ["assets/img/galeria-02-living.png", "assets/img/proyecto-03-cocina.png"],
    text: [
      "Entre los pinos de Cariló, esta casa propone un recorrido continuo entre el comedor, el living y la galería exterior, disuelto por grandes paños vidriados que se abren al bosque.",
      "El objetivo fue diseñar una casa de veraneo que funcione todo el año: cálida y protegida en invierno, ventilada y abierta en verano."
    ]
  },
  "villa-costa": {
    title: "Villa Costa",
    location: "José Ignacio, Uruguay",
    category: "Residencial",
    year: "2025",
    area: "710 m²",
    hero: "assets/img/proyecto-03-cocina.png",
    gallery: ["assets/img/hero-exterior-atardecer.png", "assets/img/galeria-01-pileta.png"],
    text: [
      "Villa Costa organiza sus ambientes sociales alrededor de una isla de cocina en travertino, con vista directa al horizonte marino desde cada punto de la planta baja.",
      "El proyecto trabaja con una paleta acotada de materiales nobles, dejando que la luz del atardecer sea el verdadero protagonista de la casa."
    ]
  },
  "casa-olivos": {
    title: "Casa Olivos",
    location: "Tigre, Argentina",
    category: "Residencial",
    year: "2022",
    area: "390 m²",
    hero: "assets/img/galeria-01-pileta.png",
    gallery: ["assets/img/proyecto-01-escalera.png", "assets/img/galeria-04-lounge.png"],
    text: [
      "Rodeada de olivos centenarios, esta casa se despliega en un único nivel alrededor de una piscina que actúa como patio central.",
      "Los aleros profundos y la pérgola de madera controlan la luz directa durante todo el año, generando sombra propia sin perder la conexión visual con el jardín."
    ]
  },
  "estudio-norte": {
    title: "Estudio Norte",
    location: "Nordelta, Argentina",
    category: "Corporativo",
    year: "2023",
    area: "850 m²",
    hero: "assets/img/galeria-02-living.png",
    gallery: ["assets/img/estudio-atelier.png", "assets/img/proyecto-02-comedor.png"],
    text: [
      "Un espacio de oficinas pensado como una extensión del paisaje: madera clara, piedra y grandes ventanales que enmarcan la vegetación circundante.",
      "El diseño prioriza espacios de trabajo flexibles y zonas comunes luminosas, alejándose de la oficina tradicional cerrada."
    ]
  },
  "spa-cantera": {
    title: "Spa Cantera",
    location: "Punta del Este, Uruguay",
    category: "Hospitalidad",
    year: "2024",
    area: "310 m²",
    hero: "assets/img/galeria-03-spa.png",
    gallery: ["assets/img/hero-exterior-atardecer.png", "assets/img/galeria-04-lounge.png"],
    text: [
      "Pensado como un refugio dentro de un complejo hotelero mayor, este spa combina piedra travertino, madera y agua en un recorrido pausado de sauna, pileta y descanso.",
      "Cada ambiente fue diseñado para que la vista al mar acompañe la experiencia, incluso desde dentro de la sauna."
    ]
  },
  "casa-farallon": {
    title: "Casa Farallón",
    location: "Zapallar, Chile",
    category: "Residencial",
    year: "2025",
    area: "540 m²",
    hero: "assets/img/galeria-04-lounge.png",
    gallery: ["assets/img/galeria-01-pileta.png", "assets/img/proyecto-03-cocina.png"],
    text: [
      "Ubicada sobre un farallón rocoso, esta casa busca desaparecer detrás de la vegetación nativa y dejar que el protagonismo sea siempre del paisaje costero.",
      "Los ventanales de piso a techo y los livings semicubiertos disuelven el límite entre el interior y el exterior."
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const project = PROJECTS[params.get("id")] || PROJECTS["casa-duna"];

document.title = project.title + " - TERRA";
document.getElementById("projectHeroBg").style.backgroundImage = `url('${project.hero}')`;
document.getElementById("projectCategory").textContent = project.category;
document.getElementById("projectTitle").textContent = project.title;
document.getElementById("projectLocation").textContent = project.location;
document.getElementById("metaLocation").textContent = project.location;
document.getElementById("metaCategory").textContent = project.category;
document.getElementById("metaYear").textContent = project.year;
document.getElementById("metaArea").textContent = project.area;

const textEl = document.getElementById("projectText");
textEl.innerHTML = project.text.map((p) => `<p>${p}</p>`).join("");

const galleryEl = document.getElementById("projectGallery");
galleryEl.innerHTML = project.gallery
  .map((src) => `<div class="project-gallery__img" style="background-image:url('${src}')"></div>`)
  .join("");

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
menuBtn.addEventListener("click", () => menuOverlay.classList.toggle("is-open"));
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => menuOverlay.classList.remove("is-open"));
});

/* ---------- Page transition (curtain) ---------- */
const pageTransition = document.getElementById("pageTransition");
gsap.to(pageTransition, {
  scaleY: 0, transformOrigin: "top", duration: 0.9, ease: "power4.inOut", delay: 0.1
});
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

/* ---------- Reveal animations ---------- */
gsap.from(".project-hero__text > *", {
  opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.6
});
gsap.from(".project-hero__back", { opacity: 0, duration: 0.8, delay: 0.5 });
gsap.to(".project-hero__bg", {
  yPercent: 15, ease: "none",
  scrollTrigger: { trigger: ".project-hero", start: "top top", end: "bottom top", scrub: true }
});

/* ---------- Hero parallax (mouse tilt) ---------- */
const projectHeroBg = document.getElementById("projectHeroBg");
const pHeroX = gsap.quickTo(projectHeroBg, "x", { duration: 1.1, ease: "power3" });
const pHeroY = gsap.quickTo(projectHeroBg, "y", { duration: 1.1, ease: "power3" });
document.querySelector(".project-hero").addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const relX = (e.clientX / innerWidth - 0.5) * 2;
  const relY = (e.clientY / innerHeight - 0.5) * 2;
  pHeroX(relX * -22);
  pHeroY(relY * -14);
});
document.querySelector(".project-hero").addEventListener("mouseleave", () => {
  pHeroX(0);
  pHeroY(0);
});
gsap.from(".project-detail__meta-item", {
  opacity: 0, y: 20, stagger: 0.08, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: ".project-detail__meta", start: "top 85%" }
});
gsap.from(".project-detail__text p", {
  opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: ".project-detail__text", start: "top 85%" }
});
gsap.utils.toArray(".project-gallery__img").forEach((img, i) => {
  gsap.fromTo(img,
    { clipPath: "inset(20% 0 20% 0)" },
    {
      clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power4.out",
      scrollTrigger: { trigger: img, start: "top 85%" }
    }
  );
});
gsap.from(".cta h2, .cta__link", {
  opacity: 0, y: 40, stagger: 0.15, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".cta", start: "top 80%" }
});

document.querySelectorAll('a[href^="index.html#"]').forEach((anchor) => {
  anchor.addEventListener("click", () => menuOverlay.classList.remove("is-open"));
});
