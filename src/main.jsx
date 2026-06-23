import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function enhanceStaticPage(root) {
  const toggle = root.querySelector(".mobile-menu-toggle");
  const backdrop = root.querySelector(".mobile-menu-backdrop");
  const drawer = root.querySelector(".mobile-drawer");
  const drawerLinks = root.querySelectorAll(".mobile-drawer-link, .mobile-drawer-sublink, .contact-button-mobile");

  const setMobileMenuOpen = (isOpen) => {
    toggle?.classList.toggle("is-open", isOpen);
    backdrop?.classList.toggle("is-open", isOpen);
    drawer?.classList.toggle("mobile-drawer-open", isOpen);
    document.body.classList.toggle("body-mobile-menu-open", isOpen);
    toggle?.setAttribute("aria-expanded", String(isOpen));
    toggle?.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };

  toggle?.addEventListener("click", () => setMobileMenuOpen(!toggle.classList.contains("is-open")));
  backdrop?.addEventListener("click", () => setMobileMenuOpen(false));
  drawerLinks.forEach((link) => link.addEventListener("click", () => setMobileMenuOpen(false)));

  root.querySelectorAll(".faq-item, .rehab-faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      const icon = item.querySelector(".faq-icon, .rehab-faq-icon");
      if (icon) {
        icon.textContent = item.open ? "-" : "+";
      }
    });
  });

  const animatedSelectors = [
    ".hero-content > *",
    ".about-copy",
    ".about-media",
    ".team-header",
    ".team-carousel",
    ".procedures-title",
    ".solution-card",
    ".procedures-button",
    ".specialties-eyebrow",
    ".specialties-title",
    ".specialties-description",
    ".specialty-card",
    ".specialties-button",
    ".faq-title",
    ".faq-item",
    ".faq-button",
    ".testimonials-header",
    ".testimonials-carousel",
    ".testimonial-card",
    ".rehab-hero-content > *",
    ".rehab-story-copy",
    ".rehab-plan-copy",
    ".rehab-plan-media",
    ".rehab-process-header",
    ".rehab-process-card",
    ".rehab-about-copy",
    ".rehab-about-media",
    ".rehab-faq-copy",
  ];

  const revealElements = Array.from(new Set(root.querySelectorAll("[data-reveal], " + animatedSelectors.join(","))));
  const footerElements = Array.from(root.querySelectorAll("[data-footer-reveal], [data-footer-credit-reveal]"));
  const elements = [...revealElements, ...footerElements];

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 65}ms`);
  });

  footerElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
  );

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element));
    });
  });
}

if (rootElement.hasChildNodes()) {
  enhanceStaticPage(rootElement);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
