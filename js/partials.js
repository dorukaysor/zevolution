/* ═══════════════════════════════════════════════════════════
   ZEVO Partials — Shared page behavior
   Loaded on every page after data.js and store.js
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     1. THEME — Initialize before DOMContentLoaded to
        avoid flash of wrong theme.
        HTML element has class="dark" by default.
  ══════════════════════════════════════════════════════ */
  function initTheme() {
    const html   = document.documentElement;
    const stored = localStorage.getItem('zevo-theme');
    // If user previously chose light, remove dark class
    if (stored === 'light') html.classList.remove('dark');
    else html.classList.add('dark');
  }
  initTheme();


  /* ══════════════════════════════════════════════════════
     2. PARTIAL LOADER — fetch nav.html & footer.html
  ══════════════════════════════════════════════════════ */
  async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Not found');
      el.innerHTML = await res.text();
    } catch (e) {
      console.warn('Could not load partial:', url);
    }
  }

  async function loadPartials() {
    // Detect root relative to current page (handles /web/ or deeper)
    const base = document.documentElement.dataset.base || 'partials/';
    
    // Load Preloader first and immediately prepend to document body
    try {
      const loaderRes = await fetch(base + 'preloader.html');
      if (loaderRes.ok) {
        const temp = document.createElement('div');
        temp.innerHTML = await loaderRes.text();
        const preloaderNode = temp.firstElementChild;
        const styleNode = temp.querySelector('style');
        
        if (preloaderNode) {
          document.body.insertBefore(preloaderNode, document.body.firstChild);
        }
        if (styleNode) {
          document.head.appendChild(styleNode);
        }
      }
    } catch (e) {
      console.warn('Could not load preloader:', e);
    }

    await Promise.all([
      loadPartial('#nav-placeholder', base + 'nav.html'),
      loadPartial('#footer-placeholder', base + 'footer.html'),
    ]);
    // Post-injection setup
    highlightActiveLink();
    hydrateBadge();
    initThemeToggle();
    initMobileMenu();
    initNavSearch();
    initNavScroll();
    initCartDrawer();
    initWishlistButtons();

    // Notify Lenis (and anything else) that partials are in the DOM
    document.dispatchEvent(new CustomEvent('zevo:partials:loaded'));

    // Hide preloader after setup is complete
    const preloader = document.getElementById('zevo-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('preloader-exit');
        document.body.classList.add('preloader-loaded');
        setTimeout(() => preloader.remove(), 700);
      }, 1200);
    }
  }


  /* ── Active nav link ─────────────────────────────────── */
  function highlightActiveLink() {
    const path  = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('text-z-text', '!text-z-text');
        a.classList.remove('text-z-muted');
      }
    });
  }


  /* ── Cart badge hydration ────────────────────────────── */
  function hydrateBadge() {
    updateBadge(Store.getCartCount());
  }

  function updateBadge(count) {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('badge-bounce');
      badge.addEventListener('animationend', () => badge.classList.remove('badge-bounce'), { once: true });
    } else {
      badge.classList.add('hidden');
    }
  }

  document.addEventListener('zevo:cart:updated', function(e) {
    updateBadge(Store.getCartCount());
    renderCartDrawer();
  });


  /* ── Theme toggle ────────────────────────────────────── */
  function initThemeToggle() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('#theme-toggle');
      if (!btn) return;
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('zevo-theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('zevo-theme', 'dark');
      }
    });
  }


  /* ── Mobile menu ─────────────────────────────────────── */
  function initMobileMenu() {
    function closeMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const nav  = document.getElementById('main-nav');
      const btn  = document.getElementById('mobile-menu-btn');
      if (!menu) return;
      menu.classList.remove('active');
      nav?.classList.remove('menu-open');
      btn?.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', function(e) {
      const btn  = e.target.closest('#mobile-menu-btn');
      const menu = document.getElementById('mobile-menu');
      const nav  = document.getElementById('main-nav');

      if (btn && menu && nav) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('active');
        if (!isOpen) {
          menu.classList.add('active');
          nav.classList.add('menu-open');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          closeMobileMenu();
        }
      } else if (!e.target.closest('#main-nav') && menu?.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }


  /* ── Nav search ──────────────────────────────────────── */
  function initNavSearch() {
    function goSearch(e) {
      if (e && e.key && e.key !== 'Enter') return;
      const q = (document.getElementById('nav-search') || document.getElementById('mobile-search'));
      if (!q) return;
      const val = q.value.trim();
      if (window.location.pathname.includes('shop.html')) {
        if (e && e.preventDefault) e.preventDefault();
        return;
      }
      if (val) window.location.href = 'shop.html?q=' + encodeURIComponent(val);
    }

    document.getElementById('search-btn')?.addEventListener('click', goSearch);
    document.getElementById('nav-search')?.addEventListener('keydown', goSearch);
    document.getElementById('mobile-search')?.addEventListener('keydown', goSearch);
  }


  /* ── Nav scroll behavior ─────────────────────────────── */
  function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 40) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* ══════════════════════════════════════════════════════
     3. CART DRAWER
  ══════════════════════════════════════════════════════ */
  function initCartDrawer() {
    // Open via cart icon
    document.addEventListener('click', function(e) {
      if (e.target.closest('#cart-btn')) openCartDrawer();
      if (e.target.closest('#cart-close')) closeCartDrawer();
      if (e.target.closest('#cart-overlay')) closeCartDrawer();
    });

    // Keyboard close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCartDrawer();
    });

    renderCartDrawer();
  }

  function openCartDrawer() {
    const drawer  = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.add('open');
    overlay?.classList.remove('hidden');
    requestAnimationFrame(() => overlay?.classList.add('active'));
    // Freeze page scroll while drawer is open (Lenis-aware)
    if (typeof window.lenisStop === 'function') window.lenisStop();
    else document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }

  function closeCartDrawer() {
    const drawer  = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    overlay?.classList.remove('active');
    setTimeout(() => overlay?.classList.add('hidden'), 380);
    // Resume Lenis scroll
    if (typeof window.lenisStart === 'function') window.lenisStart();
    else document.body.style.overflow = '';
  }

  function renderCartDrawer() {
    const itemsEl   = document.getElementById('cart-drawer-items');
    const footerEl  = document.getElementById('cart-drawer-footer');
    const countEl   = document.getElementById('cart-drawer-count');
    if (!itemsEl) return;

    const cart    = Store.getCart();
    const count   = Store.getCartCount();
    const subtotal = Store.getCartTotal();
    if (countEl) countEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
          <div class="w-16 h-16 rounded-full bg-z-elevated flex items-center justify-center">
            <i class="fa-solid fa-cart-shopping text-z-muted text-2xl"></i>
          </div>
          <p class="font-body font-semibold text-z-text">Your cart is empty</p>
          <p class="font-body text-sm text-z-muted">Add some products to get started</p>
          <a href="shop.html" class="mt-2 bg-accent text-[#0A0A0A] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-yellow-300 transition-colors cursor-pointer">Browse Shop</a>
        </div>`;
      if (footerEl) footerEl.innerHTML = '';
      return;
    }

    itemsEl.innerHTML = cart.map(item => `
      <div class="flex gap-3 items-start" data-key="${item.key}">
        <div class="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-z-elevated">
          <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-body font-medium text-sm text-z-text line-clamp-1">${item.name}</p>
          <p class="font-mono text-xs text-z-muted mt-0.5">${window.formatPrice(item.price)}</p>
          <!-- Qty stepper -->
          <div class="flex items-center gap-2 mt-2">
            <button class="cart-qty-btn w-6 h-6 flex items-center justify-center rounded bg-z-elevated text-z-text hover:border hover:border-accent transition-colors cursor-pointer text-sm font-mono"
              data-key="${item.key}" data-delta="-1" aria-label="Decrease quantity">−</button>
            <span class="font-mono text-sm text-z-text w-4 text-center">${item.qty}</span>
            <button class="cart-qty-btn w-6 h-6 flex items-center justify-center rounded bg-z-elevated text-z-text hover:border hover:border-accent transition-colors cursor-pointer text-sm font-mono"
              data-key="${item.key}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2 flex-shrink-0">
          <span class="font-mono text-sm text-[var(--c-accent-text)]">${window.formatPrice(item.price * item.qty)}</span>
          <button class="cart-remove w-7 h-7 flex items-center justify-center rounded text-z-muted hover:text-[#EF4444] transition-colors cursor-pointer"
            data-key="${item.key}" aria-label="Remove ${item.name}">
            <i class="fa-regular fa-trash-can text-xs pointer-events-none"></i>
          </button>
        </div>
      </div>`).join('');

    if (footerEl) {
      const shipping = Store.getShipping();
      footerEl.innerHTML = `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between font-body text-z-muted">
            <span>Subtotal</span><span class="font-mono text-z-text">${window.formatPrice(subtotal)}</span>
          </div>
          <div class="flex justify-between font-body text-z-muted">
            <span>Shipping</span>
            <span class="font-mono ${shipping === 0 ? 'text-[var(--c-success)]' : 'text-z-text'}">
              ${shipping === 0 ? 'Free' : window.formatPrice(shipping)}
            </span>
          </div>
          ${subtotal < 99 && shipping > 0 ? `<p class="text-xs text-z-muted">Add <span class="text-[var(--c-accent-text)] font-semibold">${window.formatPrice(99 - subtotal)}</span> more for free shipping</p>` : ''}
        </div>
        <a href="cart.html" class="block w-full bg-accent text-[#0A0A0A] font-body font-semibold py-3 rounded-xl text-center text-sm hover:bg-yellow-300 transition-colors cursor-pointer">
          View Cart & Checkout
        </a>
        <a href="shop.html" class="block text-center text-sm text-z-muted hover:text-z-text transition-colors cursor-pointer">Continue Shopping</a>`;
    }

    // Bind drawer events (qty + remove)
    itemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        Store.updateQty(this.dataset.key, parseInt(this.dataset.delta));
      });
    });
    itemsEl.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        Store.removeFromCart(this.dataset.key);
      });
    });
  }


  /* ══════════════════════════════════════════════════════
     4. ADD-TO-CART & WISHLIST BUTTONS (page-level)
  ══════════════════════════════════════════════════════ */
  function initWishlistButtons() {
    // Sync wishlist icon state on page load
    document.querySelectorAll('.wishlist-btn').forEach(syncWishlistIcon);
  }

  function syncWishlistIcon(btn) {
    const id = btn.dataset.id;
    const icon = btn.querySelector('.wishlist-icon');
    if (!icon) return;
    if (icon.tagName.toLowerCase() === 'i') {
      if (Store.isWishlisted(id)) {
        icon.className = 'fa-solid fa-heart wishlist-icon text-accent';
      } else {
        icon.className = 'fa-regular fa-heart wishlist-icon text-z-muted';
      }
    } else {
      if (Store.isWishlisted(id)) {
        icon.setAttribute('fill', '#FACC15');
        icon.setAttribute('stroke', '#FACC15');
      } else {
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
      }
    }
  }

  /* Fly to cart animation */
  window.animateFlyToCart = function(img) {
    const cartIcon = document.getElementById('cart-btn');
    if (!img || !cartIcon) return;

    // Create a clone of the image
    const clone = img.cloneNode(true);
    const rect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.top = rect.top + 'px';
    clone.style.left = rect.left + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.borderRadius = window.getComputedStyle(img).borderRadius || '16px';
    clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    clone.style.zIndex = '99999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'transform 0.8s cubic-bezier(0.45, 0, 0.15, 1), opacity 0.8s ease, width 0.8s ease, height 0.8s ease, border-radius 0.8s ease';

    document.body.appendChild(clone);

    // Calculate translation difference relative to original coordinate
    const xDiff = cartRect.left + (cartRect.width / 2) - (rect.left + (rect.width / 2));
    const yDiff = cartRect.top + (cartRect.height / 2) - (rect.top + (rect.height / 2));

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${xDiff}px, ${yDiff}px) scale(0.05)`;
      clone.style.opacity = '0';
      clone.style.borderRadius = '50%';
    });

    clone.addEventListener('transitionend', () => {
      clone.remove();
      // Jiggle the cart icon
      cartIcon.classList.add('animate-jiggle');
      setTimeout(() => {
        cartIcon.classList.remove('animate-jiggle');
      }, 500);
    });
  };

  // Global delegation for add-to-cart + wishlist
  document.addEventListener('click', function(e) {
    const cartBtn = e.target.closest('.add-to-cart');
    if (cartBtn) {
      e.stopPropagation();
      const id = cartBtn.dataset.id;
      Store.addToCart(id);

      // Trigger fly to cart animation
      let parent = cartBtn.parentElement;
      let img = null;
      while (parent && parent !== document.body) {
        img = parent.querySelector('img');
        if (img) break;
        parent = parent.parentElement;
      }
      if (img) {
        window.animateFlyToCart(img);
      }

      Toast.show({ title: 'Added to cart', message: window.getProduct(id)?.name, type: 'success' });
    }

    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
      e.stopPropagation();
      const id  = wishBtn.dataset.id;
      const now = Store.toggleWishlist(id);
      syncWishlistIcon(wishBtn);
      Toast.show({
        title:   now ? 'Added to wishlist' : 'Removed from wishlist',
        message: window.getProduct(id)?.name,
        type:    now ? 'success' : 'info',
      });
    }
  });


  /* ══════════════════════════════════════════════════════
     5. SCROLL REVEAL — IntersectionObserver
  ══════════════════════════════════════════════════════ */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal all immediately
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }


  /* ══════════════════════════════════════════════════════
     6. 3D CARD TILT
  ══════════════════════════════════════════════════════ */
  function initCardTilt() {
    document.querySelectorAll('.card-tilt').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) *  6;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    });
  }


  /* ══════════════════════════════════════════════════════
     7. PROGRESS BARS — animate on scroll into view
  ══════════════════════════════════════════════════════ */
  function initProgressBars() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.progress-bar').forEach(el => observer.observe(el));
  }

  /* ── Footer accordion ─────────────────────────────────── */
  window.toggleFooterCol = function(header) {
    if (window.innerWidth >= 768) return;
    const col = header.parentElement;
    const links = col.querySelector('.footer-links');
    const icon = header.querySelector('i');
    if (links) {
      const isOpen = links.classList.toggle('open');
      if (icon) {
        icon.style.transform = isOpen ? 'rotate(180deg)' : 'none';
      }
    }
  };


  /* ══════════════════════════════════════════════════════
     DOMContentLoaded bootstrap
     ══════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', async function () {
    await loadPartials();
    initScrollReveal();
    initCardTilt();
    initProgressBars();

    // Page fade-in
    document.body.classList.add('page-fade');
  });

})();
