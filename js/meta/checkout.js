(function () {
  "use strict";

  /* ── Redirect if cart empty ──────────────────────────── */
  if (Store.getCartCount() === 0) {
    window.location.href = "cart.html";
  }

  /* ── State ───────────────────────────────────────────── */
  let currentStep = 1;
  let shippingData = {};
  let paymentData = {};

  /* ── Step indicator ──────────────────────────────────── */
  function updateStepUI(step) {
    currentStep = step;
    for (let i = 1; i <= 3; i++) {
      const circle = document.getElementById("s-circle-" + i);
      const label = document.getElementById("s-label-" + i);
      circle.className = "step-circle";
      label.className = "step-label";
      if (i < step) {
        circle.className += " done";
        label.className += " done";
        // Checkmark
        circle.innerHTML = `<i class="fa-solid fa-check text-xs"></i>`;
      } else if (i === step) {
        circle.className += " active";
        label.className += " active";
        circle.textContent = i;
      } else {
        circle.textContent = i;
      }
    }
    // Fill connector lines
    const fill1 = document.getElementById("s-fill-1");
    const fill2 = document.getElementById("s-fill-2");
    fill1.classList.toggle("filled", step > 1);
    fill2.classList.toggle("filled", step > 2);
  }

  function showStep(n) {
    [1, 2, 3].forEach((i) => {
      document.getElementById("step-" + i).classList.toggle("hidden", i !== n);
    });
    updateStepUI(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Sidebar render ──────────────────────────────────── */
  function renderSidebar() {
    const cart = Store.getCart();
    const itemsEl = document.getElementById("checkout-items");
    const subtotal = Store.getCartTotal();
    const shipping = Store.getShipping();
    const tax = Store.getTax(0);
    const grand = Store.getGrandTotal(0);

    itemsEl.innerHTML = cart
      .map(
        (item) => `
          <div class="flex gap-3 items-center">
            <img src="${item.img}" alt="${item.name}" class="w-12 h-14 rounded-lg object-cover flex-shrink-0 bg-z-elevated" loading="lazy">
            <div class="flex-1 min-w-0">
              <p class="font-body text-xs font-medium text-z-text line-clamp-1">${item.name}</p>
              <p class="font-mono text-xs text-z-muted mt-0.5">Qty: ${item.qty}</p>
            </div>
            <span class="font-mono text-xs text-[var(--c-accent-text)] flex-shrink-0">${formatPrice(item.price * item.qty)}</span>
          </div>`,
      )
      .join("");

    const shippingEl = document.getElementById("co-shipping");
    document.getElementById("co-subtotal").textContent = formatPrice(subtotal);
    document.getElementById("co-tax").textContent = formatPrice(tax);
    document.getElementById("co-total").textContent = formatPrice(grand);
    if (shipping === 0) {
      shippingEl.textContent = "Free";
      shippingEl.className = "font-mono text-[var(--c-success)]";
    } else {
      shippingEl.textContent = formatPrice(shipping);
      shippingEl.className = "font-mono text-z-text";
    }
  }

  /* ── Validation helpers ──────────────────────────────── */
  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.remove("hidden");
    }
    const input = document.querySelector(
      '[id="' + id.replace("err-", "") + '"]',
    );
    if (input) input.classList.add("error");
  }
  function clearErrors(formEl) {
    formEl
      .querySelectorAll(".form-error")
      .forEach((e) => e.classList.add("hidden"));
    formEl
      .querySelectorAll(".form-input")
      .forEach((i) => i.classList.remove("error"));
  }
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /* ── Step 1 — Shipping form ──────────────────────────── */
  document
    .getElementById("shipping-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(this);
      let valid = true;

      const fields = [
        { id: "first-name", label: "First name" },
        { id: "last-name", label: "Last name" },
        { id: "phone", label: "Phone number" },
        { id: "address", label: "Street address" },
        { id: "city", label: "City" },
        { id: "state", label: "State" },
        { id: "zip", label: "ZIP code" },
      ];
      fields.forEach((f) => {
        const val = document.getElementById(f.id).value.trim();
        if (!val) {
          showError("err-" + f.id, f.label + " is required.");
          valid = false;
        }
      });

      const email = document.getElementById("email").value.trim();
      if (!email || !isEmail(email)) {
        showError("err-email", "A valid email is required.");
        valid = false;
      }

      if (!valid) return;

      shippingData = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        zip: document.getElementById("zip").value.trim(),
        country: document.getElementById("country").value,
      };
      showStep(2);
    });

  /* ── Step 2 — Payment form ───────────────────────────── */

  // Card number formatting: XXXX XXXX XXXX XXXX
  document.getElementById("card-number").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 16);
    this.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  // Expiry formatting: MM / YY
  document.getElementById("card-expiry").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
    this.value = v;
  });

  // CVV: digits only
  document.getElementById("card-cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 4);
  });

  document
    .getElementById("back-to-step1")
    .addEventListener("click", function () {
      showStep(1);
    });

  document
    .getElementById("payment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(this);
      let valid = true;

      const cardNum = document
        .getElementById("card-number")
        .value.replace(/\s/g, "");
      if (cardNum.length < 13 || cardNum.length > 16) {
        showError(
          "err-card-number",
          "Please enter a valid 13–16 digit card number.",
        );
        valid = false;
      }

      const expiry = document
        .getElementById("card-expiry")
        .value.replace(/\s/g, "");
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        showError("err-card-expiry", "Enter expiry as MM / YY.");
        valid = false;
      }

      const cvv = document.getElementById("card-cvv").value.trim();
      if (cvv.length < 3) {
        showError("err-card-cvv", "Enter a 3–4 digit CVV.");
        valid = false;
      }

      const cardName = document.getElementById("card-name").value.trim();
      if (!cardName) {
        showError("err-card-name", "Name on card is required.");
        valid = false;
      }

      if (!valid) return;

      paymentData = {
        cardNumber: document
          .getElementById("card-number")
          .value.replace(/\s/g, ""),
        last4: cardNum.slice(-4),
        expiry: document.getElementById("card-expiry").value.trim(),
        cardName: document.getElementById("card-name").value.trim(),
      };

      populateReview();
      showStep(3);
    });

  /* ── Step 3 — Populate review ────────────────────────── */
  function populateReview() {
    const countryNames = {
      US: "United States",
      CA: "Canada",
      GB: "United Kingdom",
      AU: "Australia",
      DE: "Germany",
      FR: "France",
      IN: "India",
    };
    const country = countryNames[shippingData.country] || shippingData.country;

    document.getElementById("review-shipping-content").innerHTML = `
          <div>
            <p class="review-label">Name</p>
            <p class="review-value">${shippingData.firstName} ${shippingData.lastName}</p>
          </div>
          <div>
            <p class="review-label">Email</p>
            <p class="review-value">${shippingData.email}</p>
          </div>
          <div class="col-span-2">
            <p class="review-label">Address</p>
            <p class="review-value">${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.zip}, ${country}</p>
          </div>
          <div>
            <p class="review-label">Phone</p>
            <p class="review-value">${shippingData.phone}</p>
          </div>`;

    document.getElementById("review-payment-content").innerHTML = `
          <div class="flex items-center gap-3">
            <i class="fa-regular fa-credit-card text-z-muted text-2xl"></i>
            <div>
              <p class="review-value font-mono">•••• •••• •••• ${paymentData.last4}</p>
              <p class="review-label mt-0.5">Expires ${paymentData.expiry} · ${paymentData.cardName}</p>
            </div>
          </div>`;

    const cart = Store.getCart();
    document.getElementById("review-items").innerHTML = cart
      .map(
        (item) => `
          <div class="flex gap-3 items-center">
            <img src="${item.img}" alt="${item.name}" class="w-12 h-14 rounded-lg object-cover flex-shrink-0 bg-z-elevated" loading="lazy">
            <div class="flex-1 min-w-0">
              <p class="font-body text-sm font-medium text-z-text line-clamp-1">${item.name}</p>
              <p class="font-mono text-xs text-z-muted mt-0.5">Qty: ${item.qty} · ${formatPrice(item.price)} each</p>
            </div>
            <span class="font-mono text-sm text-[var(--c-accent-text)] flex-shrink-0">${formatPrice(item.price * item.qty)}</span>
          </div>`,
      )
      .join("");
  }

  /* ── Edit links ──────────────────────────────────────── */
  document
    .getElementById("edit-shipping")
    .addEventListener("click", () => showStep(1));
  document
    .getElementById("edit-payment")
    .addEventListener("click", () => showStep(2));

  /* ── Place Order ─────────────────────────────────────── */
  document.getElementById("place-order").addEventListener("click", function () {
    const btn = this;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" style="width:18px;height:18px;border-width:2px;border-top-color:#0A0A0A;border-color:rgba(0,0,0,0.2);border-top-color:#0A0A0A;"></span> Processing...`;

    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 8).toUpperCase();
      const orderData = {
        id: orderId,
        shipping: shippingData,
        payment: {
          last4: paymentData.last4,
          expiry: paymentData.expiry,
          cardName: paymentData.cardName,
        },
        items: Store.getCart(),
        total: Store.getGrandTotal(0),
        date: new Date().toISOString(),
      };
      sessionStorage.setItem("zevo_order", JSON.stringify(orderData));
      Store.clearCart();
      window.location.href = "confirmation.html";
    }, 1400);
  });

  /* ── Init ────────────────────────────────────────────── */
  renderSidebar();
  showStep(1);
})();
