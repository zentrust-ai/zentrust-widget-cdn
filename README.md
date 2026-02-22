# Zentrust Widget CDN

Chat widget asset for [Zentrust AI](https://zentrust.ai) venue concierge.

## Usage

Add this script tag before `</body>` on every page:

```html
<script src="https://zentrust-ai.github.io/zentrust-widget-cdn/zentrust-widget.js"></script>
```

## What It Does

- Injects a floating chat button (bottom-right corner)
- Opens an AI concierge that handles venue FAQs and tour booking
- Self-contained — loads its own styles and fonts, won't conflict with host site CSS/JS
- Mobile responsive

## Configuration

Venue name, greeting, and webhook URL are configured at the top of `zentrust-widget.js`.

## Hosting

Served via GitHub Pages from the `main` branch.

---

© 2026 Zentrust AI. All rights reserved.
