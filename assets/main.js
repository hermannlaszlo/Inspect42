(() => {
  // Nav active
  const path = (window.location.pathname || "").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isIndex = (path.endsWith("/") || path.endsWith("index.html") || path === "");
    if (isIndex && href.includes("index.html")) a.dataset.active = "true";
    if (path.endsWith("security.html") && href.includes("security.html")) a.dataset.active = "true";
  });

  // Demo stepper (static, file:// safe)
  const steps = Array.from(document.querySelectorAll("[data-step]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const setStep = (n) => {
    steps.forEach((s) => s.dataset.active = (Number(s.dataset.step) === n) ? "true" : "false");
    panels.forEach((p) => p.hidden = (Number(p.dataset.panel) !== n));
    // keep focus for accessibility
    const active = steps.find(s => Number(s.dataset.step) === n);
    if (active) active.setAttribute("aria-current", "step");
    steps.filter(s => Number(s.dataset.step) !== n).forEach(s => s.removeAttribute("aria-current"));
  };

  steps.forEach((s) => {
    s.addEventListener("click", () => setStep(Number(s.dataset.step)));
    s.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setStep(Number(s.dataset.step)); }
    });
  });

  // Next/Prev buttons
  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => setStep(Number(btn.dataset.next)));
  });
  document.querySelectorAll("[data-prev]").forEach(btn => {
    btn.addEventListener("click", () => setStep(Number(btn.dataset.prev)));
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  // Default step if exists
  if (steps.length && panels.length) setStep(1);
})();
