/*  Zentrust Widget – Venue Themes
    Each key is a data-theme value used in the embed snippet.
    widget-loader.js reads these to build the iframe URL + style the toggle.
*/
var defined_themes = {

  /* ── Grand Manor (Melbourne, FL) ── Light / Purple ── */
  grand_manor: {
    venue_id:    "grand_manor",
    venue:       "Venue Concierge",
    greet:       "Hi! I'm Zeni, your Venue Concierge for The Grand Manor. How can I help you today?",
    accent:      "8E7CA5",
    accentHover: "a08db8",
    mode:        "light",
    bg:          "faf8f6",
    surface:     "ffffff",
    headerBg:    "8E7CA5",
    text:        "3d3d3d",
    textSec:     "888888",
    toggleLabel: "Book a Tour"
  },

  /* ── Renaissance Catering (Melbourne, FL) ── Dark / Gold ── */
  renaissance_catering: {
    venue_id:    "renaissance_catering",
    venue:       "Catering Concierge",
    greet:       "Hi! I'm Zeni, your AI concierge for Renaissance Catering. How can I help you today?",
    accent:      "c9a84c",
    accentHover: "d4b95e",
    mode:        "dark",
    toggleLabel: "Book a Tasting"
  },

  /* ── Zentrust.net (Product Website) ── Dark / Teal ── */
  zentrust: {
    venue_id:    "",
    venue:       "Zentrust AI",
    greet:       "Hi! I'm Zeni. Want to see how our AI concierge works? Ask me anything!",
    accent:      "3a9fb0",
    accentHover: "4dbbc9",
    mode:        "dark",
    toggleLabel: "Chat with Zeni"
  }

};
