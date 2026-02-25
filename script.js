// script.js
(function () {
  const links = document.querySelectorAll(".navbar a[data-page]");
  const pages = document.querySelectorAll(".page");
  const titleEl = document.getElementById("pageTitle"); // optional

  function prettyTitle(id) {
    // "cryptomycota" -> "cryptomycota page !!"
    return `${id} page !!`;
  }

  function showPage(pageId, pushHash = true) {
    // show/hide pages
    pages.forEach(p => p.classList.toggle("active", p.id === pageId));

    // active nav pill
    links.forEach(a => a.classList.toggle("active", a.dataset.page === pageId));

    // update header text (optional)
    if (titleEl) titleEl.textContent = prettyTitle(pageId);

    // update URL hash
    if (pushHash) {
      history.replaceState(null, "", `#${pageId}`);
    }
  }

  // click handlers
  links.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = a.dataset.page;
      showPage(pageId);
    });
  });

  // support direct links like site.html#cryptomycota
  function initFromHash() {
    const fromHash = (location.hash || "").replace("#", "");
    const exists = fromHash && document.getElementById(fromHash);
    showPage(exists ? fromHash : (pages[0]?.id || "home"), false);
  }

  window.addEventListener("hashchange", initFromHash);
  initFromHash();
})();

function showPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));

  const page = document.getElementById(hash);
  const nav = document.querySelector(`.pill[data-page="${hash}"]`);

  if (page) page.classList.add("active");
  if (nav) nav.classList.add("active");

  const title = document.getElementById("pageTitle");
  if (title) title.textContent = hash;
}

window.addEventListener("hashchange", showPageFromHash);
window.addEventListener("load", showPageFromHash);