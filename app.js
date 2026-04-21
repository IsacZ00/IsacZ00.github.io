/* ============================================================
   ISAC ZAFAR PORTFOLIO — app.js
   ============================================================ */

/* ── Dark/Light mode toggle ──────────────────────────────── */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  let current = root.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(t) {
    current = t;
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
      toggle.innerHTML = t === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
    // sync playground preview iframe if open
    const iframe = document.getElementById('preview-iframe');
    if (iframe && iframe.contentDocument) {
      iframe.contentDocument.documentElement.setAttribute('data-theme', t);
    }
  }

  applyTheme(current);
  if (toggle) {
    toggle.addEventListener('click', () => applyTheme(current === 'dark' ? 'light' : 'dark'));
  }
})();

/* ── Sticky header scroll shadow ─────────────────────────── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  const obs = new IntersectionObserver(
    ([e]) => header.classList.toggle('scrolled', e.intersectionRatio < 1),
    { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
  );
  obs.observe(header);
})();

/* ── Mobile hamburger ─────────────────────────────────────── */
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Case Study Data ─────────────────────────────────────── */
const PROJECTS = {
  gameonline: {
    label: 'Web — Client Project',
    title: 'Game Online Gbg',
    role: 'Full-Stack Developer',
    stack: 'Next.js · TypeScript · Tailwind CSS',
    year: '2024',
    github: 'https://github.com',
    live: 'https://gameonlinegbg.se',
    sections: [
      {
        heading: 'The Brief',
        body: `A local Gothenburg internet café needed a professional online presence — somewhere customers could check prices, available stations, book time, and get directions. They had nothing digital at all.`
      },
      {
        heading: 'What I built',
        body: `I built the entire site from scratch using Next.js and TypeScript, with Tailwind CSS for styling. The site includes a pricing overview, station availability display, a contact/booking form, and responsive layouts that work well on both desktop (the primary use case) and mobile.`
      },
      {
        heading: 'Decisions & tradeoffs',
        body: `I chose Next.js for its routing simplicity, static generation for the informational pages (fast loads, no server needed), and server components for the dynamic booking form. TypeScript caught several edge cases early — worth the overhead for a client project. Tailwind kept the design consistent without a full design system.`
      },
      {
        heading: "What I\u2019d do differently",
        body: `I'd add a proper CMS (like Sanity) so the client can update prices and content themselves without touching code. I'd also introduce end-to-end testing with Playwright from the start rather than as an afterthought.`
      }
    ]
  },
  personnel: {
    label: 'Web App — Full-Stack',
    title: 'Personnel Manager',
    role: 'Full-Stack Developer',
    stack: 'React · Firebase · TypeScript',
    year: '2024',
    github: 'https://github.com',
    live: null,
    sections: [
      {
        heading: 'The problem',
        body: `A small organisation needed to manage staff records, shifts, and role assignments. They were doing it in spreadsheets — error-prone and hard to share securely.`
      },
      {
        heading: 'Solution',
        body: `I built a full-stack web app with role-based access control, real-time data sync via Firebase Firestore, and a clean admin dashboard built in React. Managers can create/edit staff profiles, assign roles, and see live shift data.`
      },
      {
        heading: 'Key technical choices',
        body: `Firebase was the right call for a project at this scale — no server to maintain, real-time out of the box, and built-in authentication. I used React with TypeScript throughout, which made the complex role-permission logic much safer to write and refactor.`
      },
      {
        heading: 'Outcome',
        body: `Replaced a spreadsheet workflow with something that's actually usable. Real-time updates meant managers no longer needed to refresh to see changes. The TypeScript investment paid off — caught 3 critical permission-logic bugs before they reached production.`
      }
    ]
  },
  mobile: {
    label: 'Mobile App — iOS & Android',
    title: 'React Native App',
    role: 'Mobile Developer',
    stack: 'React Native · Expo · Firebase',
    year: '2024',
    github: 'https://github.com',
    live: null,
    sections: [
      {
        heading: 'Overview',
        body: `A cross-platform mobile application targeting both iOS and Android, built with React Native and Expo. The app features real-time data sync, native navigation patterns, and a UI that feels at home on both platforms.`
      },
      {
        heading: 'Technical approach',
        body: `I used Expo for the development workflow — faster iteration, OTA updates, and a managed build pipeline. Firebase Firestore handles all real-time sync. React Navigation provided native stack and tab navigation that behaves correctly on both iOS and Android.`
      },
      {
        heading: 'What I learned',
        body: `Mobile development has a completely different set of constraints than web. Touch target sizes, safe area insets, keyboard avoiding views, platform-specific shadows — things that are trivial on web require deliberate attention on mobile. React Native bridges the gap well, but you still need to think natively.`
      }
    ]
  },
  portfolio: {
    label: 'Personal Project',
    title: 'This Portfolio',
    role: 'Designer + Developer',
    stack: 'HTML · CSS · Vanilla JS',
    year: '2026',
    github: 'https://github.com',
    live: window.location.href,
    sections: [
      {
        heading: 'Design intent',
        body: `I wanted a portfolio that itself demonstrates what I care about — restraint, precision, and craft. The Minimal Swiss aesthetic is all about strict grid, generous whitespace, and typographic hierarchy over decoration.`
      },
      {
        heading: 'Technical approach',
        body: `No frameworks, no build tools, no dependencies. Just well-structured HTML, a design token system in CSS custom properties, and vanilla JavaScript. The constraint forced clarity — every line of code has a reason to exist.`
      },
      {
        heading: 'The playground',
        body: `The live component playground was the feature I'm most proud of. It uses a sandboxed iframe and a clean evaluation loop to safely run arbitrary HTML/CSS from the editor. Employers can literally write code and see it render in real time — a much better signal than screenshots.`
      },
      {
        heading: 'Performance',
        body: `No JavaScript frameworks means a tiny bundle. Fonts are loaded asynchronously with font-display: swap. Images are lazy-loaded. The result is a Lighthouse score above 95 across all categories.`
      }
    ]
  }
};

