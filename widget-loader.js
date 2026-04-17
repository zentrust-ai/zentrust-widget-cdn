(function() {
  'use strict';

  // ============================================
  // ZENTRUST WIDGET LOADER v3.3
  // Premium polish: gradient toggle, subtle glow, refined hover
  // Same design language as widget.html interior
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
    var accentHover = '#' + theme.accentHover;
    var accentR = parseInt(theme.accent.substr(0,2), 16);
    var accentG = parseInt(theme.accent.substr(2,2), 16);
    var accentB = parseInt(theme.accent.substr(4,2), 16);
    var accentRgb = accentR + ',' + accentG + ',' + accentB;
    var toggleH = parseInt(theme.toggleSize) || 52;
    var toggleR = Math.round(toggleH / 2);
    var toggleLabel = theme.toggleLabel || 'Chat';

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
      + '&tourHoursLabel=' + encodeURIComponent(theme.tourHoursLabel || 'Mon\u2013Fri \u00b7 9 AM \u2013 5 PM')
      + '&tourStartHour=' + (theme.tourStartHour || 9)
      + '&tourEndHour=' + (theme.tourEndHour || 17)
      + '&tourDays=' + encodeURIComponent(theme.tourDays || '1,2,3,4,5')
      + (theme.bg ? '&bg=' + encodeURIComponent(theme.bg) : '')
      + (theme.surface ? '&surface=' + encodeURIComponent(theme.surface) : '')
      + (theme.headerBg ? '&headerBg=' + encodeURIComponent(theme.headerBg) : '')
      + (theme.text ? '&text=' + encodeURIComponent(theme.text) : '')
      + (theme.textSec ? '&textSec=' + encodeURIComponent(theme.textSec) : '');

    // Premium toggle with gradient + layered shadows + inner highlight
    var toggleBg = isLight
      ? 'linear-gradient(180deg,' + accentHover + ' 0%,' + accent + ' 100%)'
      : 'linear-gradient(180deg,#1a2236 0%,#131b2e 100%)';
    var toggleIconFill = isLight ? '#fff' : accent;
    var toggleText = isLight ? '#fff' : 'rgba(255,255,255,0.92)';

    var styleEl = document.createElement('style');
    styleEl.textContent = [
      '#zt-toggle {',
      '  position:fixed; bottom:24px; right:24px;',
      '  height:' + toggleH + 'px; padding:0 ' + Math.round(toggleH * 0.46) + 'px;',
      '  background:' + toggleBg + ';',
      '  border-radius:' + toggleR + 'px;',
      '  display:flex; align-items:center; justify-content:center; gap:10px;',
      '  cursor:pointer; z-index:2147483646;',
      '  box-shadow:',
      '    0 10px 30px rgba(' + accentRgb + ',' + (isLight ? '0.32' : '0.15') + '),',
      '    0 4px 12px rgba(0,0,0,' + (isLight ? '0.08' : '0.25') + '),',
      '    inset 0 1px 0 rgba(255,255,255,' + (isLight ? '0.28' : '0.08') + ');',
      '  transition: transform 0.35s cubic-bezier(.34,1.4,.64,1), box-shadow 0.3s ease, background 0.3s ease;',
      '  font-family:"Outfit",-apple-system,sans-serif;',
      '  font-size:' + Math.max(Math.round(toggleH * 0.26), 13) + 'px;',
      '  font-weight:500; letter-spacing:0.03em;',
      '  color:' + toggleText + '; border:none; outline:none;',
      '  position:fixed;',
      '  overflow:hidden;',
      '  isolation:isolate;',
      '}',
      // Subtle gradient glow layer
      '#zt-toggle::before {',
      '  content:""; position:absolute; inset:0;',
      '  background: radial-gradient(ellipse 100% 140% at 50% 0%, rgba(' + (isLight ? '255,255,255' : accentRgb) + ',' + (isLight ? '0.28' : '0.25') + ') 0%, transparent 60%);',
      '  pointer-events:none; z-index:0;',
      '}',
      // Accent line along bottom (dark mode only - accent glow hint)
      (!isLight ? '#zt-toggle::after {' +
      '  content:""; position:absolute; left:' + Math.round(toggleH * 0.3) + 'px; right:' + Math.round(toggleH * 0.3) + 'px; bottom:0;' +
      '  height:1px;' +
      '  background: linear-gradient(90deg, transparent 0%, rgba(' + accentRgb + ',0.5) 50%, transparent 100%);' +
      '  pointer-events:none; z-index:0;' +
      '}' : ''),
      '#zt-toggle:hover {',
      '  transform: translateY(-2px);',
      '  box-shadow:',
      '    0 14px 40px rgba(' + accentRgb + ',' + (isLight ? '0.42' : '0.25') + '),',
      '    0 6px 16px rgba(0,0,0,' + (isLight ? '0.12' : '0.3') + '),',
      '    inset 0 1px 0 rgba(255,255,255,' + (isLight ? '0.35' : '0.12') + ');',
      '}',
      '#zt-toggle:active {',
      '  transform: translateY(0);',
      '  transition-duration: 0.1s;',
      '}',
      '#zt-toggle svg {',
      '  width:' + Math.round(toggleH * 0.36) + 'px;',
      '  height:' + Math.round(toggleH * 0.36) + 'px;',
      '  flex-shrink:0; position:relative; z-index:1;',
      '}',
      '#zt-toggle .zt-icon-chat { fill:' + toggleIconFill + '; }',
      '#zt-toggle .zt-icon-close { fill:' + toggleIconFill + '; display:none; }',
      '#zt-toggle .zt-label {',
      '  color:' + toggleText + ';',
      '  position:relative; z-index:1;',
      '  white-space:nowrap;',
      '}',
      '#zt-toggle.zt-open {',
      '  width:' + toggleH + 'px; padding:0; border-radius:50%;',
      '}',
      '#zt-toggle.zt-open .zt-icon-chat, #zt-toggle.zt-open .zt-label { display:none; }',
      '#zt-toggle.zt-open .zt-icon-close { display:block; }',
      '',
      // Frame with refined shadow
      '#zt-frame {',
      '  position:fixed; bottom:' + (toggleH + 44) + 'px; right:24px;',
      '  width:400px; height:590px;',
      '  border:none; border-radius:18px;',
      '  z-index:2147483645;',
      '  box-shadow:',
      '    0 24px 60px rgba(0,0,0,' + (isLight ? '0.18' : '0.45') + '),',
      '    0 8px 24px rgba(0,0,0,' + (isLight ? '0.08' : '0.25') + ');',
      '  display:none; opacity:0; transform:translateY(16px) scale(0.97);',
      '  transition: opacity 0.32s cubic-bezier(.22,1,.36,1), transform 0.32s cubic-bezier(.22,1,.36,1);',
      '  background:' + frameBg + ';',
      '}',
      '#zt-frame.zt-show { display:block; }',
      '#zt-frame.zt-visible { opacity:1; transform:translateY(0) scale(1); }',
      '@media (max-width:480px) {',
      '  #zt-frame { width:calc(100% - 16px); height:calc(100% - 88px); bottom:' + (toggleH + 24) + 'px; right:8px; border-radius:16px; }',
      '  #zt-toggle { bottom:16px; right:16px; }',
      '}'
    ].join('\n');
    document.head.appendChild(styleEl);

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
        setTimeout(function() { frame.classList.remove('zt-show'); }, 320);
      }
    });

    // Listen for close from widget
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'zt-close') {
        isOpen = false;
        toggle.classList.remove('zt-open');
        frame.classList.remove('zt-visible');
        setTimeout(function() { frame.classList.remove('zt-show'); }, 320);
      }
    });
  }
})();
