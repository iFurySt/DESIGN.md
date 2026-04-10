const searchInput = document.querySelector("[data-search-input]");
const filterGroup = document.querySelector("[data-filter-group]");
const designList = document.querySelector("[data-design-list]");
const emptyState = document.querySelector("[data-empty-state]");

if (searchInput && filterGroup && designList) {
  const rows = [...designList.querySelectorAll(".design-row")];
  let activeFilter = "All";

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    rows.forEach((row) => {
      const name = row.dataset.name || "";
      const category = row.dataset.category || "";
      const description = row.dataset.description || "";
      const matchesFilter = activeFilter === "All" || category === activeFilter;
      const matchesQuery = !query || name.includes(query) || description.includes(query);
      const isVisible = matchesFilter && matchesQuery;
      row.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  };

  searchInput.addEventListener("input", applyFilters);
  filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter-value]");
    if (!button) return;

    activeFilter = button.dataset.filterValue || "All";
    for (const chip of filterGroup.querySelectorAll("[data-filter-value]")) {
      chip.classList.toggle("is-active", chip === button);
    }
    applyFilters();
  });

  applyFilters();
}

for (const button of document.querySelectorAll("[data-copy-text]")) {
  button.addEventListener("click", async () => {
    const text = button.dataset.copyText || "";
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = original;
      }, 1600);
    } catch {
      button.textContent = "Copy failed";
    }
  });
}

for (const root of document.querySelectorAll("[data-preview-root]")) {
  const iframe = root.querySelector("iframe");
  const previewPanel = root.querySelector("[data-preview-panel]");
  const designPanel = root.querySelector("[data-design-panel]");
  const viewButtons = [...root.querySelectorAll("[data-view]")];
  const themeButtons = [...root.querySelectorAll("[data-theme]")];

  const setView = (view) => {
    const showPreview = view === "preview";
    previewPanel.hidden = !showPreview;
    designPanel.hidden = showPreview;
    viewButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === view);
    });
  };

  const setTheme = (theme) => {
    if (!iframe) return;
    iframe.src = theme === "dark" ? iframe.dataset.darkSrc : iframe.dataset.lightSrc;
    themeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.theme === theme);
    });
  };

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.theme));
  });

  setView("preview");
  setTheme("light");
}
