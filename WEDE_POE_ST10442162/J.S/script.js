/* =====================================================================
   Brew & Bean Artisan Coffee — script.js (Part 3)
   Vanilla JavaScript (no framework needed). Each feature only runs if the
   elements it needs exist on the current page.
   Sections: 1 data · 2 helpers · 3 navigation · 4 animations · 5 accordion
   · 6 tabs · 7 modal · 8 lightbox (swipe) · 9 dynamic menu · 10 dynamic events
   · 11 opening hours · 12 map · 13 forms (validation, AJAX, responses)
   ===================================================================== */
(() => {
  'use strict';

  /* ---------- 1. DATA (powers the dynamically loaded content) ---------- */
  const SHOP = { email: 'hello@brewandbeancoffee.com', lat: -33.9249, lng: 18.4241 };
  const U = 'https://images.unsplash.com/photo-';
  const MENU = [
    { id: 1, name: 'Single-Origin Espresso', desc: 'Rich, balanced and ethically sourced.', price: 32, cat: 'coffee', tags: ['VG'], icon: '☕', img: U + '1510707577719-ae7c14805e3a', featured: true },
    { id: 2, name: 'Flat White', desc: 'Double espresso with silky steamed milk.', price: 38, cat: 'coffee', tags: ['V'], icon: '☕', img: U + '1570968915860-54d5c301fa9f', featured: true },
    { id: 3, name: 'Golden Honey Latte', desc: 'Espresso, steamed milk and local honey.', price: 45, cat: 'coffee', tags: ['V'], icon: '🍯', img: U + '1572449043416-55f4685c9bb7', featured: true },
    { id: 4, name: 'Cappuccino', desc: 'Equal parts espresso, milk and velvety foam.', price: 36, cat: 'coffee', tags: ['V'], icon: '☕' },
    { id: 5, name: 'Cold Brew', desc: 'Steeped for 18 hours and served over ice.', price: 42, cat: 'coffee', tags: ['VG'], icon: '🧊' },
    { id: 6, name: 'Rooibos Tea', desc: 'Fragrant South African herbal tea.', price: 28, cat: 'tea', tags: ['VG'], icon: '🍵', img: U + '1544787219-7f47ccb76574' },
    { id: 7, name: 'Spiced Chai Latte', desc: 'Black tea, warming spices and steamed milk.', price: 40, cat: 'tea', tags: ['V'], icon: '🫖' },
    { id: 8, name: 'Butter Croissant', desc: 'Flaky, buttery and baked fresh.', price: 30, cat: 'food', tags: ['V'], icon: '🥐', img: U + '1555507036-ab1f4038808a' },
    { id: 9, name: 'Garden Sandwich', desc: 'Fresh seasonal vegetables and herb spread.', price: 55, cat: 'food', tags: ['V', 'VG'], icon: '🥪', img: U + '1528735602780-2552fd46c7af' },
    { id: 10, name: 'Banana Bread', desc: 'Homemade, toasted and served with butter.', price: 34, cat: 'food', tags: ['V'], icon: '🍞' },
    { id: 11, name: 'Vegan Brownie', desc: 'Dark chocolate and roasted hazelnut.', price: 35, cat: 'food', tags: ['V', 'VG'], icon: '🍫' },
    { id: 12, name: 'Seasonal Special', desc: 'Ask our baristas what is brewing this season.', price: null, cat: 'seasonal', tags: [], icon: '✨', img: U + '1495474472287-4d71bcdd2085' }
  ];
  const EVENTS = [
    { id: 'e1', title: 'Single-Origin Coffee Tasting', date: '2026-09-18', time: '18:00', type: 'tasting', cap: 15, booked: 15, price: 250, desc: 'Explore flavour notes and brewing differences across our featured origins.' },
    { id: 'e2', title: 'Community Coffee Morning', date: '2026-10-10', time: '09:00', type: 'community', cap: 40, booked: 33, price: 0, desc: 'A relaxed morning for neighbours, remote workers and local professionals.' },
    { id: 'e3', title: 'Latte Art Workshop', date: '2026-11-07', time: '10:00', type: 'workshop', cap: 12, booked: 9, price: 350, desc: 'Learn the basics of milk steaming and pour your first latte-art pattern.' },
    { id: 'e4', title: 'Community Coffee Morning', date: '2026-11-21', time: '09:00', type: 'community', cap: 40, booked: 12, price: 0, desc: 'A relaxed morning for neighbours, remote workers and local professionals.' },
    { id: 'e5', title: 'Sustainability Talk', date: '2026-12-05', time: '17:30', type: 'talk', cap: 30, booked: 30, price: 0, desc: 'Discuss ethical sourcing and practical ways cafés and customers can reduce waste.' },
    { id: 'e6', title: 'Single-Origin Coffee Tasting', date: '2026-12-12', time: '18:00', type: 'tasting', cap: 15, booked: 6, price: 250, desc: 'Explore flavour notes and brewing differences across our featured origins.' },
    { id: 'e7', title: 'Home Brewing Masterclass', date: '2027-01-16', time: '10:00', type: 'workshop', cap: 10, booked: 2, price: 400, desc: 'Master pour-over, French press and AeroPress at home with our head barista.' }
  ];
  const BEANS = { guji: ['Ethiopian Guji 250g', 120, 8], house: ['House Blend 250g', 95, 60], kilo: ['House Blend 1kg', 420, 25] };
  const TYPE_LABEL = { tasting: 'Tasting', workshop: 'Workshop', community: 'Community', talk: 'Talk' };

  /* ---------- 2. HELPERS ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => 'R' + Number(n).toLocaleString('en-ZA').replace(/\s/g, ',');
  const debounce = (fn, ms = 200) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } }
  };
  /* Create DOM elements safely. Text is added with textContent, so user or
     data strings can never inject HTML (protects against XSS). */
  function el(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'dataset') Object.assign(n.dataset, v);
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    kids.flat().filter(Boolean).forEach(c => n.append(c));
    return n;
  }
  const clean = s => String(s).replace(/[<>]/g, '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim();
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parseDate = s => new Date(s + 'T00:00:00');
  const fmtDate = s => parseDate(s).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const toast = msg => { const t = el('div', { class: 'toast', role: 'status', text: msg }); document.body.append(t); setTimeout(() => t.remove(), 2600); };

  /* ---------- 3. NAVIGATION (mobile menu) ---------- */
  const menuBtn = $('.menu-btn'), nav = $('#site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('show');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }
  $$('[data-year]').forEach(n => (n.textContent = new Date().getFullYear()));

  /* ---------- 4. ANIMATIONS (scroll reveal) ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  } else reveals.forEach(r => r.classList.add('is-visible'));

  /* ---------- 5. ACCORDION ---------- */
  $$('.accordion').forEach(acc => {
    $$('.acc-btn', acc).forEach(btn => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        // only one panel open at a time
        $$('.acc-btn', acc).forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          document.getElementById(b.getAttribute('aria-controls')).style.maxHeight = null;
        });
        if (!open) { btn.setAttribute('aria-expanded', 'true'); panel.style.maxHeight = panel.scrollHeight + 'px'; }
      });
    });
  });

  /* ---------- 6. TABS (with arrow-key support) ---------- */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const select = tab => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]);
        if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length]);
      });
    });
  });

  /* ---------- 7. MODAL (focus trap, Esc to close) ---------- */
  let lastFocus = null;
  const modalOverlay = el('div', { class: 'overlay', id: 'modal-overlay' });
  const closeBtn = el('button', { class: 'modal-close', type: 'button', 'aria-label': 'Close dialog', text: '✕' });
  const modalBox = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title' });
  modalOverlay.append(modalBox);
  document.body.append(modalOverlay);
  function openModal(nodes, trigger) {
    lastFocus = trigger || document.activeElement;
    modalBox.replaceChildren(closeBtn, ...nodes);
    modalOverlay.classList.add('open');
    closeBtn.focus();
  }
  function closeModal() { modalOverlay.classList.remove('open'); lastFocus && lastFocus.focus(); }
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  modalOverlay.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = $$('a[href],button:not([disabled])', modalBox);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- 8. LIGHTBOX GALLERY (any [data-full] element · keyboard · swipe) ---------- */
  const triggers = $$('[data-full]');
  if (triggers.length) {
    // one entry per unique photo, so the same picture used twice on a page is not shown twice
    const photos = [];
    triggers.forEach(t => { if (!photos.some(p => p.full === t.dataset.full)) photos.push({ full: t.dataset.full, caption: t.dataset.caption || '' }); });
    let idx = 0, startX = 0, startY = 0, tracking = false;
    const lbImg = el('img', { alt: '', draggable: 'false' }), lbCap = el('figcaption');
    const multi = photos.length > 1;
    const lb = el('div', { class: 'overlay lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Image viewer' },
      el('button', { class: 'lb-btn', type: 'button', 'aria-label': 'Close image', text: '✕', onclick: () => close() }),
      multi ? el('button', { class: 'lb-btn lb-prev', type: 'button', 'aria-label': 'Previous image', text: '‹', onclick: () => show(idx - 1, -1) }) : null,
      multi ? el('button', { class: 'lb-btn lb-next', type: 'button', 'aria-label': 'Next image', text: '›', onclick: () => show(idx + 1, 1) }) : null,
      el('figure', {}, lbImg, lbCap));
    document.body.append(lb);
    // dir: 1 = moving forward, -1 = moving back (picks the slide-in direction)
    const show = (i, dir = 0) => {
      idx = (i + photos.length) % photos.length;
      const p = photos[idx];
      lbImg.src = p.full; lbImg.alt = p.caption;
      lbCap.textContent = multi ? `${p.caption} (${idx + 1}/${photos.length})` : p.caption;
      lbImg.classList.remove('from-left', 'from-right');
      if (dir) { void lbImg.offsetWidth; lbImg.classList.add(dir > 0 ? 'from-right' : 'from-left'); }
      if (multi) [photos[(idx + 1) % photos.length], photos[(idx - 1 + photos.length) % photos.length]].forEach(n => { new Image().src = n.full; });  // preload neighbours
    };
    const open = i => { lastFocus = document.activeElement; show(i); lb.classList.add('open'); document.body.classList.add('no-scroll'); $('.lb-btn', lb).focus(); };
    const close = () => { lb.classList.remove('open'); document.body.classList.remove('no-scroll'); lastFocus && lastFocus.focus(); };
    triggers.forEach(t => t.addEventListener('click', () => open(photos.findIndex(p => p.full === t.dataset.full))));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (multi && e.key === 'ArrowRight') show(idx + 1, 1);
      if (multi && e.key === 'ArrowLeft') show(idx - 1, -1);
    });
    /* Swipe on touch screens: left/right = next/previous, swipe down = close.
       Two-finger gestures (pinch-zoom) are ignored. */
    lb.addEventListener('touchstart', e => {
      tracking = e.touches.length === 1;
      if (tracking) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
    }, { passive: true });
    lb.addEventListener('touchend', e => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0], dx = t.clientX - startX, dy = t.clientY - startY;
      if (multi && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      else if (dy > 90 && dy > Math.abs(dx) * 1.5) close();
    }, { passive: true });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal(); });

  /* ---------- 9. DYNAMIC MENU (render + search + filter + sort + favourites) ---------- */
  const favs = new Set(store.get('bb-favs', []));
  function menuItemNode(item) {
    const photo = el('div', { class: 'menu-photo' });
    const fallback = () => photo.replaceChildren(el('span', { class: 'emoji', 'aria-hidden': 'true', text: item.icon }));
    if (item.img) {
      const img = el('img', { src: `${item.img}?auto=format&fit=crop&w=300&q=70`, alt: item.name, width: 90, height: 90, loading: 'lazy' });
      img.addEventListener('error', fallback);
      photo.append(img);
    } else fallback();
    const fav = el('button', { class: 'fav-btn', type: 'button', 'aria-pressed': favs.has(item.id), 'aria-label': `Favourite ${item.name}`, dataset: { id: item.id }, text: '♥' });
    return el('li', { class: 'menu-item fade-in' },
      el('div', { class: 'menu-card' }, photo,
        el('div', {}, el('h3', { text: item.name }), el('p', { text: item.desc }), item.tags.map(t => el('span', { class: 'tag', title: t === 'V' ? 'Vegetarian' : 'Vegan', text: t }))),
        el('div', { class: 'meta' }, el('div', { class: 'price', text: item.price === null ? 'Ask in store' : money(item.price) }), fav)));
  }
  const menuList = $('#menu-list');
  if (menuList) {
    const state = { q: '', cat: 'all', sort: 'default', diet: new Set() };
    const count = $('#result-count'), favCount = $('#fav-count');
    const apply = () => {
      let items = MENU.filter(i =>
        (state.cat === 'all' || i.cat === state.cat) &&
        [...state.diet].every(d => i.tags.includes(d)) &&
        (`${i.name} ${i.desc} ${i.cat} ${i.tags.join(' ')}`).toLowerCase().includes(state.q));
      const by = { 'price-asc': (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9), 'price-desc': (a, b) => (b.price ?? -1) - (a.price ?? -1), name: (a, b) => a.name.localeCompare(b.name) }[state.sort];
      if (by) items = [...items].sort(by);
      menuList.replaceChildren(...items.map(menuItemNode));
      if (!items.length) menuList.append(el('li', { class: 'empty', text: 'No items match your search. Try a different word or clear the filters.' }));
      count.textContent = `Showing ${items.length} of ${MENU.length} items`;
      favCount.textContent = `♥ ${favs.size} favourite${favs.size === 1 ? '' : 's'}`;
    };
    $('#menu-search').addEventListener('input', debounce(e => { state.q = clean(e.target.value).toLowerCase(); apply(); }));
    $('#menu-sort').addEventListener('change', e => { state.sort = e.target.value; apply(); });
    $$('.filters .filter').forEach(b => b.addEventListener('click', () => {
      state.cat = b.dataset.cat;
      $$('.filters .filter').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
      apply();
    }));
    $$('.diet input').forEach(c => c.addEventListener('change', () => { c.checked ? state.diet.add(c.value) : state.diet.delete(c.value); apply(); }));
    // event delegation: one listener handles every favourite button
    menuList.addEventListener('click', e => {
      const b = e.target.closest('.fav-btn'); if (!b) return;
      const id = Number(b.dataset.id);
      favs.has(id) ? favs.delete(id) : favs.add(id);
      b.setAttribute('aria-pressed', favs.has(id));
      store.set('bb-favs', [...favs]);
      favCount.textContent = `♥ ${favs.size} favourite${favs.size === 1 ? '' : 's'}`;
    });
    apply();
  }
  const featured = $('#featured-menu');
  if (featured) featured.replaceChildren(...MENU.filter(i => i.featured).map(menuItemNode));

  /* ---------- 10. DYNAMIC EVENTS (search + filter + modal) ---------- */
  const isPast = e => parseDate(e.date) < startOfToday();
  const spaces = e => e.cap - e.booked;
  const eventBadge = e => isPast(e) ? el('span', { class: 'badge past', text: 'Past event' }) : spaces(e) <= 0 ? el('span', { class: 'badge full', text: 'Fully booked' }) : el('span', { class: 'badge', text: `${spaces(e)} spaces left` });
  const dateBlock = e => { const d = parseDate(e.date); return el('div', { class: 'date' }, el('b', { text: d.getDate() }), d.toLocaleString('en-ZA', { month: 'short' }).toUpperCase().replace('.', '')); };
  function eventNode(e) {
    const btn = el('button', { class: 'btn btn-secondary btn-sm', type: 'button', text: 'View details' });
    btn.addEventListener('click', () => openModal([
      el('div', { class: 'eyebrow', text: TYPE_LABEL[e.type] }),
      el('h2', { id: 'modal-title', text: e.title }),
      el('p', { text: `${fmtDate(e.date)} at ${e.time}` }),
      el('p', { text: e.desc }),
      el('p', {}, el('strong', { text: 'Price: ' }), e.price ? `${money(e.price)} per person` : 'Free'),
      el('p', {}, eventBadge(e)),
      isPast(e) ? el('p', { text: 'This event has finished. Check back soon for the next one.' }) :
        el('a', { class: 'btn btn-primary', href: `enquiry.html?type=${e.type === 'workshop' || e.type === 'tasting' ? 'workshop' : 'catering'}&event=${e.id}#enquiry-form`, text: spaces(e) > 0 ? 'Enquire to book' : 'Join the waiting list' })
    ], btn));
    return el('article', { class: 'card event fade-in' }, dateBlock(e),
      el('div', {}, el('h3', { text: e.title }), el('p', { text: e.desc }), el('span', { class: 'tag', text: TYPE_LABEL[e.type] }), e.price ? el('span', { class: 'tag', text: money(e.price) }) : el('span', { class: 'tag', text: 'Free' }), el('div', {}, btn)),
      eventBadge(e));
  }
  const eventList = $('#event-list');
  if (eventList) {
    const state = { q: '', type: 'all', when: 'upcoming' };
    const count = $('#event-count');
    const apply = () => {
      const items = EVENTS.filter(e =>
        (state.when === 'all' || (state.when === 'past') === isPast(e)) &&
        (state.type === 'all' || e.type === state.type) &&
        `${e.title} ${e.desc} ${TYPE_LABEL[e.type]}`.toLowerCase().includes(state.q))
        .sort((a, b) => state.when === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
      eventList.replaceChildren(...items.map(eventNode));
      if (!items.length) eventList.append(el('p', { class: 'empty', text: 'No events match your search.' }));
      count.textContent = `${items.length} event${items.length === 1 ? '' : 's'} found`;
    };
    $('#event-search').addEventListener('input', debounce(e => { state.q = clean(e.target.value).toLowerCase(); apply(); }));
    $('#event-type').addEventListener('change', e => { state.type = e.target.value; apply(); });
    $$('.seg button').forEach(b => b.addEventListener('click', () => {
      state.when = b.dataset.when;
      $$('.seg button').forEach(x => x.setAttribute('aria-pressed', x === b));
      apply();
    }));
    apply();
  }
  const nextEvent = $('#next-event');
  if (nextEvent) {
    const e = EVENTS.filter(x => !isPast(x) && spaces(x) > 0).sort((a, b) => a.date.localeCompare(b.date))[0];
    if (e) nextEvent.replaceChildren(el('div', {}, el('div', { class: 'eyebrow', text: 'Next up' }), el('h3', { text: e.title }), el('p', { text: `${fmtDate(e.date)} · ${e.time} · ${spaces(e)} spaces left` })), el('a', { class: 'btn btn-primary', href: 'events.html', text: 'See all events' }));
  }

  /* ---------- 11. OPENING HOURS (Cape Town time, whatever the visitor's timezone) ---------- */
  const hoursNode = $$('[data-open-status]');
  if (hoursNode.length) {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Johannesburg', weekday: 'short', hour: 'numeric', hourCycle: 'h23', minute: 'numeric' }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const weekend = ['Sat', 'Sun'].includes(p.weekday), mins = +p.hour * 60 + +p.minute;
    const [o, c] = weekend ? [480, 960] : [420, 1020];
    const open = mins >= o && mins < c;
    hoursNode.forEach(n => { n.textContent = open ? '● Open now' : '○ Closed now'; n.classList.toggle('is-open', open); n.classList.toggle('is-closed', !open); });
  }

  /* ---------- 12. INTERACTIVE MAP (Leaflet + OpenStreetMap) ---------- */
  const mapBox = $('#map');
  if (mapBox) {
    const initMap = () => {
      if (!window.L) { mapBox.append(el('p', { class: 'map-fallback', text: 'The map could not load. Find us at 12 Roast Lane, Cape Town, 8001.' })); return; }
      const map = L.map(mapBox, { scrollWheelZoom: false }).setView([SHOP.lat, SHOP.lng], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      L.marker([SHOP.lat, SHOP.lng]).addTo(map).bindPopup(el('div', {}, el('strong', { text: 'Brew & Bean' }), el('br'), '12 Roast Lane, Cape Town')).openPopup();
      window.bbMap = map;
    };
    const loadLeaflet = () => {
      const v = '1.9.4', base = `https://cdnjs.cloudflare.com/ajax/libs/leaflet/${v}/leaflet`;
      document.head.append(el('link', { rel: 'stylesheet', href: base + '.min.css' }));
      const s = el('script', { src: base + '.min.js' }); s.onload = initMap; s.onerror = initMap; document.head.append(s);
    };
    // lazy-load: only fetch the map library when the map scrolls into view (page speed)
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); loadLeaflet(); } }, { rootMargin: '200px' });
      io.observe(mapBox);
    } else loadLeaflet();
    // location-based feature: distance from the visitor to the café (Haversine formula)
    const distBtn = $('#distance-btn'), distOut = $('#distance-out');
    distBtn && distBtn.addEventListener('click', () => {
      if (!navigator.geolocation) { distOut.textContent = 'Location is not supported by your browser.'; return; }
      distOut.textContent = 'Finding your location…';
      navigator.geolocation.getCurrentPosition(pos => {
        const R = 6371, rad = x => x * Math.PI / 180;
        const dLat = rad(SHOP.lat - pos.coords.latitude), dLng = rad(SHOP.lng - pos.coords.longitude);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(pos.coords.latitude)) * Math.cos(rad(SHOP.lat)) * Math.sin(dLng / 2) ** 2;
        const km = 2 * R * Math.asin(Math.sqrt(a));
        distOut.textContent = `You are about ${km < 1 ? Math.round(km * 1000) + ' m' : km.toFixed(1) + ' km'} from Brew & Bean (straight-line distance).`;
        if (window.bbMap && window.L) window.bbMap.fitBounds([[pos.coords.latitude, pos.coords.longitude], [SHOP.lat, SHOP.lng]], { padding: [40, 40] });
      }, () => { distOut.textContent = 'We could not get your location. Please allow location access and try again.'; }, { timeout: 8000 });
    });
  }

  /* ---------- 13. FORMS ---------- */
  const MESSAGES = {
    valueMissing: 'This field is required.',
    typeMismatch: 'Please enter a valid value (for example name@example.com).',
    tooShort: f => `Please enter at least ${f.minLength} characters (you have ${f.value.length}).`,
    tooLong: f => `Please keep this under ${f.maxLength} characters.`,
    rangeUnderflow: f => `The minimum is ${f.min}.`,
    rangeOverflow: f => `The maximum is ${f.max}.`,
    patternMismatch: f => f.dataset.patternMsg || 'Please match the requested format.'
  };
  /* Extra rules that HTML5 attributes cannot express */
  function customRules(f) {
    const v = f.value.trim();
    if (!v) return '';
    if (f.name === 'name' && !/^[\p{L}][\p{L}\s'’.-]{1,59}$/u.test(v)) return 'Use letters, spaces, apostrophes and hyphens only (2–60 characters).';
    if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Please enter a valid email address, e.g. name@example.com.';
    if (f.name === 'phone' && !/^(\+27|0)[1-8]\d{8}$/.test(v.replace(/[\s\-()]/g, ''))) return 'Enter a valid South African number, e.g. 021 123 4567 or +27 82 123 4567.';
    if (f.type === 'date') {
      const d = parseDate(v), max = new Date(); max.setFullYear(max.getFullYear() + 1);
      if (isNaN(d)) return 'Please enter a valid date.';
      if (d < startOfToday()) return 'Please choose today or a future date.';
      if (d > max) return 'Please choose a date within the next 12 months.';
    }
    return '';
  }
  function validateField(f) {
    if (!f.willValidate) return true;               // hidden / disabled fields are skipped
    f.setCustomValidity('');
    const custom = customRules(f);
    if (custom) f.setCustomValidity(custom);
    let msg = '';
    if (!f.checkValidity()) {
      const key = Object.keys(MESSAGES).find(k => f.validity[k]);
      const m = MESSAGES[key];
      msg = f.validity.customError ? f.validationMessage : typeof m === 'function' ? m(f) : m || f.validationMessage;
    }
    const err = document.getElementById(f.id + '-error');
    if (err) err.textContent = msg;
    f.setAttribute('aria-invalid', !!msg);
    f.classList.toggle('valid', !msg && f.value.trim() !== '');
    return !msg;
  }
  /* Show only the fields that apply to the chosen enquiry type */
  function syncConditional(form) {
    const t = form.elements.type && form.elements.type.value;
    $$('[data-show-for]', form).forEach(g => {
      const on = g.dataset.showFor.split(' ').includes(t);
      g.hidden = !on;
      $$('input,select,textarea', g).forEach(i => (i.disabled = !on));
    });
  }
  /* AJAX: send the form in the background with fetch() — no page reload */
  async function ajaxSubmit(form) {
    try {
      const r = await fetch(form.getAttribute('action') || '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() });
      return r.ok;
    } catch { return false; }
  }
  const ref = () => 'BB-' + isoDate(new Date()).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

  /* ---- Enquiry: process the validated input and build a response ---- */
  function enquiryResponse(d) {
    const guests = +d.guests, today = startOfToday();
    const rows = [], out = { ok: true, rows, notes: [] };
    if (d.type === 'catering') {
      const pkg = d.package === 'cart' ? { n: 'Barista cart & pastries', pp: 95 } : { n: 'Coffee & pastry box', pp: 65 };
      const date = parseDate(d.date), wk = [0, 6].includes(date.getDay());
      const notice = wk ? 7 : 3, earliest = new Date(today); earliest.setDate(today.getDate() + notice);
      rows.push(['Service', `Catering — ${pkg.n}`], ['Date', fmtDate(d.date)], ['Guests', guests]);
      if (guests < 10) { out.ok = false; out.title = 'Minimum of 10 guests for catering'; out.notes.push('For smaller groups, a private table booking or workshop may suit you better.'); return out; }
      if (date < earliest) { out.ok = false; out.title = 'We need a little more notice'; out.notes.push(`${wk ? 'Weekend' : 'Weekday'} catering needs ${notice} days’ notice. The earliest available date is ${fmtDate(isoDate(earliest))}.`); return out; }
      const sub = guests * pkg.pp, del = sub >= 2000 ? 0 : 150;
      rows.push(['Price per person', money(pkg.pp)], ['Delivery', del ? money(del) : 'Free'], ['Estimated total', money(sub + del)], ['Deposit to confirm (50%)', money((sub + del) / 2)]);
      out.title = 'Good news — we have availability'; out.notes.push('Your date is available. A 50% deposit confirms the booking.');
    } else if (d.type === 'private-event') {
      const date = parseDate(d.date); rows.push(['Service', 'Private event (after-hours)'], ['Date', fmtDate(d.date)], ['Guests', guests]);
      if (date.getDay() === 0) { out.ok = false; out.title = 'Sorry, we are closed on Sundays'; out.notes.push('Private events run Monday to Saturday, 17:30–21:00. Please choose another date.'); return out; }
      if (guests > 30) { out.ok = false; out.title = 'Above our venue capacity'; out.notes.push('The café holds up to 30 guests for private events. Contact us about catering at your own venue instead.'); return out; }
      const total = 3600 + guests * 55;
      rows.push(['Venue hire (3 hours, 17:30–21:00)', money(3600)], ['Drinks & bites', `${money(55)} × ${guests}`], ['Estimated total', money(total)]);
      out.title = 'Good news — your date is available'; out.notes.push('We will hold the date for 48 hours while you confirm.');
    } else if (d.type === 'workshop') {
      const ev = EVENTS.find(e => e.id === d.event);
      if (!ev) { out.ok = false; out.title = 'Please choose an event'; return out; }
      rows.push(['Event', ev.title], ['Date', `${fmtDate(ev.date)} at ${ev.time}`], ['Seats requested', guests], ['Seats left', Math.max(spaces(ev), 0)]);
      if (spaces(ev) <= 0) { out.ok = false; out.title = 'This event is fully booked'; out.notes.push('We have added you to the waiting list and will email you if a seat opens.'); return out; }
      if (guests > spaces(ev)) { out.ok = false; out.title = `Only ${spaces(ev)} seat${spaces(ev) === 1 ? '' : 's'} left`; out.notes.push('Please reduce the number of seats or choose another date.'); return out; }
      rows.push(['Price', ev.price ? `${money(ev.price)} × ${guests} = ${money(ev.price * guests)}` : 'Free']);
      out.title = 'Seats available — we will hold them for you'; out.notes.push('Your seats are held for 48 hours. Pay at the café or by EFT to confirm.');
    } else {
      const [name, price, stock] = BEANS[d.product], qty = +d.qty;
      rows.push(['Product', name], ['Quantity', qty], ['In stock', stock]);
      if (qty > stock) { out.ok = false; out.title = `We only have ${stock} in stock`; out.notes.push('Please lower the quantity, or ask us about the next roast date.'); return out; }
      const sub = price * qty, del = sub >= 500 ? 0 : 60;
      rows.push(['Subtotal', money(sub)], ['Courier delivery', del ? money(del) : 'Free'], ['Total', money(sub + del)]);
      out.title = 'In stock and ready to roast-to-order'; out.notes.push('Orders placed before 12:00 ship the next working day.');
    }
    return out;
  }
  function showResult(box, out, reference) {
    box.className = 'result fade-in' + (out.ok ? '' : ' bad'); box.hidden = false;
    const dl = el('dl', {}); out.rows.forEach(([k, v]) => dl.append(el('dt', { text: k }), el('dd', { text: String(v) })));
    box.replaceChildren(el('h3', { text: out.title }), dl, ...out.notes.map(n => el('p', { text: n })),
      reference ? el('p', {}, el('strong', { text: 'Reference: ' }), reference) : null);
    box.focus(); box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---- Contact: compile the validated input into an email ---- */
  function buildEmail(d) {
    const subject = `[Website – ${d.topic}] ${d.subject}`;
    const body = [`Name: ${d.name}`, `Email: ${d.email}`, d.phone ? `Phone: ${d.phone}` : null, `Message type: ${d.topic}`, '', d.message, '', `Sent from the Brew & Bean website on ${new Date().toLocaleString('en-ZA')}`].filter(x => x !== null).join('\n');
    return { to: SHOP.email, subject, body, href: `mailto:${SHOP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.slice(0, 1500))}` };
  }

  const forms = $$('form[data-validate]');
  forms.forEach(form => {
    form.noValidate = true;                          // we show our own friendly messages
    $$('input[type="date"]', form).forEach(i => { i.min = isoDate(startOfToday()); });
    $$('textarea[data-counter]', form).forEach(t => {
      const c = document.getElementById(t.id + '-count');
      const upd = () => { c.textContent = `${t.value.length}/${t.maxLength}`; };
      t.addEventListener('input', upd); upd();
    });
    form.addEventListener('focusout', e => { if (e.target.matches('input,select,textarea')) validateField(e.target); });
    form.addEventListener('input', e => { if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target); });
    if (form.elements.type) form.elements.type.addEventListener('change', () => syncConditional(form));

    form.addEventListener('submit', async ev => {
      ev.preventDefault();
      const status = $('.form-msg', form), btn = $('button[type="submit"]', form);
      const fields = $$('input,select,textarea', form).filter(f => f.type !== 'hidden' && !f.classList.contains('hp'));
      const bad = fields.filter(f => !validateField(f));
      if (bad.length) { status.textContent = `Please fix ${bad.length} field${bad.length > 1 ? 's' : ''} highlighted below.`; bad[0].focus(); return; }
      status.textContent = '';
      if ($('.hp', form) && $('.hp', form).value) return;              // honeypot: bots fill this in
      const data = Object.fromEntries(new FormData(form).entries());
      Object.keys(data).forEach(k => (data[k] = clean(data[k])));
      const label = btn.textContent; btn.disabled = true; btn.replaceChildren(el('span', { class: 'spinner', 'aria-hidden': 'true' }), 'Processing…');
      const delivered = await ajaxSubmit(form);
      btn.disabled = false; btn.textContent = label;
      const kind = form.dataset.validate, box = $('.result', form.parentElement);
      if (kind === 'enquiry') {
        const out = enquiryResponse(data);
        if (!delivered) out.notes.push('Note: your request could not be sent to our server from here, so please also email us at ' + SHOP.email + ' to confirm.');
        showResult(box, out, out.ok ? ref() : '');
      } else if (kind === 'contact') {
        const mail = buildEmail(data);
        box.className = 'result fade-in'; box.hidden = false;
        box.replaceChildren(el('h3', { text: 'Your email is ready to send' }),
          el('p', { text: delivered ? 'We received your message. You can also send it straight to our inbox:' : 'Check the details below, then send the email to our team:' }),
          el('p', {}, el('strong', { text: 'To: ' }), mail.to), el('p', {}, el('strong', { text: 'Subject: ' }), mail.subject),
          el('div', { class: 'email-preview', text: mail.body }),
          el('div', { class: 'btn-row' }, el('a', { class: 'btn btn-primary', href: mail.href, text: 'Send email' }),
            el('button', { class: 'btn btn-secondary', type: 'button', text: 'Copy message', onclick: () => { navigator.clipboard && navigator.clipboard.writeText(mail.body).then(() => toast('Message copied')); } })));
        box.focus();
      } else {
        status.textContent = delivered ? 'Thank you! You are subscribed.' : 'Thanks! Your sign-up is saved on this page, but could not reach our server.';
        form.reset();
      }
      if (kind !== 'newsletter') { fields.forEach(f => { f.classList.remove('valid'); }); }
    });
  });
  /* Pre-select the form from the link, e.g. enquiry.html?type=workshop&event=e3 */
  const enquiryForm = $('#enquiry-form');
  if (enquiryForm) {
    const evSel = enquiryForm.elements.event;
    EVENTS.filter(e => !isPast(e) && ['workshop', 'tasting'].includes(e.type)).forEach(e => evSel.append(el('option', { value: e.id, text: `${e.title} — ${fmtDate(e.date)}` })));
    const q = new URLSearchParams(location.search), t = q.get('type'), e = q.get('event');
    if (t && [...enquiryForm.elements.type.options].some(o => o.value === t)) enquiryForm.elements.type.value = t;
    if (e && [...evSel.options].some(o => o.value === e)) evSel.value = e;
    syncConditional(enquiryForm);
  }
})();
