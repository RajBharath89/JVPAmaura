/* =========================================================
   AMAURA Boutique Apartments — main.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  var amenities = [
    { icon: "🌇", name: "Golden Hour Deck" },
    { icon: "🎬", name: "Open Air Cinema" },
    { icon: "🪺", name: "The Nest Room" },
    { icon: "🌿", name: "The Wonder Garden" },
    { icon: "👶", name: "Mothers' Circle" },
    { icon: "🚶", name: "Walking Track" },
    { icon: "🧘", name: "Yoga Deck" },
    { icon: "🏋️", name: "Indoor / Outdoor Gym" },
    { icon: "📚", name: "Co-working / Library" },
    { icon: "🎉", name: "Open Party Area" }
  ];

  var proximity = [
    { km: "0", name: "Madha Medical College & Hospital (adjacent)" },
    { km: "4", name: "Saveetha University" },
    { km: "5", name: "Porur IT Hub (DLF, RMZ, Commerzone)" },
    { km: "6", name: "Poonamallee Junction (retail, bus)" },
    { km: "7", name: "NH-48 Chennai–Bengaluru Highway" }
  ];

  var floorplans = [
    { img: "images/floorplan-1.jpg", title: "Block A — First & Second Floor", meta: "2 & 3 BHK · Flats A, B & C" },
    { img: "images/floorplan-2.jpg", title: "Block A — Third Floor", meta: "Premium upper-floor layouts" },
    { img: "images/floorplan-3.jpg", title: "Block B — Flat A", meta: "Saleable 1318 sq.ft · 3 BHK" }
  ];

  var gallery = [
    { img: "images/gallery-1.jpg", alt: "Living room" },
    { img: "images/gallery-2.jpg", alt: "Master bedroom" },
    { img: "images/gallery-3.jpg", alt: "Modular kitchen" },
    { img: "images/gallery-4.jpg", alt: "Entrance lobby" },
    { img: "images/gallery-5.jpg", alt: "Rooftop deck" }
  ];

  var specs = [
    {
      icon: "🏛️", title: "Structure",
      items: ["RCC framed, Seismic Zone III compliant", "200mm external & 100mm internal solid blocks", "Floor height 3050mm slab to slab", "Pre-construction anti-termite treatment", "Waterproofing to all wet areas"]
    },
    {
      icon: "🛋️", title: "Interiors",
      items: ["600×1200mm vitrified tiles (Kajaria / Somany)", "Full-height large-format wall tiling", "Premium Jaquar / Parryware sanitaryware", "Digital smart locks (Godrej / Yale)", "Modular switches (Legrand / Schneider)"]
    },
    {
      icon: "⚙️", title: "Infrastructure",
      items: ["3-phase power with MCB & RCCB protection", "Rainwater harvesting as per CMDA norms", "Centralized Sewage Treatment Plant", "2-slot EV charging in stilt parking", "Pre-installed Split AC provisions"]
    }
  ];

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  /* ---------- Render dynamic sections ---------- */
  var aGrid = document.getElementById("amenitiesGrid");
  amenities.forEach(function (a) {
    aGrid.appendChild(el(
      '<div class="amenity"><span class="amenity__icon">' + a.icon +
      '</span><span class="amenity__name">' + a.name + "</span></div>"
    ));
  });

  var pGrid = document.getElementById("proximityGrid");
  proximity.forEach(function (p) {
    pGrid.appendChild(el(
      '<div class="prox"><div class="prox__km">' + p.km +
      '<span style="font-size:.5em"> km</span></div><div class="prox__name">' + p.name + "</div></div>"
    ));
  });

  var fGrid = document.getElementById("floorplansGrid");
  floorplans.forEach(function (f) {
    var card = el(
      '<div class="floorplan">' +
        '<div class="floorplan__media">' +
          '<img src="' + f.img + '" alt="' + f.title + '" loading="lazy" />' +
          '<div class="floorplan__lock">' +
            '<span class="floorplan__lock-icon">🔒</span>' +
            "<p>Unlock the full floor plan</p>" +
            '<button class="btn btn--primary" data-enquire>View Floor Plan</button>' +
          "</div>" +
        "</div>" +
        '<div class="floorplan__body">' +
          '<h3 class="floorplan__title">' + f.title + "</h3>" +
          '<p class="floorplan__meta">' + f.meta + "</p>" +
        "</div>" +
      "</div>"
    );
    fGrid.appendChild(card);
  });

  var gGrid = document.getElementById("galleryGrid");
  gallery.forEach(function (g) {
    gGrid.appendChild(el(
      '<div class="gallery__item"><img src="' + g.img + '" alt="' + g.alt + '" loading="lazy" /></div>'
    ));
  });

  var sGrid = document.getElementById("specsGrid");
  specs.forEach(function (s) {
    var items = s.items.map(function (i) { return "<li>" + i + "</li>"; }).join("");
    sGrid.appendChild(el(
      '<div class="spec"><div class="spec__head"><span class="spec__icon">' + s.icon +
      '</span><h3 class="spec__title">' + s.title + '</h3></div><ul class="spec__list">' + items + "</ul></div>"
    ));
  });

  /* ---------- Header scroll ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Mobile nav ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navClose = document.getElementById("navClose");
  function openNav() { nav.classList.add("open"); }
  function closeNav() { nav.classList.remove("open"); }
  navToggle.addEventListener("click", openNav);
  navClose.addEventListener("click", closeNav);
  nav.querySelectorAll(".nav__link").forEach(function (l) {
    l.addEventListener("click", closeNav);
  });

  /* ---------- Modal ---------- */
  var modal = document.getElementById("enquiryModal");
  function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeNav();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-enquire]")) { e.preventDefault(); openModal(); }
    if (e.target.closest("[data-close-modal]")) { closeModal(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
  }

  /* ---------- Forms ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        time: new Date().toISOString()
      };
      // Persist locally (no backend on a static site)
      try {
        var leads = JSON.parse(localStorage.getItem("amaura_leads") || "[]");
        leads.push(data);
        localStorage.setItem("amaura_leads", JSON.stringify(leads));
      } catch (err) {}
      form.reset();
      if (modal.classList.contains("open")) closeModal();
      showToast("Thank you, " + data.name.split(" ")[0] + "! Our team will reach out soon.");
    });
  });

  /* ---------- Animated counters ---------- */
  var counted = false;
  function runCounters() {
    if (counted) return;
    counted = true;
    document.querySelectorAll("[data-count]").forEach(function (span) {
      var target = parseInt(span.getAttribute("data-count"), 10);
      var dur = 1400, start = 0, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        span.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(step);
        else span.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  var countersSection = document.getElementById("counters");
  var cObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) runCounters(); });
  }, { threshold: 0.4 });
  if (countersSection) cObserver.observe(countersSection);

  /* ---------- Reveal on scroll ---------- */
  document.querySelectorAll(".section, .counters").forEach(function (s) {
    s.classList.add("reveal");
  });
  var rObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); rObserver.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (s) { rObserver.observe(s); });
  // Failsafe: never leave content hidden (e.g. if observer doesn't fire)
  setTimeout(function () {
    revealEls.forEach(function (s) { s.classList.add("in"); });
  }, 1500);

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
