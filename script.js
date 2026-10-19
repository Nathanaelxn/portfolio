/* ============================================================
   CONTENT: edit PROJECTS only; nothing else needs touching.
   Leave repo/demo as '' and no link is rendered.
   ============================================================ */
const PROJECTS = [
  {
    placeholder: true,
    title: '[ADD PROJECT TITLE]',
    category: '[ADD CATEGORY]',
    problem: '[ADD PROBLEM STATEMENT]',
    summary: '[ADD PROJECT DESCRIPTION]',
    approach: '[ADD APPROACH]',
    tech: ['[ADD TECHNOLOGIES]'],
    details: ['[ADD KEY IMPLEMENTATION DETAILS]'],
    results: '',                 // only add VERIFIED results
    repo: '',                    // e.g. 'https://github.com/Nathanaelxn/your-repo'
    demo: ''
  }
];
const RESUME_PATH = 'assets/resume.pdf';   // must match the file you add

(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
  const safeUrl = u => { try { const x = new URL(u); return x.protocol === 'https:' ? x.href : null; } catch { return null; } };
  const link = (label, url) => { const h = safeUrl(url); if (!h) return null; const a = el('a', 'btn', label); a.href = h; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };

  /* Theme */
  function initTheme() {
    const btn = $('#theme-btn'), root = document.documentElement; if (!btn) return;
    const paint = () => {
      const dark = root.dataset.theme !== 'light';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', String(!dark));
      const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? '#0B0F14' : '#F5F7F7';
    };
    btn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage blocked */ }
      paint();
    });
    paint();
  }

  /* Mobile menu */
  function initMenu() {
    const btn = $('#menu-btn'), list = $('#nav-links'); if (!btn || !list) return;
    const set = open => { list.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
    btn.addEventListener('click', () => set(!list.classList.contains('open')));
    list.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && list.classList.contains('open')) { set(false); btn.focus(); } });
  }

  /* Active nav + reveal */
  function initObservers() {
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(s => s.classList.add('in')); return; }
    const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(s => rev.observe(s));
    const act = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id) || a.removeAttribute('aria-current'));
    }), { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => act.observe(s));
    links.forEach(a => { a.addEventListener('click', () => {}); });
  }

  /* Projects + dialog */
  function initProjects() {
    const grid = $('#project-grid'), dlg = $('#project-dialog'); if (!grid || !dlg) return;
    let trigger = null;
    PROJECTS.forEach(p => {
      const card = el('article', 'card');
      card.append(el('p', 'cat', p.category), el('h3', '', p.title), el('p', '', p.summary));
      const tags = el('ul', 'tags'); p.tech.forEach(t => tags.append(el('li', '', t))); card.append(tags);
      const b = el('button', 'btn', 'View Details'); b.type = 'button';
      b.setAttribute('aria-haspopup', 'dialog');
      b.addEventListener('click', () => open(p, b));
      card.append(b);
      if (p.placeholder) card.append(el('p', 'note', 'Placeholder card: replace in script.js.'));
      grid.append(card);
    });
    function section(body, title, content) {
      if (!content || (Array.isArray(content) && !content.length)) return;
      body.append(el('h3', '', title));
      if (Array.isArray(content)) { const ul = el('ul'); content.forEach(c => ul.append(el('li', '', c))); body.append(ul); }
      else body.append(el('p', '', content));
    }
    function open(p, btn) {
      trigger = btn;
      $('#dlg-title').textContent = p.title;
      const body = $('#dlg-body'); body.replaceChildren();
      section(body, 'Overview', p.summary); section(body, 'Problem addressed', p.problem); section(body, 'Approach', p.approach);
      section(body, 'Technologies', p.tech); section(body, 'Key implementation details', p.details); section(body, 'Verified results', p.results);
      const row = el('div', 'cta-row');
      [link('Repository', p.repo), link('Live demo', p.demo)].forEach(a => a && row.append(a));
      if (row.children.length) body.append(row);
      document.body.classList.add('lock');
      typeof dlg.showModal === 'function' ? dlg.showModal() : dlg.setAttribute('open', '');
      $('#dlg-close').focus();
    }
    function close() { if (dlg.open) dlg.close(); }
    $('#dlg-close').addEventListener('click', close);
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });   // backdrop click
    dlg.addEventListener('close', () => { document.body.classList.remove('lock'); if (trigger) trigger.focus(); });
  }

  /* Copy email */
  function initCopy() {
    const btn = $('#copy-btn'), src = $('#email-text'), out = $('#copy-status'); if (!btn || !src || !out) return;
    const email = src.textContent.trim();
    const say = m => { out.textContent = m; };
    btn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
        else { const t = el('textarea'); t.value = email; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.append(t); t.select(); const ok = document.execCommand('copy'); t.remove(); if (!ok) throw new Error('copy failed'); }
        say('Email address copied to clipboard.');
      } catch (e) { say('Copy failed. Select the address above and copy it manually.'); }
    });
  }

  /* Resume: only offer download if the PDF actually exists */
  async function initResume() {
    const links = document.querySelectorAll('[data-resume]'); if (!links.length) return;
    let ok = false;
    try { const r = await fetch(RESUME_PATH, { method: 'HEAD' }); ok = r.ok; } catch (e) { ok = false; }
    links.forEach(a => {
      a.href = ok ? RESUME_PATH : '#contact';
      if (!ok) { a.removeAttribute('download'); a.setAttribute('aria-disabled', 'true'); a.textContent = 'Resume: [ADD RESUME PDF]'; a.title = 'Add assets/resume.pdf to enable'; a.addEventListener('click', e => e.preventDefault()); }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    [initTheme, initMenu, initObservers, initProjects, initCopy, initResume].forEach(f => { try { f(); } catch (e) { console.error(f.name, e); } });
  });
})();
