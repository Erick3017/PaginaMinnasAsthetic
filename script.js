/* =========================================================
   MINNAS BEAUTY AESTHETICS — script.js
========================================================= */

// 1) CONFIGURA AQUÍ TU NÚMERO DE WHATSAPP
const WHATSAPP_NUMBER = "50670057211";

// Mensaje base que se le prellena al cliente según el servicio elegido
function buildWhatsAppLink(serviceName) {
    const base = `Hola Minnas! Me gustaría reservar o consultar sobre: ${serviceName}.`;
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

navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// 5) Año dinámico en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();