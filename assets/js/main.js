/* Gabriel Stange / SCL — interações mínimas (tema e e-mail ofuscado). */
(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.dataset.theme || (media.matches ? "dark" : "light");
  }

  function syncButton(btn) {
    btn.setAttribute("aria-pressed", currentTheme() === "dark" ? "true" : "false");
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    syncButton(toggle);
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncButton(toggle);
    });
    media.addEventListener("change", function () { syncButton(toggle); });
  }

  /* E-mail: usuário e domínio chegam invertidos em data-attributes. */
  function reverse(s) { return s.split("").reverse().join(""); }
  document.querySelectorAll(".js-email").forEach(function (el) {
    var addr = reverse(el.dataset.u) + "@" + reverse(el.dataset.d);
    el.href = "mailto:" + addr;
    el.textContent = addr;
  });
})();
