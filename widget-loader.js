(function() {
  'use strict';

  // ============================================
  // ZENTRUST WIDGET LOADER v2.0
  // One script tag embeds Zeni on any venue site.
  // Usage: <script src=".../widget-loader.js" data-venue-id="grand_manor"></script>
  // ============================================

  var scriptTag = document.currentScript;
  var venueId = scriptTag ? scriptTag.getAttribute('data-venue-id') : '';
  var cdnBase = scriptTag ? scriptTag.src.replace(/\/[^\/]*$/, '') : 'https://zentrust-ai.github.io/zentrust-widget-cdn';

  // Load Outfit font
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@500&display=swap';
  document.head.appendChild(fontLink);

  // Load themes.js then initialize
  var ts = document.createElement('script');
  ts.src = cdnBase + '/themes.js';
  ts.onload = function() { init(window.ZT_THEMES || {}); };
  ts.onerror = function() { init({}); };
  document.head.appendChild(ts);

  function init(themes) {
    var theme = themes[venueId] || themes['_default'] || {
      accent: 'd6336c', accentHover: 'e8457a',
      venue: 'Venue Concierge', greet: "Hi! I'm Zeni. How can I help?"
    };

    var accent = '#' + theme.accent;

    // Widget URL with theme params
    var widgetUrl = cdnBase + '/widget.html'
      + '?venue_id=' + encodeURIComponent(venueId)
      + '&accent=' + encodeURIComponent(theme.accent)
      + '&accentHover=' + encodeURIComponent(theme.accentHover)
      + '&venue=' + encodeURIComponent(theme.venue)
      + '&greet=' + encodeURIComponent(theme.greet);

    // Styles
    var style = document.createElement('style');
    style.textContent = [
      '#zt-toggle {',
      '  position:fixed; bottom:24px; right:24px; height:50px; padding:0 22px;',
      '  background:#1a1a2e; border-radius:25px;',
      '  display:flex; align-items:center; justify-content:center; gap:9px;',
      '  cursor:pointer; z-index:2147483646;',
      '  box-shadow:0 4px 20px rgba(26,26,46,0.4);',
      '  transition:all 0.3s cubic-bezier(.34,1.56,.64,1);',
      '  font-family:"Outfit",-apple-system,sans-serif;',
      '  font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;',
      '  color:rgba(255,255,255,0.85); border:none; outline:none;',
      '}',
      '#zt-toggle:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(26,26,46,0.5); }',
      '#zt-toggle svg { width:18px; height:18px; flex-shrink:0; }',
      '#zt-toggle .zt-icon-chat { fill:' + accent + '; }',
      '#zt-toggle .zt-icon-close { fill:' + accent + '; display:none; }',
      '#zt-toggle .zt-label { color:rgba(255,255,255,0.7); }',
      '#zt-toggle.zt-open { width:50px; padding:0; border-radius:50%; }',
      '#zt-toggle.zt-open .zt-icon-chat, #zt-toggle.zt-open .zt-label { display:none; }',
      '#zt-toggle.zt-open .zt-icon-close { display:block; }',
      '',
      '#zt-frame {',
      '  position:fixed; bottom:90px; right:24px;',
      '  width:400px; height:590px;',
      '  border:none; border-radius:16px;',
      '  z-index:2147483645;',
      '  box-shadow:0 8px 40px rgba(0,0,0,0.35);',
      '  display:none; opacity:0; transform:translateY(16px) scale(0.97);',
      '  transition:opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1);',
      '  background:#111116;',
      '}',
      '#zt-frame.zt-show { display:block; }',
      '#zt-frame.zt-visible { opacity:1; transform:translateY(0) scale(1); }',
      '@media (max-width:480px) {',
      '  #zt-frame { width:calc(100% - 16px); height:calc(100% - 80px); bottom:72px; right:8px; }',
      '  #zt-toggle { bottom:16px; right:16px; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);

    // Toggle button
    var toggle = document.createElement('button');
    toggle.id = 'zt-toggle';
    toggle.setAttribute('aria-label', 'Open chat');
    toggle.innerHTML =
      '<svg class="zt-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>' +
      '<span class="zt-label">Chat</span>' +
      '<svg class="zt-icon-close" viewBox="0 0 24 24"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>';
    document.body.appendChild(toggle);

    // Iframe
    var frame = document.createElement('iframe');
    frame.id = 'zt-frame';
    frame.setAttribute('title', 'Venue Concierge Chat');
    frame.setAttribute('allow', 'clipboard-write');
    frame.src = widgetUrl;
    document.body.appendChild(frame);

    // Toggle logic
    var isOpen = false;
    toggle.addEventListener('click', function() {
      isOpen = !isOpen;
      toggle.classList.toggle('zt-open', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');
      if (isOpen) {
        frame.classList.add('zt-show');
        requestAnimationFrame(function() {
          requestAnimationFrame(function() { frame.classList.add('zt-visible'); });
        });
      } else {
        frame.classList.remove('zt-visible');
        setTimeout(function() { frame.classList.remove('zt-show'); }, 300);
      }
    });

    // Listen for close from widget
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'zt-close') {
        isOpen = false;
        toggle.classList.remove('zt-open');
        frame.classList.remove('zt-visible');
        setTimeout(function() { frame.classList.remove('zt-show'); }, 300);
      }
    });
  }
})();
