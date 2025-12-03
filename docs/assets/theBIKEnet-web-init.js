(async function () {
  const USE_WEB = true;

  const LOCAL_BASE = "../";
  const REMOTE_BASE =
    "https://movingprojects.github.io/thebikenet/docs/assets/";

  const FILES = {
    template: "theBIKEnet-web-template.html",
    style: "theBIKEnet-web-style.css",
  };

  async function fetchWithFallback(filename) {
    const local = LOCAL_BASE + filename;
    const remote = REMOTE_BASE + filename;

    link.href = USE_WEB ? fallbackURL : cssURL;

    if (USE_WEB) {
      try {
        const r2 = await fetch(remote, { cache: "no-cache" });
        if (r2.ok) return r2.text();
      } catch (e) {}
    } else {
      try {
        const r1 = await fetch(local, { cache: "no-cache" });
        if (r1.ok) return r1.text();
      } catch (e) {}
    }

    console.error("❌ Impossibile caricare", filename);
    return null;
  }

  // ==========================
  //   LOAD CSS
  // ==========================
  function loadCSS() {
    const cssURL = LOCAL_BASE + FILES.style;
    const fallbackURL = REMOTE_BASE + FILES.style;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = USE_WEB ? fallbackURL : cssURL;

    link.onerror = () => {
      console.warn("⚠️ CSS locale non trovato, uso GitHub");
      link.href = fallbackURL;
    };

    document.head.appendChild(link);
  }

  // ==========================
  //   LOAD TEMPLATE
  // ==========================
  async function loadTemplate() {
    const html = await fetchWithFallback(FILES.template);
    if (!html) return;

    const parser = new DOMParser();
    const tpl = parser.parseFromString(html, "text/html");

    const header = tpl.querySelector("header");
    const footer = tpl.querySelector("footer");

    if (header)
      document.getElementById("bikenet-header").innerHTML = header.outerHTML;
    if (footer)
      document.getElementById("bikenet-footer").innerHTML = footer.outerHTML;

    if (window.initLangToggle) window.initLangToggle();
  }

  // ==========================
  //   EXECUTE
  // ==========================
  loadCSS();
  await loadTemplate();
})();
