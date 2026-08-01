# Callback Frontend & Integration Documentation

This document serves as the guide for the React frontend workspace, detailing component structures, styling tokens, and the architectural blueprint for connecting endpoints to the Redux store and route managers.

---

## 1. Technical Stack & UI Overrides
*   **Framework**: React 19 (compiled via Vite)
*   **State Manager**: Redux Toolkit (managing UI selections and authentication sessions)
*   **Styling & Fonts**: Tailwind CSS, utilizing `Space Grotesk` (display headings) and `IBM Plex Sans / Mono` (interface text & logs)
*   **Icons**: Rendered using lightweight custom SVG shapes and unicode glyphs.

---

## 2. Directory Layout & Key Components

```text
src/
├── assets/         # Static media assets and graphics
├── components/     # Visual building blocks (Navbar, Hero, Footer, Tracks, etc.)
├── pages/          # Full page layouts (LandingPage, Login, Signup, Dashboard, NotFound)
├── store/          # Redux Toolkit configuration (slices and async thunks)
├── App.css         # Local CSS overrides
├── index.css       # Tailwind directives & global utility layers
└── main.jsx        # App bootstrapper
```

### Components List
*   **`Navbar.jsx`**: Global header. Navigates between landing page offsets or shows user session profile summaries.
*   **`Hero.jsx`**: Splash page introduction. Simulates an interactive technical SRE terminal response simulation.
*   **`Tracks.jsx`**: Interactive selection hub allowing users to choose paths (Backend, SRE, ML, System Design).
*   **`NotFound.jsx`**: Premium fallback 404 page featuring terminal styling, custom pulse effects, and local routes validation actions.

---

## 3. API Integration Blueprint

To fetch data from the backend, the client must establish a secure bridge that supports the JWT cookies (`token`) set by the server.

### 1. HTTP Client Configuration (Axios Instance)
To ensure the HTTP-Only cookie `token` is passed along with headers on every request, instantiate an Axios client configured with `withCredentials: true`:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CRITICAL: Enables passing session cookies across domains
});

export default apiClient;
```

---

## 4. Redux Authentication Store Slice (`authSlice`)

The state should maintain the user's login details, active loading states, and error handling messages. Create a slice to handle authentication thunks:

### Planned State Structure
```typescript
interface AuthState {
  user: UserObject | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### Thunk Mapping (Async Actions)
All async actions should communicate through the standard `apiClient`:

1.  **`signupUser`**: `POST /auth/signup`
    *   Payload: `{ username, email, firstname, lastname, password }`
    *   On Success: Saves user details to store; sets `isAuthenticated = true`.
2.  **`loginUser`**: `POST /auth/login`
    *   Payload: `{ email, password }`
    *   On Success: Saves user details to store; sets `isAuthenticated = true`.
3.  **`logoutUser`**: `POST /auth/logout`
    *   On Success: Clears user details; sets `isAuthenticated = false; user = null`.
4.  **`checkCurrentUser`**: `GET /user/me`
    *   *Purpose:* Runs immediately on app mount to check if the user has an active session cookie.
    *   On Success: Hydrates user details.
    *   On Error (e.g. 401): Silently resets auth state to unauthenticated (no visible error).

---

## 5. Protected Routes & Navigation Guards

To prevent unauthorized access to private panels, wrap authentication-sensitive routes in route guards.

### Wrapper Example (`ProtectedRoute.jsx`)
```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div className="min-h-screen bg-bg flex items-center justify-center font-mono">Loading session...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

### Wrapping Guest Routes (`GuestRoute.jsx`)
Similarly, authenticated users should not access login/signup pages:
```jsx
export const GuestRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
```

---

## 6. App Router Layout (`App.jsx`)

Below is the routing wrapper mapping client pages using these guards:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Guest Only Routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Wildcard Error Handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
