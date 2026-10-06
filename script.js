/* Indus Roots Exports — site behaviour (no dependencies) */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "918870100614";
  var EMAIL = "exports@indusroots.com";

  document.documentElement.classList.add("js");

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (toTop) toTop.classList.toggle("is-visible", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Mobile drawer ---------- */
  var drawer = document.getElementById("drawer");
  var openBtn = document.querySelector(".menu-toggle");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = drawer.querySelector(".drawer__close");
      if (first) first.focus();
    } else if (openBtn) {
      openBtn.focus();
    }
  }
  if (drawer && openBtn) {
    openBtn.addEventListener("click", function () { setDrawer(true); });
    drawer.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { setDrawer(false); });
    });
    drawer.querySelectorAll("nav a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Products page: active brand tab ---------- */
  var tabs = document.querySelectorAll(".brand-switch a");
  if (tabs.length && "IntersectionObserver" in window) {
    var sections = [];
    tabs.forEach(function (t) {
      var s = document.querySelector(t.getAttribute("href"));
      if (s) sections.push({ tab: t, el: s });
    });
    var tabIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        sections.forEach(function (s) { if (s.el === entry.target) s.tab.classList.add("is-active"); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { tabIo.observe(s.el); });
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = form.querySelector(".form__status");
    var productSelect = form.querySelector("#f-product");

    // Pre-select a product from ?product=… or from "Enquire" buttons on the same page
    function selectProduct(name) {
      if (!productSelect || !name) return;
      for (var i = 0; i < productSelect.options.length; i++) {
        if (productSelect.options[i].value.toLowerCase() === name.toLowerCase()) {
          productSelect.selectedIndex = i;
          return;
        }
      }
    }
    try {
      var q = new URLSearchParams(window.location.search).get("product");
      if (q) selectProduct(q);
    } catch (e) { /* old browser: ignore */ }
    document.querySelectorAll("[data-enquire]").forEach(function (btn) {
      btn.addEventListener("click", function () { selectProduct(btn.getAttribute("data-enquire")); });
    });

    function value(id) {
      var el = form.querySelector("#" + id);
      return el ? el.value.trim() : "";
    }
    function validate() {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (el) {
        var valid = el.value.trim() !== "" && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.closest(".field").classList.toggle("is-invalid", !valid);
        if (!valid && ok) { el.focus(); ok = false; }
      });
      return ok;
    }
    function buildMessage() {
      var lines = [
        "New enquiry — Indus Roots Exports website",
        "",
        "Name: " + value("f-name"),
        "Company: " + (value("f-company") || "-"),
        "Country: " + value("f-country"),
        "Phone / WhatsApp: " + value("f-phone"),
        "Email: " + value("f-email"),
        "Product: " + (value("f-product") || "-"),
        "Quantity: " + (value("f-qty") || "-"),
        "",
        "Message:",
        value("f-message") || "-"
      ];
      return lines.join("\n");
    }
    function say(msg, isError) {
      if (!status) return;
      status.textContent = msg;
      status.classList.toggle("is-error", !!isError);
    }

    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field");
      if (f) f.classList.remove("is-invalid");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.value) || "whatsapp";
      if (!validate()) { say("Please fill in the highlighted fields.", true); return; }
      var text = buildMessage();
      if (via === "email") {
        var subject = "Enquiry: " + (value("f-product") || "Products") + " — " + value("f-company") + " (" + value("f-country") + ")";
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
        say("Your email app has opened with the enquiry. Just press send.");
      } else {
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        say("WhatsApp has opened with your enquiry. Just press send.");
      }
    });
  }

  /* ---------- Language (Google Translate) ---------- */
  var langSelects = document.querySelectorAll(".lang select");
  function getLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "en";
  }
  function setCookie(val) {
    var host = window.location.hostname;
    var expiry = val ? "" : "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    var c = "googtrans=" + (val || "") + "; path=/" + expiry;
    document.cookie = c;
    if (host.indexOf(".") > -1 && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      document.cookie = c + "; domain=." + host.replace(/^www\./, "");
    }
  }
  var current = getLang();
  langSelects.forEach(function (sel) {
    sel.value = current;
    if (sel.value !== current) sel.value = "en";
    sel.addEventListener("change", function () {
      setCookie(sel.value === "en" ? "" : "/en/" + sel.value);
      window.location.reload();
    });
  });
  if (current !== "en") {
    document.documentElement.setAttribute("lang", current);
    window.googleTranslateElementInit = function () {
      /* global google */
      new google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
    };
    var gt = document.createElement("script");
    gt.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    gt.async = true;
    document.body.appendChild(gt);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
