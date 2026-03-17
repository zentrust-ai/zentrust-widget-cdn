// ZENTRUST WIDGET THEMES
// Add new venues here. That's it — no other files to change.
// Colors are hex WITHOUT the # prefix (passed via URL params)
// mode: "dark" (default) or "light"

var ZT_THEMES = {

  // Default — zentrust.net and any unrecognized venue_id
  "_default": {
    accent: "3a9fb0",
    accentHover: "4dbbc9",
    venue: "Venue Concierge",
    greet: "Hi! I'm Zeni, your Venue concierge. How can I help?",
    mode: "dark"
  },

  // The Grand Manor — Melbourne, FL (light elegant theme)
  "grand_manor": {
    accent: "8E7CA5",
    accentHover: "a08db8",
    venue: "The Grand Manor Concierge",
    greet: "Hi there! I'm Zeni, your Venue concierge at The Grand Manor. How can I help you today?",
    mode: "light",
    bg: "faf8f6",
    surface: "ffffff",
    headerBg: "8E7CA5",
    text: "3d3d3d",
    textSec: "888888",
    toggleSize: "56"
  },

  // Zentrust landing page — teal theme, demos Grand Manor bot
  "zentrust": {
    accent: "3a9fb0",
    accentHover: "4dbbc9",
    venue: "Venue Concierge",
    greet: "Hi! I'm Zeni, your Venue concierge. How can I help you today?",
    mode: "dark"
  }

  // To add a new venue, copy the block above and change:
  //   "venue_id": {
  //     accent: "HEX_COLOR",
  //     accentHover: "HEX_COLOR",
  //     venue: "Display Name",
  //     greet: "Greeting message",
  //     mode: "dark" or "light",
  //     bg: "HEX" (light mode bg),
  //     surface: "HEX" (light mode cards),
  //     headerBg: "HEX" (chat header bg),
  //     text: "HEX" (primary text),
  //     textSec: "HEX" (secondary text),
  //     toggleSize: "56" (toggle button height in px)
  //   }
};
