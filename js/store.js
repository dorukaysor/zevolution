/* ═══════════════════════════════════════════════════════════
   ZEVO Store — Cart & Wishlist State via localStorage
   Exposes window.Store and window.Toast
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const CART_KEY      = 'zevo_cart';
  const WISHLIST_KEY  = 'zevo_wishlist';

  /* ── Persistence helpers ─────────────────────────────── */
  function readCart()     { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }     catch { return []; } }
  function readWishlist() { try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; } }
  function writeCart(c)     { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
  function writeWishlist(w) { localStorage.setItem(WISHLIST_KEY, JSON.stringify(w)); }

  /* ── Internal event dispatch ─────────────────────────── */
  function dispatch(name, detail) {
    document.dispatchEvent(new CustomEvent('zevo:' + name, { detail }));
  }

  /* ══════════════════════════════════════════════════════
     CART API
  ══════════════════════════════════════════════════════ */
  const Cart = {

    /** Add product to cart (or increment qty if already in) */
    add(productId, opts = {}) {
      const product = window.getProduct(productId);
      if (!product) return;

      const cart = readCart();
      const key  = productId + (opts.color || '');
      const idx  = cart.findIndex(i => i.key === key);

      if (idx > -1) {
        cart[idx].qty += (opts.qty || 1);
      } else {
        cart.push({
          key,
          id:    product.id,
          name:  product.name,
          price: product.price,
          qty:   opts.qty || 1,
          color: opts.color || (product.colors[0] || ''),
          img:   product.images[0],
        });
      }

      writeCart(cart);
      dispatch('cart:updated', { cart });
      return cart;
    },

    /** Remove a line item by key */
    remove(key) {
      const cart = readCart().filter(i => i.key !== key);
      writeCart(cart);
      dispatch('cart:updated', { cart });
    },

    /** Update qty by delta (+1 / -1) — removes if qty reaches 0 */
    updateQty(key, delta) {
      const cart = readCart();
      const idx  = cart.findIndex(i => i.key === key);
      if (idx === -1) return;
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
      }
      writeCart(cart);
      dispatch('cart:updated', { cart });
    },

    /** Return all cart items */
    get() { return readCart(); },

    /** Total item count */
    count() {
      return readCart().reduce((s, i) => s + i.qty, 0);
    },

    /** Subtotal (numeric) */
    subtotal() {
      return readCart().reduce((s, i) => s + i.price * i.qty, 0);
    },

    /** Apply coupon → returns discount amount (0 if invalid) */
    applyCoupon(code) {
      if (code.trim().toUpperCase() === 'ZEVO10') {
        return this.subtotal() * 0.10;
      }
      return 0;
    },

    /** Shipping cost (free over Rs. 99) */
    shipping() {
      return this.subtotal() >= 99 ? 0 : 9.99;
    },

    /** Mock 10% tax */
    tax(discount = 0) {
      return (this.subtotal() - discount) * 0.10;
    },

    /** Grand total */
    total(discount = 0) {
      return this.subtotal() - discount + this.shipping() + this.tax(discount);
    },

    /** Wipe cart (call after order placed) */
    clear() {
      writeCart([]);
      dispatch('cart:updated', { cart: [] });
    },
  };

  /* ══════════════════════════════════════════════════════
     WISHLIST API
  ══════════════════════════════════════════════════════ */
  const Wishlist = {
    add(productId) {
      const list = readWishlist();
      if (!list.includes(productId)) {
        list.push(productId);
        writeWishlist(list);
        dispatch('wishlist:updated', { list });
      }
    },
    remove(productId) {
      const list = readWishlist().filter(id => id !== productId);
      writeWishlist(list);
      dispatch('wishlist:updated', { list });
    },
    toggle(productId) {
      if (this.has(productId)) this.remove(productId);
      else this.add(productId);
      return this.has(productId);
    },
    has(productId) { return readWishlist().includes(productId); },
    get()          { return readWishlist(); },
  };

  /* ── Public API ──────────────────────────────────────── */
  window.Store = {
    /* Cart */
    addToCart:     (id, opts) => Cart.add(id, opts),
    removeFromCart:(key)      => Cart.remove(key),
    updateQty:     (key, d)   => Cart.updateQty(key, d),
    getCart:       ()         => Cart.get(),
    getCartCount:  ()         => Cart.count(),
    getCartTotal:  ()         => Cart.subtotal(),
    applyCoupon:   (code)     => Cart.applyCoupon(code),
    getShipping:   ()         => Cart.shipping(),
    getTax:        (d)        => Cart.tax(d),
    getGrandTotal: (d)        => Cart.total(d),
    clearCart:     ()         => Cart.clear(),

    /* Wishlist */
    addToWishlist:    (id) => Wishlist.add(id),
    removeFromWishlist:(id)=> Wishlist.remove(id),
    toggleWishlist:   (id) => Wishlist.toggle(id),
    isWishlisted:     (id) => Wishlist.has(id),
    getWishlist:      ()   => Wishlist.get(),
  };

})();


/* ══════════════════════════════════════════════════════════
   TOAST SYSTEM
   window.Toast.show({ title, message, type })
   type: 'success' | 'error' | 'info' (default: 'success')
══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const icons = {
    success: `<i class="fa-solid fa-circle-check text-sm flex-shrink-0"></i>`,
    error:   `<i class="fa-solid fa-circle-xmark text-sm flex-shrink-0"></i>`,
    info:    `<i class="fa-solid fa-circle-info text-sm flex-shrink-0"></i>`,
  };

  const colors = {
    success: 'border-l-4 border-l-[var(--c-success)]',
    error:   'border-l-4 border-l-[#EF4444]',
    info:    'border-l-4 border-l-[#60A5FA]',
  };

  window.Toast = {
    show({ title, message, type = 'success', duration = 3000 } = {}) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const el = document.createElement('div');
      el.className = [
        'premium-toast toast-enter',
        'flex items-start gap-3 min-w-[300px] max-w-sm px-4 py-3.5',
        colors[type] || colors.success,
      ].join(' ');

      const progressColor = type === 'success' ? 'var(--c-success)' : type === 'error' ? '#EF4444' : '#60A5FA';

      el.innerHTML = `
        <span class="${type === 'success' ? 'text-[var(--c-success)]' : type === 'error' ? 'text-[#EF4444]' : 'text-[#60A5FA]'} mt-0.5">
          ${icons[type] || icons.success}
        </span>
        <div class="flex-1 min-w-0 pb-1">
          ${title ? `<p class="font-body font-semibold text-sm text-z-text">${title}</p>` : ''}
          ${message ? `<p class="font-body text-xs text-z-muted mt-0.5 leading-relaxed">${message}</p>` : ''}
        </div>
        <button class="toast-close flex-shrink-0 text-z-muted hover:text-z-text cursor-pointer ml-1" aria-label="Dismiss">
          <i class="fa-solid fa-xmark text-xs"></i>
        </button>
        <div class="toast-progress-bar" style="animation-duration: ${duration}ms; background-color: ${progressColor}"></div>
      `;

      container.appendChild(el);

      const dismiss = () => {
        if (el.classList.contains('toast-exit')) return;
        el.classList.remove('toast-enter');
        el.classList.add('toast-exit');
        el.addEventListener('animationend', () => el.remove(), { once: true });
      };

      el.querySelector('.toast-close').addEventListener('click', dismiss);

      setTimeout(dismiss, duration);
    },
  };
})();
