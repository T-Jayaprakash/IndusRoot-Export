/* Indus Roots Exports — colour theme loader.
   Runs in <head> before the page paints, so there is no colour flash.
   Themes: "navy" (Navy & Gold) and "gold" (Gold & Navy).
   DEFAULT_THEME is what every visitor sees; /admin lets you preview or switch in your own browser. */
(function () {
  var DEFAULT_THEME = "navy";
  var THEMES = ["navy", "gold"];
  var KEY = "ir-theme";
  var theme = null;
  try {
    var q = new URLSearchParams(window.location.search).get("theme");
    if (THEMES.indexOf(q) > -1) localStorage.setItem(KEY, q);
    theme = localStorage.getItem(KEY);
  } catch (e) { /* storage blocked: use default */ }
  if (THEMES.indexOf(theme) === -1) theme = DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  window.IR_THEME = { DEFAULT: DEFAULT_THEME, THEMES: THEMES, KEY: KEY, current: theme };
})();
