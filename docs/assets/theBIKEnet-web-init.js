/* theBIKEnet – FULL INIT LOADER
   Loads:
   - template (header/footer)
   - styles
   - language system
*/

(async function () {
  const LOCAL_BASE  = "./";
  const REMOTE_BASE = "https://movingprojects.github.io/thebikenet/docs/assets/";

  const FILES = {
    template: "theBIKEnet-web-template.html",
    style:    "theBIKEnet-web-style.css"
  };

  function isLocalFile() {
    return location.protocol === "file:";
  }

  function buildURL(base, file) {
    return base + file;
  }

  async function fetchWithFallback(filename) {
    const local = buildURL(LOCAL_BASE, filename);
    const remote = buildURL(REMOTE_BASE, filename);

    // Try local first unless running from GitHub Pages
    const tryLocal = !location.hostname.includes("github.io");

    if (tryLocal) {
      try {
        const r1 = await fetch(local, { cache: "no-cache" });
        if (r1.ok) return r1.text();
      } catch (e) {}
    }

    // Try remote
    try {
      const r2 = await fetch(remote, { cache: "no-cache" });
      if (r2.ok) return r2.text();
    } catch (e) {}

    console.error("❌ Cannot load:", filename);
    return null;
  }

  // --------------------------------------------
  //  LOAD CSS
  // --------------------------------------------
  function loadCSS() {
    const cssURL     = buildURL(LOCAL_BASE, FILES.style);
    const fallbackURL = buildURL(REMOTE_BASE, FILES.style);

    const tryLocal = !location.hostname.includes("github.io");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = tryLocal ? cssURL : fallbackURL;

    link.onerror = () => {
      console.warn("⚠️ CSS local missing → loading GitHub version");
      link.href = fallbackURL;
    };

    document.head.appendChild(link);
  }

  // --------------------------------------------
  //  LANGUAGE SYSTEM
  // --------------------------------------------
  window.initLangToggle = function initLangToggle() {
    const btn = document.getElementById("toggleLang");
    const main = document.querySelector("main");
    const lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();

    window.currentLang = lang.startsWith("it") ? "it" : "en";

    function showLang(l) {
      document.querySelectorAll("[data-lang]").forEach(el => {
        el.style.display = el.getAttribute("data-lang") === l ? "block" : "none";
      });

      if (main) main.setAttribute("lang", l);
      window.currentLang = l;

      if (btn) {
        btn.textContent = l.toUpperCase();
        btn.setAttribute(
          "aria-label",
          `Change language. Current: ${l === "en" ? "English" : "Italiano"}`
        );
      }
    }

    window.setLang = showLang;

    showLang(window.currentLang);

    if (btn) {
      btn.addEventListener("click", () =>
        showLang(window.currentLang === "en" ? "it" : "en")
      );
    }
  };

  // --------------------------------------------
  //  LOAD TEMPLATE
  // --------------------------------------------
  async function loadTemplate() {
    const html = await fetchWithFallback(FILES.template);
    if (!html) return;

    const parser = new DOMParser();
    const tpl = parser.parseFromString(html, "text/html");

    const header = tpl.querySelector("header");
    const footer = tpl.querySelector("footer");

    if (header) document.getElementById("bikenet-header").innerHTML = header.outerHTML;
    if (footer) document.getElementById("bikenet-footer").innerHTML = footer.outerHTML;

    // Re-init language system after injecting template
    window.initLangToggle();
  }

  // --------------------------------------------
  //  RUN
  // --------------------------------------------
  loadCSS();
  await loadTemplate();
})();