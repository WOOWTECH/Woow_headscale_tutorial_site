// Progressive enhancement for the chapter sidebar:
// mobile disclosure navigation, current-section state, and smooth in-page links.
(function () {
  // UI 字串：其他語系的頁面由 generator 內嵌 <script id="ui-strings">；沒有就用 zh-TW 預設。
  let ui = { tocToggle: '目錄', tocExpand: '展開章節與本章目錄', tocCollapse: '收合章節與本章目錄' };
  const uiEl = document.getElementById('ui-strings');
  if (uiEl) {
    try { ui = Object.assign(ui, JSON.parse(uiEl.textContent)); } catch (e) { /* 保持預設 */ }
  }
  const sidebar = document.querySelector('.sidebar');
  const mobileQuery = window.matchMedia('(max-width: 960px)');

  if (sidebar) {
    const panels = sidebar.querySelectorAll('ol, .toc-in-chapter');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', ui.tocExpand);
    toggle.innerHTML = '<span>' + ui.tocToggle + '</span><i class="mdi mdi-chevron-down" aria-hidden="true"></i>';

    const firstHeading = sidebar.querySelector('h2');
    if (firstHeading) sidebar.insertBefore(toggle, firstHeading);

    const setCollapsed = (collapsed) => {
      sidebar.classList.toggle('is-collapsed', collapsed);
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? ui.tocExpand : ui.tocCollapse);
    };

    const applyMode = () => {
      sidebar.classList.toggle('is-collapsible', mobileQuery.matches);
      setCollapsed(mobileQuery.matches);
    };

    toggle.addEventListener('click', () => setCollapsed(!sidebar.classList.contains('is-collapsed')));
    panels.forEach((panel) => {
      panel.addEventListener('click', (event) => {
        if (mobileQuery.matches && event.target.closest('a')) setCollapsed(true);
      });
    });

    applyMode();
    mobileQuery.addEventListener('change', applyMode);
  }

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.toc-in-chapter a[href^="#"]');
  if (!sections.length || !links.length) return;

  const linkMap = new Map([...links].map((link) => [link.getAttribute('href').slice(1), link]));
  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible && linkMap.has(visible.target.id)) setActive(visible.target.id);
    },
    { rootMargin: '-15% 0px -72% 0px', threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
      history.replaceState(null, '', '#' + id);
      const heading = target.querySelector('h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      setActive(id);
    });
  });
})();
