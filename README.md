# Zentrust Widget CDN

**Public repository — contains ONLY client-side code. No secrets.**

## Architecture

```
Venue Website
  └── <script src="widget-loader.js" data-venue-id="grand_manor">
        ├── Creates toggle button (pill) on host page
        └── Creates iframe → widget.html?venue_id=grand_manor
              └── Full chat widget runs inside iframe
                    └── Sends messages to n8n webhook (server-side)
```

## Files

| File | Purpose |
|------|---------|
| `widget-loader.js` | Lightweight loader (~5KB). Injects toggle button + iframe onto host page. |
| `widget.html` | Full chat widget UI. Runs inside iframe, isolated from host site CSS/JS. |

## Embed on any website

Add this single line before `</body>`:

```html
<script src="https://zentrust-ai.github.io/zentrust-widget-cdn/widget-loader.js" data-venue-id="grand_manor"></script>
```

Replace `grand_manor` with the venue's `venue_id` from Supabase.

## Security

- **No API keys** in this repo. All secrets live in n8n credential store.
- **No business logic**. Widget only sends messages to webhook and renders responses.
- **iframe isolation**. Widget CSS/JS cannot access or modify the host page.
- **Separate from zentrust.net repo**. Landing page and widget CDN are independent deployments.
- **Read-only from venue perspective**. Venues embed a script tag — they never have access to modify widget source.

## Updating the widget

1. Edit `widget.html` or `widget-loader.js`
2. Commit and push to `main`
3. GitHub Pages deploys automatically
4. All venue sites load the updated widget on next page load — no re-embedding required

## Configuration via data attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-venue-id` | Yes | `grand_manor` | Venue identifier matching Supabase `venues.venue_id` |
