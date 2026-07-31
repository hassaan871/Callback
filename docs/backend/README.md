# Callback Backend Documentation

This folder contains the backend API services for the Callback platform, built with Node.js, Express, Zod, Mongoose, and JSON Web Tokens.

---

## Technical Stack
- **Runtime:** Node.js (ES Modules syntax)
- **Server Framework:** Express
- **Middlewares:** Helmet, CORS, Morgan, Express JSON/URLEncoded parser.
- **Database:** MongoDB Atlas (managed via Mongoose)
- **Validation:** Zod (TypeScript-first schema validation)
- **Authentication:** JWT (JSON Web Tokens)

---

## Core Layout and Layer Responsibilities

1. **`src/server.js`**
   - Boots up the application and connects the MongoDB Atlas database.

2. **`src/app.js`**
   - Configures application-wide middlewares (Helmet, CORS, Morgan).
   - Mounts the central API router `/api` and registers global error handlers.

3. **`src/routes/`**
   - **`routes.js`**: The central router. Aggregates versioned routes (e.g. mounting `authRoutes` under `/v1/auth`).
   - **`auth.routes.js`**: Declares authentication route endpoints (`/signup` and `/login`) and binds them to the auth controller.

4. **`src/controllers/`**
   - **`auth.controller.js`**: Handles business workflows for signup and login. Performs input validation using Zod schemas, hashes passwords using bcrypt, generates session tokens, and returns clean, sanitized payloads.

5. **`src/validations/`**
   - **`auth.validation.js`**: Declares Zod validation schemas (`signupSchema` and `loginSchema`) to verify shape, structure, and constraints of incoming requests before database access.

6. **`src/repository/`**
   - **`user.repository.js`**: The database access layer. Holds all direct query interactions with Mongoose (like `User.create` and `User.findOne`) to isolate model operations from business controller layers.

7. **`src/models/`**
   - **`user.model.js`**: Establishes the Mongoose schema for User account documents. Contains only definition and models, with no embedded save-hooks or logic.

8. **`src/utils/`**
   - **`asyncHandler.js`**: Middleware helper to capture asynchronous errors and return standard 500 error responses.
   - **`bcrypt.utility.js`**: Helper functions wrapping bcrypt to hash passwords and verify credentials.
   - **`jwt.utility.js`**: Helper functions wrapping jsonwebtoken to sign session tokens.

---

## Swagger API Documentation

The backend includes auto-generated Swagger UI docs powered by `swagger-ui-express` and `swagger-jsdoc`. 

* **Documentation Endpoint:** `http://localhost:5000/api-docs`
* **Route Files Specifications:** OpenAPI comments are declared directly in route routers (e.g. `auth.routes.js`) using `@openapi` metadata.

### API Endpoints Summary

#### 1. Signup (`POST /api/v1/auth/signup`)
* **Purpose:** Registers a new user account.
* **Payload:**
  ```json
  {
    "username": "string",
    "email": "string",
    "firstname": "string",
    "lastname": "string",
    "password": "string"
  }
  ```
* **Response (201 Created):** Returns user details and sets an HTTP-Only session cookie `token`.

#### 2. Login (`POST /api/v1/auth/login`)
* **Purpose:** Authenticates user and returns JWT.
* **Payload:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
* **Response (200 OK):** Returns logged-in user profile and sets an HTTP-Only session cookie `token`.

