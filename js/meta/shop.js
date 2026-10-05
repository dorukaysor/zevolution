(function () {
  "use strict";

  const PAGE_SIZE = 8;
  const LOAD_STEP = 4;

  var state = {
    categories: [],
    maxPrice: 2000,
    minRating: 0,
    tags: [],
    sort: "featured",
    search: "",
    showing: PAGE_SIZE,
  };

  /* ─ Parse URL params ──────────────────────────────────────── */
  function parseURL() {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("cat");
    var q = params.get("q");
    var sort = params.get("sort");
    var tag = params.get("tag");

    if (
      cat &&
      window.ZEVO_CATEGORIES.find(function (c) {
        return c.slug === cat;
      })
    ) {
      state.categories = [cat];
    }
    if (q) state.search = q.trim();
    if (
      sort &&
      ["featured", "price-asc", "price-desc", "rating", "new", "sale"].indexOf(
        sort,
      ) > -1
    ) {
      state.sort = sort;
    }
    if (tag) {
      var tagVal = tag.charAt(0).toUpperCase() + tag.slice(1);
      if (tagVal === "New" || tagVal === "Sale") state.tags = [tagVal];
    }
  }

  /* ─ Sync URL to current state (replaceState — no back-stack noise) ── */
  function syncURL() {
    var p = new URLSearchParams();
    if (state.categories.length === 1) p.set("cat", state.categories[0]);
    if (state.search) p.set("q", state.search);
    if (state.sort !== "featured") p.set("sort", state.sort);
    if (state.tags.length === 1) p.set("tag", state.tags[0].toLowerCase());
    var qs = p.toString();
    var newURL = window.location.pathname + (qs ? "?" + qs : "");
    history.replaceState(null, "", newURL);
  }

  /* ─ DOM shortcuts ─────────────────────────────────────────── */
  function el(id) {
    return document.getElementById(id);
  }

  /* ─ Build sidebar UI ──────────────────────────────────────── */
  function buildSidebar() {
    // Categories
    el("category-filters").innerHTML = window.ZEVO_CATEGORIES.map(
      function (cat) {
        var checked = state.categories.indexOf(cat.slug) > -1;
        return (
          '<label class="flex items-center gap-2.5 cursor-pointer group" data-cat="' +
          cat.slug +
          '">' +
          '<span class="filter-check' +
          (checked ? " checked" : "") +
          '" data-cat="' +
          cat.slug +
          '"></span>' +
          '<span class="font-body text-sm text-z-text group-hover:text-[var(--c-accent-text)] transition-colors select-none">' +
          cat.label +
          "</span>" +
          '<span class="ml-auto font-mono text-[10px] text-z-muted">' +
          cat.count +
          "</span>" +
          "</label>"
        );
      },
    ).join("");

    // Ratings
    var ratings = [
      { label: "4&#9733; &amp; up", val: 4 },
      { label: "3&#9733; &amp; up", val: 3 },
      { label: "2&#9733; &amp; up", val: 2 },
      { label: "Any rating", val: 0 },
    ];
    el("rating-filters").innerHTML = ratings
      .map(function (r) {
        var checked = state.minRating === r.val;
        return (
          '<label class="flex items-center gap-2.5 cursor-pointer group" data-rating="' +
          r.val +
          '">' +
          '<span class="filter-radio' +
          (checked ? " checked" : "") +
          '" data-rating="' +
          r.val +
          '"></span>' +
          '<span class="font-body text-sm text-z-text group-hover:text-[var(--c-accent-text)] transition-colors select-none">' +
          r.label +
          "</span>" +
          "</label>"
        );
      })
      .join("");

    // Tags
    var tags = [
      { label: "New arrivals", val: "New" },
      { label: "On sale", val: "Sale" },
    ];
    el("tag-filters").innerHTML = tags
      .map(function (t) {
        var checked = state.tags.indexOf(t.val) > -1;
        return (
          '<label class="flex items-center gap-2.5 cursor-pointer group" data-tag="' +
          t.val +
          '">' +
          '<span class="filter-check' +
          (checked ? " checked" : "") +
          '" data-tag="' +
          t.val +
          '"></span>' +
          '<span class="font-body text-sm text-z-text group-hover:text-[var(--c-accent-text)] transition-colors select-none">' +
          t.label +
          "</span>" +
          "</label>"
        );
      })
      .join("");

    // Price slider
    el("price-slider").value = state.maxPrice;
    updatePriceLabel(state.maxPrice);
  }

  function updatePriceLabel(val) {
    var label =
      val >= 2000 ? "Rs. 2,000+" : "Rs. " + Number(val).toLocaleString();
    el("price-max-label").textContent = label;
    el("price-slider-val").textContent = label;
  }

  /* ─ Filter & sort ──────────────────────────────────────────── */
  function getFiltered() {
    var products = window.ZEVO_PRODUCTS.slice();

    if (state.categories.length > 0) {
      products = products.filter(function (p) {
        return state.categories.indexOf(p.category) > -1;
      });
    }
    if (state.search) {
      var q = state.search.toLowerCase();
      products = products.filter(function (p) {
        return (
          p.name.toLowerCase().indexOf(q) > -1 ||
          p.categoryLabel.toLowerCase().indexOf(q) > -1 ||
          p.description.toLowerCase().indexOf(q) > -1
        );
      });
    }
    if (state.maxPrice < 2000) {
      products = products.filter(function (p) {
        return p.price <= state.maxPrice;
      });
    }
    if (state.minRating > 0) {
      products = products.filter(function (p) {
        return p.rating >= state.minRating;
      });
    }
    if (state.tags.length > 0) {
      products = products.filter(function (p) {
        return state.tags.indexOf(p.tag) > -1;
      });
    }

    switch (state.sort) {
      case "price-asc":
        products.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "price-desc":
        products.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case "rating":
        products.sort(function (a, b) {
          return b.rating - a.rating;
        });
        break;
      case "new":
        products.sort(function (a, b) {
          return (a.tag === "New" ? -1 : 1) - (b.tag === "New" ? -1 : 1);
        });
        break;
      case "sale":
        products.sort(function (a, b) {
          return (a.tag === "Sale" ? -1 : 1) - (b.tag === "Sale" ? -1 : 1);
        });
        break;
    }

    return products;
  }

  /* ─ Render grid ────────────────────────────────────────────── */
  function render() {
    var all = getFiltered();
    var total = all.length;
    var showing = Math.min(state.showing, total);
    var slice = all.slice(0, showing);
    var grid = el("product-grid");

    if (total === 0) {
      grid.innerHTML = "";
      el("empty-state").classList.remove("hidden");
      el("load-more-wrapper").classList.add("hidden");
    } else {
      el("empty-state").classList.add("hidden");
      grid.innerHTML = slice
        .map(function (p, i) {
          return window.buildProductCard(p, {
            delay: Math.min((i % 4) + 1, 6),
          });
        })
        .join("");

      // Reveal + tilt newly injected cards
      setTimeout(function () {
        grid.querySelectorAll(".reveal").forEach(function (e) {
          e.classList.add("revealed");
        });
        grid.querySelectorAll(".card-tilt").forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var rotX = (((e.clientY - rect.top) / rect.height) * 2 - 1) * -6;
            var rotY = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 6;
            card.style.transform =
              "perspective(800px) rotateX(" +
              rotX +
              "deg) rotateY(" +
              rotY +
              "deg) scale(1.02)";
          });
          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      }, 30);
    }

    // Sync wishlist icons
    grid.querySelectorAll(".wishlist-btn").forEach(function (btn) {
      var icon = btn.querySelector(".wishlist-icon");
      if (!icon) return;
      if (window.Store && Store.isWishlisted(btn.dataset.id)) {
        icon.setAttribute("fill", "#FACC15");
        icon.setAttribute("stroke", "#FACC15");
      } else {
        icon.setAttribute("fill", "none");
        icon.setAttribute("stroke", "currentColor");
      }
    });

    // Results count
    el("results-count").textContent =
      "Showing " +
      showing +
      " of " +
      total +
      " product" +
      (total !== 1 ? "s" : "");

    // Load more btn
    var lmw = el("load-more-wrapper");
    if (showing < total) {
      var remaining = total - showing;
      el("load-more-text").textContent =
        "Load More (" + Math.min(LOAD_STEP, remaining) + " more)";
      lmw.classList.remove("hidden");
    } else {
      lmw.classList.add("hidden");
    }

    renderChips();
    updateBadge();
    syncURL();
  }

  /* ─ Active filter chips ────────────────────────────────────── */
  function renderChips() {
    var chips = [];
    state.categories.forEach(function (slug) {
      var cat = window.ZEVO_CATEGORIES.find(function (c) {
        return c.slug === slug;
      });
      if (cat)
        chips.push({
          label: cat.label,
          remove: function () {
            state.categories = state.categories.filter(function (c) {
              return c !== slug;
            });
            resetShowing();
            rebuildAndRender();
          },
        });
    });
    if (state.search) {
      chips.push({
        label: '"' + state.search + '"',
        remove: function () {
          state.search = "";
          resetShowing();
          rebuildAndRender();
        },
      });
    }
    if (state.maxPrice < 2000) {
      chips.push({
        label: "Max Rs. " + state.maxPrice,
        remove: function () {
          state.maxPrice = 2000;
          el("price-slider").value = 2000;
          updatePriceLabel(2000);
          resetShowing();
          rebuildAndRender();
        },
      });
    }
    if (state.minRating > 0) {
      chips.push({
        label: state.minRating + "\u2605+",
        remove: function () {
          state.minRating = 0;
          resetShowing();
          rebuildAndRender();
        },
      });
    }
    state.tags.forEach(function (tag) {
      chips.push({
        label: tag,
        remove: (function (t) {
          return function () {
            state.tags = state.tags.filter(function (x) {
              return x !== t;
            });
            resetShowing();
            rebuildAndRender();
          };
        })(tag),
      });
    });

    var container = el("active-filters");
    container.innerHTML = chips
      .map(function (c, i) {
        return (
          '<button class="filter-chip" data-chip="' +
          i +
          '" aria-label="Remove ' +
          c.label +
          ' filter">' +
          c.label +
          '<span class="filter-chip-x" aria-hidden="true">' +
          '<i class="fa-solid fa-xmark" style="font-size:8px"></i>' +
          "</span></button>"
        );
      })
      .join("");

    container.querySelectorAll("[data-chip]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        chips[parseInt(this.dataset.chip)].remove();
      });
    });
  }

  function updateBadge() {
    var count =
      state.categories.length +
      state.tags.length +
      (state.minRating > 0 ? 1 : 0) +
      (state.maxPrice < 2000 ? 1 : 0) +
      (state.search ? 1 : 0);
    var badge = el("filter-badge");
    badge.textContent = count;
    if (count > 0) badge.classList.remove("hidden");
    else badge.classList.add("hidden");
  }

  function resetShowing() {
    state.showing = PAGE_SIZE;
  }

  function rebuildAndRender() {
    buildSidebar();
    bindSidebarEvents();
    render();
  }

  /* ─ Sidebar events ─────────────────────────────────────────── */
  function bindSidebarEvents() {
    el("category-filters")
      .querySelectorAll("label")
      .forEach(function (label) {
        label.addEventListener("click", function () {
          var slug = this.dataset.cat;
          var idx = state.categories.indexOf(slug);
          if (idx > -1) state.categories.splice(idx, 1);
          else state.categories.push(slug);
          resetShowing();
          rebuildAndRender();
        });
      });

    el("rating-filters")
      .querySelectorAll("label")
      .forEach(function (label) {
        label.addEventListener("click", function () {
          state.minRating = parseFloat(this.dataset.rating);
          resetShowing();
          rebuildAndRender();
        });
      });

    el("tag-filters")
      .querySelectorAll("label")
      .forEach(function (label) {
        label.addEventListener("click", function () {
          var tag = this.dataset.tag;
          var idx = state.tags.indexOf(tag);
          if (idx > -1) state.tags.splice(idx, 1);
          else state.tags.push(tag);
          resetShowing();
          rebuildAndRender();
        });
      });
  }

  /* ─ Drawer ────────────────────────────────────────────────── */
  function openDrawer() {
    el("filter-sidebar").classList.add("open");
    el("filter-overlay").classList.remove("hidden");
    requestAnimationFrame(function () {
      el("filter-overlay").classList.add("active");
    });
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    el("filter-sidebar").classList.remove("open");
    el("filter-overlay").classList.remove("active");
    setTimeout(function () {
      el("filter-overlay").classList.add("hidden");
    }, 380);
    document.body.style.overflow = "";
  }

  /* ─ Reset all ─────────────────────────────────────────────── */
  function resetAll() {
    state.categories = [];
    state.maxPrice = 2000;
    state.minRating = 0;
    state.tags = [];
    state.search = "";
    state.sort = "featured";
    el("sort-select").value = "featured";
    el("price-slider").value = 2000;
    updatePriceLabel(2000);
    resetShowing();
    rebuildAndRender();
  }

  /* ─ Init ──────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    parseURL();
    el("sort-select").value = state.sort;

    // Sync search input and bind dynamic listeners once partials load
    document.addEventListener("zevo:partials:loaded", function () {
      var navSearch = document.getElementById("nav-search");
      var mobileSearch = document.getElementById("mobile-search");
      
      if (navSearch) {
        if (state.search) navSearch.value = state.search;
        navSearch.addEventListener("input", function () {
          state.search = this.value.trim();
          resetShowing();
          render();
        });
      }
      if (mobileSearch) {
        if (state.search) mobileSearch.value = state.search;
        mobileSearch.addEventListener("input", function () {
          state.search = this.value.trim();
          resetShowing();
          render();
        });
      }
    });

    buildSidebar();
    bindSidebarEvents();
    render();

    el("price-slider").addEventListener("input", function () {
      state.maxPrice = parseInt(this.value);
      updatePriceLabel(state.maxPrice);
      resetShowing();
      render();
    });

    el("sort-select").addEventListener("change", function () {
      state.sort = this.value;
      resetShowing();
      render();
    });

    el("reset-filters").addEventListener("click", resetAll);
    el("empty-reset-btn").addEventListener("click", resetAll);

    el("load-more").addEventListener("click", function () {
      state.showing += LOAD_STEP;
      render();
    });

    el("filters-open-btn").addEventListener("click", openDrawer);
    el("filters-close-btn").addEventListener("click", closeDrawer);
    el("filter-overlay").addEventListener("click", closeDrawer);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  });
})();