const BETTER_MAP = {
  Price: "lower",
  Rating: "higher",
  Reviews: "higher",
  RAM: "higher-num",
  Storage: "higher-num",
  Battery: "higher-num",
  Capacity: "higher-num",
  Output: "higher-num",
  Wattage: "higher-num",
};
function extractNum(s) {
  const m = String(s).match(/[\d,]+(\.\d+)?/);
  return m ? parseFloat(m[0].replace(/,/g, "")) : null;
}
function getIds() {
  const p = new URLSearchParams(window.location.search);
  return (p.get("ids") || "").split(",").filter(Boolean).slice(0, 3);
}
function setIds(ids) {
  const u = new URL(window.location.href);
  ids.length
    ? u.searchParams.set("ids", ids.join(","))
    : u.searchParams.delete("ids");
  history.replaceState(null, "", u.toString());
}
function populateSelect(currentIds) {
  const sel = document.getElementById("product-select");
  sel.innerHTML = '<option value="">— Select product —</option>';
  ZEVO_PRODUCTS.forEach((p) => {
    if (currentIds.includes(p.id)) return;
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.categoryLabel + " — " + p.name;
    sel.appendChild(o);
  });
}
function getAllSpecKeys(products) {
  const k = new Set();
  products.forEach((p) => Object.keys(p.specs).forEach((key) => k.add(key)));
  return Array.from(k);
}
function getBetterIndices(key, values) {
  let mode = null;
  for (const [k, m] of Object.entries(BETTER_MAP)) {
    if (key.toLowerCase().includes(k.toLowerCase())) {
      mode = m;
      break;
    }
  }
  if (!mode) return [];
  const nums = values.map((v) => extractNum(v));
  if (mode === "lower") {
    const min = Math.min(...nums.filter((n) => n !== null));
    return nums.map((n, i) => (n === min ? i : -1)).filter((i) => i >= 0);
  }
  const max = Math.max(...nums.filter((n) => n !== null));
  return nums.map((n, i) => (n === max ? i : -1)).filter((i) => i >= 0);
}
function render() {
  const ids = getIds();
  const products = ids.map((id) => getProduct(id)).filter(Boolean);
  populateSelect(ids);
  const emptyEl = document.getElementById("compare-empty");
  const contentEl = document.getElementById("compare-content");
  if (products.length === 0) {
    emptyEl.classList.remove("hidden");
    contentEl.classList.add("hidden");
    return;
  }
  emptyEl.classList.add("hidden");
  contentEl.classList.remove("hidden");
  const thead = document.querySelector("#compare-table thead tr");
  while (thead.children.length > 1) thead.removeChild(thead.lastChild);
  products.forEach((p) => {
    const th = document.createElement("th");
    th.className =
      "compare-col-header bg-z-surface px-5 py-5 text-left align-top";
    th.innerHTML = `<div class="flex flex-col gap-3"><div class="relative"><a href="product.html?id=${p.id}" class="block"><img src="${p.images[0]}" alt="${p.name}" class="w-28 h-28 object-cover rounded-xl border border-subtle" loading="lazy" width="112" height="112"></a><button class="remove-btn absolute -top-2 -right-2 w-7 h-7 rounded-full bg-z-elevated border border-subtle flex items-center justify-center hover:border-red-500 hover:text-red-500 text-z-muted transition-colors cursor-pointer" data-id="${p.id}" aria-label="Remove ${p.name}"><i class="fa-solid fa-xmark text-xs pointer-events-none"></i></button></div><div><p class="font-mono text-[10px] uppercase tracking-[0.1em] text-z-muted mb-0.5">${p.categoryLabel}</p><a href="product.html?id=${p.id}" class="font-heading font-bold text-sm text-z-text hover:text-accent transition-colors leading-tight block">${p.name}</a><p class="font-mono text-base text-[var(--c-accent-text)] font-medium mt-1">${formatPrice(p.price)}</p>${p.oldPrice ? `<p class="font-mono text-xs text-z-muted line-through">${formatPrice(p.oldPrice)}</p>` : ""}</div><button class="add-to-cart w-full bg-accent text-[#0A0A0A] font-semibold text-xs py-2.5 rounded-xl hover:bg-yellow-300 transition-colors cursor-pointer" data-id="${p.id}">Add to Cart</button></div>`;
    thead.appendChild(th);
  });
  const tbody = document.getElementById("compare-tbody");
  tbody.innerHTML = "";
  // Rating row
  const rr = document.createElement("tr");
  rr.className = "bg-z-bg hover:bg-z-surface transition-colors";
  rr.innerHTML = `<td class="compare-label-col bg-z-bg font-mono text-xs uppercase tracking-[0.08em] text-z-muted px-5 py-4 border-b border-subtle">Rating</td>`;
  const rVals = products.map((p) => p.rating);
  const maxR = Math.max(...rVals);
  products.forEach((p) => {
    const td = document.createElement("td");
    td.className =
      "px-5 py-4 border-b border-subtle" +
      (p.rating === maxR ? " compare-better" : "");
    td.innerHTML = `<span class="font-mono text-sm">${p.rating}★</span><span class="text-z-muted font-mono text-xs ml-1">(${p.reviews.toLocaleString()})</span>`;
    rr.appendChild(td);
  });
  tbody.appendChild(rr);
  // Price row
  const pr = document.createElement("tr");
  pr.className = "bg-z-surface hover:bg-z-elevated transition-colors";
  pr.innerHTML = `<td class="compare-label-col bg-z-surface font-mono text-xs uppercase tracking-[0.08em] text-z-muted px-5 py-4 border-b border-subtle">Price</td>`;
  const pVals = products.map((p) => p.price);
  const minP = Math.min(...pVals);
  products.forEach((p) => {
    const td = document.createElement("td");
    td.className =
      "px-5 py-4 border-b border-subtle" +
      (p.price === minP ? " compare-better" : "");
    td.innerHTML = `<span class="font-mono text-sm font-medium">${formatPrice(p.price)}</span>`;
    pr.appendChild(td);
  });
  tbody.appendChild(pr);
  // Spec rows
  const specKeys = getAllSpecKeys(products);
  specKeys.forEach((key, rowIdx) => {
    const tr = document.createElement("tr");
    tr.className =
      (rowIdx % 2 === 0 ? "bg-z-bg" : "bg-z-surface") +
      " hover:bg-z-elevated transition-colors";
    const lTd = document.createElement("td");
    lTd.className =
      "compare-label-col font-mono text-xs uppercase tracking-[0.08em] text-z-muted px-5 py-4 border-b border-subtle";
    lTd.textContent = key;
    tr.appendChild(lTd);
    const vals = products.map((p) => p.specs[key] || "—");
    const betterIdxs = getBetterIndices(key, vals);
    products.forEach((p, i) => {
      const td = document.createElement("td");
      const isBetter = betterIdxs.includes(i) && vals[i] !== "—";
      td.className =
        "px-5 py-4 border-b border-subtle text-sm font-body" +
        (isBetter ? " compare-better" : " text-z-text");
      td.textContent = vals[i];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
document.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (removeBtn) {
    const ids = getIds().filter((i) => i !== removeBtn.dataset.id);
    setIds(ids);
    render();
    Toast.show({
      title: "Removed",
      message: "Product removed from comparison.",
      type: "info",
    });
    return;
  }
  if (e.target.closest("#add-all-btn")) {
    const products = getIds()
      .map((id) => getProduct(id))
      .filter(Boolean);
    products.forEach((p) => Store.addToCart(p.id));
    Toast.show({
      title: "Added to Cart",
      message:
        products.length +
        " product" +
        (products.length > 1 ? "s" : "") +
        " added to your cart.",
      type: "success",
    });
    return;
  }
});
document.getElementById("add-product-btn").addEventListener("click", () => {
  const sel = document.getElementById("product-select");
  const id = sel.value;
  if (!id) {
    Toast.show({
      title: "Select a product",
      message: "Please choose a product from the dropdown.",
      type: "error",
    });
    return;
  }
  const ids = getIds();
  if (ids.length >= 3) {
    Toast.show({
      title: "Limit reached",
      message: "You can compare up to 3 products at once.",
      type: "error",
    });
    return;
  }
  if (!ids.includes(id)) {
    ids.push(id);
    setIds(ids);
    render();
  }
});
render();
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
