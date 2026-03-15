// ZENTRUST WIDGET THEMES
// Add new venues here. That's it — no other files to change.
// Colors are hex WITHOUT the # prefix (passed via URL params)

var ZT_THEMES = {

  // Default — zentrust.net and any unrecognized venue_id
  "_default": {
    accent: "3a9fb0",
    accentHover: "4dbbc9",
    venue: "Venue Concierge",
    greet: "Hi! I'm Zeni, your Venue concierge. How can I help?"
  },

  // The Grand Manor — Melbourne, FL
  "grand_manor": {
    accent: "d4a853",
    accentHover: "e8c06a",
    venue: "The Grand Manor",
    greet: "Hi there! I'm Zeni, your Venue concierge for The Grand Manor. How can I help you today?"
  },

  // Zentrust landing page — cyan theme, demos Grand Manor bot
  "zentrust": {
    accent: "3a9fb0",
    accentHover: "4dbbc9",
    venue: "Venue Concierge",
    greet: "Hi! I'm Zeni, your Venue concierge. How can I help you today?"
  }

  // To add a new venue, copy the block above and change:
  //   "venue_id": {
  //     accent: "HEX_COLOR",        ← main accent (buttons, user messages)
  //     accentHover: "HEX_COLOR",   ← hover/lighter variant
  //     venue: "Display Name",      ← shown in chat header
  //     greet: "Greeting message"   ← first bot message
  //   }
};
