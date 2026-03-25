(function() {
  'use strict';

  // ============================================
  // ZENTRUST WIDGET LOADER v3.1
  // Supports light + dark themes, configurable toggle size
  // Dynamic booking labels and FAQ topics per venue/vendor
  // Usage: <script src=".../widget-loader.js" data-venue-id="grand_manor"></script>
  // ============================================

  var scriptTag = document.currentScript;
  var venueId = scriptTag ? scriptTag.getAttribute('data-venue-id') : '';
  var themeId = scriptTag ? (scriptTag.getAttribute('data-theme') || venueId) : venueId;
  var cdnBase = scriptTag ? scriptTag.src.replace(/\/[^\/]*$/, '') : 'https://zentrust-ai.github.io/zentrust-widget-cdn';

  // Load Outfit font
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap';
  document.head.appendChild(fontLink);

  // Load themes.js then initialize
  var ts = document.createElement('script');
  ts.src = cdnBase + '/themes.js';
  ts.onload = function() { init(window.ZT_THEMES || {}); };
  ts.onerror = function() { init({}); };
  document.head.appendChild(ts);

  function init(themes) {
    var theme = themes[themeId] || themes['_default'] || {
      accent: '3a9fb0', accentHover: '4dbbc9',
      venue: 'Venue Concierge', greet: "Hi! I'm Zeni. How can I help?", mode: 'dark'
    };

    var mode = theme.mode || 'dark';
    var isLight = mode === 'light';
    var accent = '#' + theme.accent;
    var toggleH = parseInt(theme.toggleSize) || 50;
    var toggleR = Math.round(toggleH / 2);
    var toggleLabel = theme.toggleLabel || 'Chat';

    // Toggle colors based on mode
    var toggleBg = isLight ? accent : '#131b2e';
    var toggleText = isLight ? '#fff' : 'rgba(255,255,255,0.7)';
    var toggleIconFill = isLight ? '#fff' : accent;
    var toggleShadow = isLight
      ? '0 4px 20px rgba(0,0,0,0.2)'
      : '0 4px 20px rgba(13,17,23,0.5)';
    var frameBg = isLight ? '#' + (theme.bg || 'faf8f6') : '#0d1117';

    // Build widget URL with ALL theme params
    var widgetUrl = cdnBase + '/widget.html'
      + '?venue_id=' + encodeURIComponent(venueId)
      + '&accent=' + encodeURIComponent(theme.accent)
      + '&accentHover=' + encodeURIComponent(theme.accentHover)
      + '&venue=' + encodeURIComponent(theme.venue)
      + '&greet=' + encodeURIComponent(theme.greet)
      + '&mode=' + encodeURIComponent(mode)
      + '&bookingLabel=' + encodeURIComponent(theme.bookingLabel || 'Tour')
      + '&entityLabel=' + encodeURIComponent(theme.entityLabel || 'venue')
      + (theme.faqTopics ? '&faqTopics=' + encodeURIComponent(JSON.stringify(theme.faqTopics)) : '')
      + (theme.bg ? '&bg=' + encodeURIComponent(theme.bg) : '')
      + (theme.surface ? '&surface=' + encodeURIComponent(theme.surface) : '')
      + (theme.headerBg ? '&headerBg=' + encodeURIComponent(theme.headerBg) : '')
      + (theme.text ? '&text=' + encodeURIComponent(theme.text) : '')
      + (theme.textSec ? '&textSec=' + encodeURIComponent(theme.textSec) : '');

    // Styles
    var style = document.createElement('style');
    style.textContent = [
      '#zt-toggle {',
      '  position:fixed; bottom:24px; right:24px; height:' + toggleH + 'px; padding:0 ' + Math.round(toggleH * 0.44) + 'px;',
      '  background:' + toggleBg + '; border-radius:' + toggleR + 'px;',
      '  display:flex; align-items:center; justify-content:center; gap:9px;',
      '  cursor:pointer; z-index:2147483646;',
      '  box-shadow:' + toggleShadow + ';',
      '  transition:all 0.3s cubic-bezier(.34,1.56,.64,1);',
      '  font-family:"Outfit",-apple-system,sans-serif;',
      '  font-size:' + Math.max(Math.round(toggleH * 0.24), 12) + 'px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;',
      '  color:' + toggleText + '; border:none; outline:none;',
      '}',
      '#zt-toggle:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,0.3); }',
      '#zt-toggle svg { width:' + Math.round(toggleH * 0.36) + 'px; height:' + Math.round(toggleH * 0.36) + 'px; flex-shrink:0; }',
      '#zt-toggle .zt-icon-chat { fill:' + toggleIconFill + '; }',
      '#zt-toggle .zt-icon-close { fill:' + toggleIconFill + '; display:none; }',
      '#zt-toggle .zt-label { color:' + toggleText + '; }',
      '#zt-toggle.zt-open { width:' + toggleH + 'px; padding:0; border-radius:50%; }',
      '#zt-toggle.zt-open .zt-icon-chat, #zt-toggle.zt-open .zt-label { display:none; }',
      '#zt-toggle.zt-open .zt-icon-close { display:block; }',
      '',
      '#zt-frame {',
      '  position:fixed; bottom:' + (toggleH + 40) + 'px; right:24px;',
      '  width:400px; height:590px;',
      '  border:none; border-radius:16px;',
      '  z-index:2147483645;',
      '  box-shadow:0 8px 40px rgba(0,0,0,' + (isLight ? '0.15' : '0.35') + ');',
      '  display:none; opacity:0; transform:translateY(16px) scale(0.97);',
      '  transition:opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1);',
      '  background:' + frameBg + ';',
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
      '<span class="zt-label">' + toggleLabel + '</span>' +
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
