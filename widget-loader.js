(function() {
  'use strict';

  // ============================================
  // ZENTRUST WIDGET LOADER v1.0
  // Embeds Zeni chat widget on any website via single script tag.
  // Usage: <script src="https://zentrust-ai.github.io/zentrust-widget-cdn/widget-loader.js" data-venue-id="grand_manor"></script>
  // ============================================

  // Read config from script tag
  var scriptTag = document.currentScript;
  var venueId = scriptTag ? scriptTag.getAttribute('data-venue-id') : 'grand_manor';
  var cdnBase = scriptTag ? scriptTag.src.replace(/\/[^\/]*$/, '') : 'https://zentrust-ai.github.io/zentrust-widget-cdn';

  // Widget iframe URL
  var widgetUrl = cdnBase + '/widget.html?venue_id=' + encodeURIComponent(venueId);

  // State
  var isOpen = false;

  // ============================================
  // STYLES (scoped with unique prefix)
  // ============================================
  var style = document.createElement('style');
  style.textContent = [
    '#zt-toggle {',
    '  position:fixed; bottom:24px; right:24px; height:50px; padding:0 22px;',
    '  background:#1c1411; border-radius:25px;',
    '  display:flex; align-items:center; justify-content:center; gap:9px;',
    '  cursor:pointer; z-index:2147483646;',
    '  box-shadow:0 4px 20px rgba(28,20,17,0.35), 0 1px 0 rgba(184,149,106,0.4) inset;',
    '  transition:all 0.3s cubic-bezier(.34,1.56,.64,1);',
    '  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
    '  font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;',
    '  color:#faf6f0; border:none; outline:none;',
    '}',
    '#zt-toggle:hover {',
    '  transform:translateY(-3px);',
    '  box-shadow:0 8px 28px rgba(28,20,17,0.45), 0 1px 0 rgba(184,149,106,0.4) inset;',
    '}',
    '#zt-toggle svg { width:18px; height:18px; flex-shrink:0; }',
    '#zt-toggle .zt-icon-chat { fill:#b8956a; }',
    '#zt-toggle .zt-icon-close { fill:#d4b896; display:none; }',
    '#zt-toggle .zt-label { color:#f0e9df; }',
    '#zt-toggle.zt-open { width:50px; padding:0; border-radius:50%; }',
    '#zt-toggle.zt-open .zt-icon-chat,',
    '#zt-toggle.zt-open .zt-label { display:none; }',
    '#zt-toggle.zt-open .zt-icon-close { display:block; }',
    '',
    '#zt-frame {',
    '  position:fixed; bottom:90px; right:24px;',
    '  width:400px; height:590px;',
    '  border:none; border-radius:20px;',
    '  z-index:2147483645;',
    '  box-shadow:0 8px 40px rgba(28,20,17,0.18);',
    '  display:none;',
    '  opacity:0; transform:translateY(16px) scale(0.97);',
    '  transition:opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1);',
    '  background:#fff;',
    '}',
    '#zt-frame.zt-show {',
    '  display:block;',
    '}',
    '#zt-frame.zt-visible {',
    '  opacity:1; transform:translateY(0) scale(1);',
    '}',
    '',
    '/* Mobile responsive */',
    '@media (max-width: 480px) {',
    '  #zt-frame {',
    '    width:calc(100% - 16px); height:calc(100% - 80px);',
    '    bottom:72px; right:8px;',
    '    border-radius:16px;',
    '  }',
    '  #zt-toggle { bottom:16px; right:16px; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ============================================
  // TOGGLE BUTTON
  // ============================================
  var toggle = document.createElement('button');
  toggle.id = 'zt-toggle';
  toggle.setAttribute('aria-label', 'Open chat');
  toggle.innerHTML = [
    '<svg class="zt-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    '<span class="zt-label">Chat</span>',
    '<svg class="zt-icon-close" viewBox="0 0 24 24"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>'
  ].join('');
  document.body.appendChild(toggle);

  // ============================================
  // IFRAME
  // ============================================
  var frame = document.createElement('iframe');
  frame.id = 'zt-frame';
  frame.setAttribute('title', 'Venue Concierge Chat');
  frame.setAttribute('allow', 'clipboard-write');
  frame.src = widgetUrl;
  document.body.appendChild(frame);

  // ============================================
  // TOGGLE LOGIC
  // ============================================
  toggle.addEventListener('click', function() {
    isOpen = !isOpen;
    toggle.classList.toggle('zt-open', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');

    if (isOpen) {
      frame.classList.add('zt-show');
      // Trigger reflow then animate
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          frame.classList.add('zt-visible');
        });
      });
    } else {
      frame.classList.remove('zt-visible');
      // Wait for animation to finish before hiding
      setTimeout(function() {
        frame.classList.remove('zt-show');
      }, 300);
    }
  });

  // ============================================
  // LISTEN FOR MESSAGES FROM WIDGET
  // (future use: widget can request close, etc.)
  // ============================================
  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.type) return;
    if (e.data.type === 'zt-close') {
      isOpen = false;
      toggle.classList.remove('zt-open');
      frame.classList.remove('zt-visible');
      setTimeout(function() { frame.classList.remove('zt-show'); }, 300);
    }
  });

})();
