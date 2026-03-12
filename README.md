# Zentrust Widget CDN

**Public repository — contains ONLY client-side code. No secrets.**

## Architecture

```
Venue Website
  └── <script src="widget-loader.js" data-venue-id="grand_manor">
        ├── Loads themes.js → gets venue's colors + greeting
        ├── Creates toggle button with venue's accent color
        └── Creates iframe → widget.html?accent=d4a853&venue=The+Grand+Manor&...
              └── Reads colors from URL params
              └── Sets CSS variables dynamically
              └── One widget file serves ALL venues
```

## Files

| File | Purpose |
|------|---------|
| `widget-loader.js` | Tiny loader (~6KB). Injects toggle button + iframe. Reads themes.js for colors. |
| `widget.html` | Universal chat widget. Reads theme from URL params. ONE file for all venues. |
| `themes.js` | Color configs for all venues. Only file edited when adding a new venue. |
| `test-embed.html` | Local testing page. |

## Embed on any website

One line before `</body>`:

```html
<script src="https://zentrust-ai.github.io/zentrust-widget-cdn/widget-loader.js" data-venue-id="grand_manor"></script>
```

## Adding a new venue

Edit `themes.js` only:

```javascript
"new_venue_id": {
  accent: "HEX_WITHOUT_HASH",
  accentHover: "LIGHTER_HEX",
  venue: "Display Name",
  greet: "Greeting message"
}
```

No new files. No widget changes. Commit, push, done.

## Security

- No API keys in this repo
- No business logic — widget only sends messages to webhook
- iframe isolation — widget CSS/JS can't touch the host page
- Separate from zentrust.net repo
- Venues embed a read-only script tag

## Updating the widget

1. Edit `widget.html` or `widget-loader.js`
2. Push to main
3. GitHub Pages deploys automatically
4. ALL venue sites get the update on next page load
