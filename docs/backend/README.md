# Callback Backend Documentation (Skeleton)

This folder is dedicated to the backend service of Callback, built with Node.js and Express.

---

> [!WARNING]
> All active APIs, routes, controllers, and AI integrations (`geminiService.js`) have been removed from the backend to establish a clean starting canvas.

## Technical Stack
- **Runtime:** Node.js (ES Modules syntax)
- **Server Framework:** Express
- **Middlewares:** Helmet, CORS, Morgan, Express JSON/URLEncoded parser.
- **Database Model:** Mongoose schema definitions (available in `src/models/Interview.js`)

---

## Core Layout (Current State)

1. **`src/server.js`**
   - Binds the Express app and listens on `PORT` (defaults to `5000`).
   - The MongoDB database connection is defined in `config/db.js` but bypassed in `server.js` to ensure the skeleton boots out-of-the-box.

2. **`src/app.js`**
   - Configures base standard security & logging middlewares.
   - Contains no active routing (returns 404 for all paths).

3. **`src/routes/interviewRoutes.js` (Removed)**
   - Emptied. Previously defined POST/GET paths for session management.

4. **`src/controllers/interviewController.js` (Removed)**
   - Emptied. Previously contained logic handling session creation and answers.

5. **`src/services/geminiService.js` (Removed)**
   - Emptied. Previously encapsulated Google Gemini model prompt logic.

6. **`src/models/Interview.js`**
   - Retains standard Mongoose schemas (`Interview`, `MessageSchema`, `DebriefSchema`) for technical reference.
