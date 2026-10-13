/* Indus Roots Exports — colour theme. The site uses the navy (blue) brand theme only.
   Clears any theme saved by the old /admin preview so every visitor sees blue. */
(function () {
  try { localStorage.removeItem("ir-theme"); } catch (e) { /* storage blocked */ }
  document.documentElement.setAttribute("data-theme", "navy");
})();
