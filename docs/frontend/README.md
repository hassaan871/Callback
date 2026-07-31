# Callback Frontend Documentation

This folder is dedicated to the frontend service of Callback, built with React, Vite, and Redux Toolkit.

---

## Technical Stack
- **Framework:** React 18+ (bundled via Vite)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` and `react-redux`)
- **Styling:** Tailwind CSS (configured in `tailwind.config.js`)
- **Icons & Glyphs:** Unicode strings (e.g. `{ }`, `◧`, `⎈`, `▤`, `◎`, `▣`, `✦`)

---

## Folder & Component Layout

1. **`src/main.jsx` & `src/App.jsx`**
   - Main entry point and layout wrapper containing custom noise overlays, nav bar, primary page contents, and standard footer.

2. **`src/components/`**
   - **`Navbar.jsx`**: Top header displaying Logo and main page navigation offsets.
   - **`Hero.jsx`**: Standard promotional landing banner. Contains an active terminal mockup demonstration panel illustrating a sample SRE outage response evaluation.
   - **`WhoItIsFor.jsx`**: Summary describing platform value for various user cohorts.
   - **`Tracks.jsx`**: Interactive button collection linking selected technical domains (Backend, System Design, Behavioral, DevOps, etc.).
   - **`HowItWorks.jsx`**: Step-by-step description of a mock loop.
   - **`Progress.jsx`**: Educational banner illustrating session trends tracking.
   - **`Pricing.jsx`**: Simple package tier configurations.
   - **`Footer.jsx`**: Standard bottom signature.

3. **`src/store/`**
   - **`index.js`**: Standard store bootstrapper importing UI configurations.
   - **`uiSlice.js`**: Stores layout states, active mobile navigation overlays, and the currently chosen track.

---

## Core Styling & Tokens (`tailwind.config.js`)

The app uses custom Space Grotesk (display headings) and IBM Plex Sans/Mono fonts. Colors are mapped as:
- **Base Background:** `#0F1417`
- **Elevated Cards:** `#161D21` (primary), `#1B2327` (secondary)
- **Primary Borders:** `#263239` (default), `#1E282D` (soft)
- **Typography:** `#E7EDEA` (primary text), `#8FA39C` (muted), `#5E6E6A` (dimmed)
- **Accent:** `#E8A33D` (Gold), `#4FA9A2` (Teal), `#6FCF97` (Success green)

---

## Developer / LLM Quick Notes

- **API Integrations:** The client currently only has landing pages and mock views. The actual interview components (conversational logs, session inputs, live metric scorecards) must be created and connected to backend endpoints.
- **Port:** Dev server defaults to port `5173` (configured to proxy requests or fetch resources from backend port `5000` via CORS).
