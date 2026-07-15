/* =========================================================
   MINNAS BEAUTY AESTHETICS — script.js
========================================================= */

// 1) CONFIGURA AQUÍ TU NÚMERO DE WHATSAPP
const WHATSAPP_NUMBER = "50670057211";

// Mensaje base que se le prellena al cliente según el servicio elegido
function buildWhatsAppLink(serviceName) {
  const base = `Hola Minnas! Me gustaría reservar / consultar sobre: ${serviceName}.`;
  const text = encodeURIComponent(base);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// 2) Conecta todos los botones con [data-service] al link de WhatsApp
document.querySelectorAll("[data-service]").forEach((el) => {
  el.setAttribute("href", buildWhatsAppLink(el.getAttribute("data-service")));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener noreferrer");
});

// 3) Header: cambia de estilo al hacer scroll
const header = document.getElementById("siteHeader");
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// 4) Menú móvil
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  mainNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
    closeMenu();
    navToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
});

// 6) Carrusel de imágenes en las tarjetas de Bisutería & Joyería
document.querySelectorAll("[data-carousel]").forEach((root) => {
  const track = root.querySelector(".p-track");
  const slides = Array.from(track.children);
  const count = slides.length;
  root.setAttribute("data-count", String(count));
  root.setAttribute("role", "region");
  root.setAttribute("aria-roledescription", "carrusel");
  if (count <= 1) return;

  const prevBtn = root.querySelector(".p-nav-prev");
  const nextBtn = root.querySelector(".p-nav-next");
  const dotsWrap = root.querySelector(".p-dots");

  let index = 0;
  let autoplayTimer = null;

  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "p-dot" + (i === 0 ? " is-active" : "");
    b.setAttribute("aria-label", `Ver imagen ${i + 1} de ${count}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function goTo(i) {
    index = (i + count) % count;
    render();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  nextBtn.addEventListener("click", (e) => { e.preventDefault(); next(); restartAutoplay(); });
  prevBtn.addEventListener("click", (e) => { e.preventDefault(); prev(); restartAutoplay(); });

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { next(); restartAutoplay(); }
    if (event.key === "ArrowLeft") { prev(); restartAutoplay(); }
  });

  // Swipe support (touch/pointer)
  let startX = null;
  root.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  root.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restartAutoplay(); }
    startX = null;
  });

  // Gentle autoplay, paused on hover/focus
  function startAutoplay() {
    if (document.hidden || autoplayTimer) return;
    autoplayTimer = setInterval(next, 7000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
});
// 7) Año dinámico en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
