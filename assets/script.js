/* ═══════════════════════════════════════════════════════
   Vasriya — Script v2.0
   Mobile nav · Theme toggle · Search · Scroll-to-top
   Reading progress · Bottom nav · Cookie consent
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Mobile navigation toggle ───
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Dark / Light theme toggle ───
  var themeBtn = document.querySelector('.theme-toggle');
  var root = document.documentElement;
  var STORAGE_KEY = 'vasriya-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  var savedTheme = localStorage.getItem(STORAGE_KEY);
  applyTheme(savedTheme || getSystemTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ─── Client-side search ───
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');

  var searchIndex = [
    { title: 'Best AI Writing Tools for Indians 2026', url: '/articles/best-ai-writing-tools-india.html', tags: 'ai writing chatgpt gemini notion copy tools free paid india' },
    { title: 'ChatGPT vs Gemini for Indian Users', url: '/articles/chatgpt-vs-gemini-india.html', tags: 'chatgpt gemini comparison review hindi india free ai chatbot' },
    { title: '5 Best Free AI Image Generators 2026', url: '/articles/free-ai-image-generators.html', tags: 'ai image generator free midjourney dall-e firefly ideogram canva art' },
    { title: 'How to Earn Money Using AI Tools in India', url: '/articles/earn-money-ai-tools-india.html', tags: 'earn money ai freelancing youtube affiliate content creation india' },
    { title: 'AI Tools Directory', url: '/tools.html', tags: 'ai tools directory all chatgpt gemini midjourney claude' },
    { title: 'About Vasriya', url: '/about.html', tags: 'about vasriya mission vision founder story' },
    { title: 'Contact Us', url: '/contact.html', tags: 'contact email form business inquiry feedback' },
  ];

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      var matches = searchIndex.filter(function (item) {
        return item.title.toLowerCase().includes(query) || item.tags.includes(query);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item" style="color:var(--text-secondary)">No results found</div>';
      } else {
        searchResults.innerHTML = matches.map(function (item) {
          return '<a class="search-result-item" href="' + item.url + '">' + item.title + '</a>';
        }).join('');
      }
      searchResults.classList.add('active');
    });

    // Close search on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-bar')) {
        searchResults.classList.remove('active');
      }
    });

    // Close search on Escape
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        this.blur();
      }
    });
  }

  // ─── Scroll to top button ───
  var scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Reading progress bar ───
  var progressBar = document.querySelector('.reading-progress');

  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  }

  // ─── Bottom nav active state ───
  var bottomNavLinks = document.querySelectorAll('.bottom-nav a');
  var currentPath = window.location.pathname;

  bottomNavLinks.forEach(function (link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href === currentPath || (href === '/' && currentPath === '/index.html')) {
      link.classList.add('active');
    } else if (currentPath.startsWith('/articles') && href === '/articles.html') {
      link.classList.add('active');
    } else if (currentPath.startsWith('/tools') && href === '/tools.html') {
      link.classList.add('active');
    }
  });

  // ─── Table of Contents smooth scroll + active state ───
  var tocLinks = document.querySelectorAll('.toc a');

  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(targetId);
        if (target) {
          var headerHeight = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // ─── Cookie consent ───
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var COOKIE_KEY = 'vasriya-cookies';

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(function () {
        cookieBanner.classList.add('active');
      }, 1500);
    }

    cookieAccept.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      cookieBanner.classList.remove('active');
    });
  }

  // ─── Copy prompt buttons ───
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = this.getAttribute('data-copy') || this.previousElementSibling?.textContent;
      if (text) {
        navigator.clipboard.writeText(text.trim()).then(function () {
          btn.classList.add('copied');
          btn.textContent = '✓ Copied';
          setTimeout(function () {
            btn.classList.remove('copied');
            btn.textContent = '📋 Copy';
          }, 2000);
        });
      }
    });
  });

  // ─── Lazy loading (IntersectionObserver) ───
  if ('IntersectionObserver' in window) {
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
          }
          lazyObserver.unobserve(el);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('[data-src]').forEach(function (el) {
      lazyObserver.observe(el);
    });
  }

})();