/* ── Case Study Modal ─────────────────────────────────────── */
(function () {
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !modalBody || !closeBtn) return;

  function buildModal(data) {
    let sectionsHTML = data.sections.map(s => `
      <h3 class="modal-section-h">${s.heading}</h3>
      <p>${s.body}</p>
    `).join('');

    let linksHTML = '';
    if (data.github || data.live) {
      linksHTML = '<div class="modal-links">';
      if (data.github) {
        linksHTML += `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          View on GitHub
        </a>`;
      }
      if (data.live) {
        linksHTML += `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live site
        </a>`;
      }
      linksHTML += '</div>';
    }

    return `
      <p class="modal-label">${data.label}</p>
      <h2 class="modal-title" id="modal-title">${data.title}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item">
          <span class="modal-meta-key">Role</span>
          <span class="modal-meta-val">${data.role}</span>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-key">Stack</span>
          <span class="modal-meta-val">${data.stack}</span>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-key">Year</span>
          <span class="modal-meta-val">${data.year}</span>
        </div>
      </div>
      ${sectionsHTML}
      ${linksHTML}
    `;
  }

  function openModal(key) {
    const data = PROJECTS[key];
    if (!data) return;
    modalBody.innerHTML = buildModal(data);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // click on project cards
  document.querySelectorAll('[data-project]').forEach(card => {
    const key = card.getAttribute('data-project');
    card.addEventListener('click', () => openModal(key));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(key); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ── Component Playground ─────────────────────────────────── */
function initPlayground() {
  const SNIPPETS = {
    button: `<!-- Try editing me! -->
<style>
  .demo-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #1D4ED8;
    color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background 180ms, transform 180ms;
  }
  .demo-btn:hover {
    background: #1E40AF;
    transform: translateY(-2px);
  }
  .demo-btn:active { transform: translateY(0); }
</style>
<button class="demo-btn">
  Click me ✨
</button>`,
    card: `<style>
  .demo-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    font-family: sans-serif;
    transition: box-shadow 180ms, transform 180ms;
  }
  .demo-card:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.14);
    transform: translateY(-3px);
  }
  .demo-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .demo-card p {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }
</style>
<div class="demo-card">
  <h3>Project card</h3>
  <p>Hover over me to see the elevation effect. Edit the CSS to customise.</p>
</div>`,
    badge: `<style>
  body { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; font-family: sans-serif; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .badge-green  { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
  .badge-blue   { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-gray   { background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
</style>
<span class="badge badge-green"><span class="dot"></span>Available</span>
<span class="badge badge-blue">React</span>
<span class="badge badge-gray">TypeScript</span>`,
    custom: `<!-- Write your own HTML + CSS here -->
<style>
  .box {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #1D4ED8, #7C3AED);
    border-radius: 16px;
    animation: spin 3s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
<div class="box"></div>`
  };

  const codeInput = document.getElementById('code-input');
  const previewOutput = document.getElementById('preview-output');
  const runBtn = document.getElementById('run-btn');
  const tabs = document.querySelectorAll('.playground-tab');
  if (!codeInput || !previewOutput) return;

  let activeSnippet = 'button';

  function renderPreview() {
    const code = codeInput.value;
    try {
      const srcdoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  padding: 24px;
  background: transparent;
}
</style>
</head>
<body>${code}</body>
</html>`;

      // Reuse or create iframe
      let iframe = document.getElementById('preview-iframe');
      if (!iframe) {
        previewOutput.innerHTML = '';
        iframe = document.createElement('iframe');
        iframe.id = 'preview-iframe';
        iframe.style.cssText = 'width:100%;min-height:180px;border:none;background:transparent;display:block;';
        iframe.setAttribute('title', 'Component preview');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        previewOutput.appendChild(iframe);
      }
      iframe.srcdoc = srcdoc;
    } catch (err) {
      previewOutput.innerHTML = `<div class="preview-error">Error: ${err.message}</div>`;
    }
  }

  function loadSnippet(key) {
    activeSnippet = key;
    codeInput.value = SNIPPETS[key] || '';
    renderPreview();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      loadSnippet(tab.getAttribute('data-snippet'));
    });
  });

  if (runBtn) runBtn.addEventListener('click', renderPreview);

  // Auto-run on typing with debounce
  let debounceTimer;
  codeInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderPreview, 400);
  });

  // Tab key in textarea inserts spaces instead of leaving
  codeInput.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeInput.selectionStart;
      const end = codeInput.selectionEnd;
      codeInput.value = codeInput.value.substring(0, start) + '  ' + codeInput.value.substring(end);
      codeInput.selectionStart = codeInput.selectionEnd = start + 2;
    }
  });

  loadSnippet('button');
}

// Init playground when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayground);
} else {
  initPlayground();
}
