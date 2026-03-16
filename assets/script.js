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
    { title: 'What Is Agentic AI and How Do You Use It Efficiently?', url: '/articles/agentic-ai-guide-2026.html', tags: 'agentic ai ai agent guide autonomous ai workflow efficient agent usage multi step tasks' },
    { title: 'How to Use OpenClaw Agent', url: '/articles/how-to-use-openclaw-agent.html', tags: 'openclaw agent openclaw workflow structured ai agent review loop tool permissions' },
    { title: 'How to Use Claude CoWork', url: '/articles/how-to-use-claude-cowork.html', tags: 'claude cowork claude collaboration claude workflow collaborative ai writing planning review' },
    { title: 'How to Use Perplexity Computer', url: '/articles/how-to-use-perplexity-computer.html', tags: 'perplexity computer perplexity research source backed ai citations research workflow compare tools' },
    { title: 'What Are MCP and Skills?', url: '/articles/mcp-and-skills-guide.html', tags: 'what is mcp model context protocol skills ai skills reusable workflow agent integrations tools' },
    { title: 'Best AI Writing Tools 2026', url: '/articles/best-ai-writing-tools-india.html', tags: 'ai writing chatgpt gemini notion copy tools free paid' },
    { title: 'ChatGPT vs Gemini — Full Comparison', url: '/articles/chatgpt-vs-gemini-india.html', tags: 'chatgpt gemini comparison review multilingual free ai chatbot' },
    { title: '5 Best Free AI Image Generators 2026', url: '/articles/free-ai-image-generators.html', tags: 'ai image generator free midjourney dall-e firefly ideogram canva art' },
    { title: 'How to Earn Money Using AI Tools', url: '/articles/earn-money-ai-tools-india.html', tags: 'earn money ai freelancing youtube affiliate content creation' },
    { title: 'Best AI Tools for UPSC Preparation', url: '/articles/best-ai-tools-upsc-preparation-india.html', tags: 'upsc ai tools students notes revision mains prelims answer writing' },
    { title: 'Best AI Resume Builders', url: '/articles/best-ai-resume-builders-india.html', tags: 'resume ai ats job fresher linkedin cv india' },
    { title: 'Best Free AI Video Generators', url: '/articles/free-ai-video-generators-india.html', tags: 'ai video reels shorts text to video creator free' },
    { title: 'AI Tools for Small Businesses', url: '/articles/ai-tools-for-small-business-india.html', tags: 'small business ai marketing support automation whatsapp leads' },
    { title: 'AI Tools for Freelancers', url: '/articles/ai-tools-for-freelancers-india.html', tags: 'freelancer ai proposals client delivery writing design india' },
    { title: 'AI Tools for Teachers', url: '/articles/ai-tools-for-teachers-india.html', tags: 'teachers education ai lesson plan worksheet quiz classroom' },
    { title: 'Best AI Voice Tools', url: '/articles/best-ai-voice-tools-india.html', tags: 'ai voice text to speech narration hindi creator audio' },
    { title: 'AI Side Hustle Roadmap', url: '/articles/ai-side-hustle-india-roadmap.html', tags: 'ai side hustle india roadmap freelancing income beginners' },
    { title: 'AI Tools for Ecommerce Sellers', url: '/articles/ai-tools-for-ecommerce-india.html', tags: 'ecommerce ai amazon flipkart listings ads product images' },
    { title: '35 ChatGPT Prompts for Students', url: '/articles/chatgpt-prompts-for-students-india.html', tags: 'chatgpt prompts students study revision exam assignment india' },
    { title: 'AI Tools for Content Creators', url: '/articles/ai-tools-for-content-creators-india.html', tags: 'content creator ai youtube instagram reels scripts workflow' },
    { title: 'Best AI SEO Tools for Beginners in 2026', url: '/articles/ai-seo-tools-beginners.html', tags: 'ai seo tools beginners surfer seo clearscope semrush ai keyword research content optimization free alternatives' },
    { title: 'AI Email Marketing Tools That Actually Work', url: '/articles/ai-email-marketing-tools.html', tags: 'ai email marketing mailchimp ai brevo subject lines open rates newsletter automation a/b testing campaigns' },
    { title: 'AI Social Media Tools: Schedule, Create & Grow', url: '/articles/ai-social-media-scheduling.html', tags: 'ai social media scheduling buffer ai hootsuite publer content creation calendar growth instagram linkedin x' },
    { title: 'AI Keyword Research Guide', url: '/articles/ai-keyword-research-guide.html', tags: 'keyword research ai seo chatgpt semrush ahrefs long-tail search intent content clusters' },
    { title: 'Build an AI Content Strategy from Scratch', url: '/articles/ai-content-strategy-2026.html', tags: 'ai content strategy topic clusters pillar page editorial calendar content gap repurposing content marketing' },
    { title: 'Best AI Ad Copy Generators', url: '/articles/ai-ad-copy-generators.html', tags: 'ai ad copy generator google ads meta ads copy.ai jasper adcreative anyword writesonic ppc a/b testing headlines' },
    { title: 'AI Landing Page Builders for Higher Conversions', url: '/articles/ai-landing-page-builders.html', tags: 'ai landing page builders unbounce ai framer ai 10web conversion rate optimization page design copy generation' },
    { title: 'How to Run AI Competitor Analysis in 30 Minutes', url: '/articles/ai-competitor-analysis-tools.html', tags: 'ai competitor analysis swot chatgpt semrush content gap pricing positioning social media tracking competitive intelligence' },
    { title: 'Complete AI Blog Writing Workflow', url: '/articles/ai-blog-writing-workflow.html', tags: 'ai blog writing workflow research outline draft edit seo publish chatgpt surfer seo grammarly content ops' },
    { title: 'AI Tools for YouTube SEO and Growth', url: '/articles/ai-youtube-seo-tools.html', tags: 'ai youtube seo tubebuddy vidiq thumbnails script generation channel growth titles descriptions video optimization' },
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
