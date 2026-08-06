# Callback Backend API Reference & Specifications

This document serves as the comprehensive, production-ready specification for the Callback backend service APIs, validation schemas, security middleware, and global response structures.

---

## 1. Technical Stack & Middlewares

*   **Runtime Environment**: Node.js (ES Modules syntax)
*   **Web Framework**: Express
*   **Database Engine**: MongoDB (managed via Mongoose ORM)
*   **Input Validation**: Zod (strict JSON payload shape validation)
*   **Authentication**: JSON Web Tokens (JWT) stored in HTTP-Only cookies (`token`) and supported via request headers (`token` or `Authorization`)
*   **Cookie Parser**: `cookie-parser` (parses cookie headers to populate `req.cookies`)
*   **Security & Logs**: Morgan (HTTP request logging), CORS (cross-origin resource sharing), Helmet (secure HTTP headers)

---

## 2. API Architecture & Layer Responsibilities

```text
src/
├── config/         # Database connection initialization
├── repository/     # Direct database access logic (isolating Mongoose models)
├── validations/    # Input shape & rule validations (Zod schemas)
├── controllers/    # API workflow handler logic (business logic)
├── models/         # Mongoose schemas & MongoDB database collections
├── routes/         # Router mounts and OpenAPI specs mapping
├── utils/          # Middleware exceptions, hashing, and token helpers
├── app.js          # Express app configuration & middleware pipeline
└── server.js       # Entry point starting the database and HTTP server
```

---

## 3. Swagger UI Specs

The backend includes auto-generated Swagger UI docs powered by `swagger-ui-express` and `swagger-jsdoc`.
*   **Docs Endpoint**: `http://localhost:5000/api-docs`
*   **Route Specifications**: Declared using JSDoc inline `@openapi` annotations in files under `src/routes/*.js`.

---

## 4. Authentication & Security Middleware

### JWT Verification Middleware (`verifyJWT`)
Secures private endpoints. Checks the incoming request for a token in the `token` cookie, the `Authorization` header, or the `token` header.

#### Verification Pipeline & Failure Modes:
1.  **Token Presence Check**:
    *   **401 Unauthorized**: Missing token header or cookie.
2.  **Signature & Expiration Validation**:
    *   **401 Unauthorized**: Signature mismatch or expired token.
3.  **User Existence Check**:
    *   **401 Unauthorized**: Associated database user record no longer exists.
4.  **Session Version Check**:
    *   **401 Unauthorized**: The token's `session_version` does not match the database `session_version` (occurs if a user logs out or resets their password, invalidating older tokens).
5.  **Block Status Check**:
    *   **403 Forbidden**: Account has been suspended (`is_blocked: true`).
6.  **Deactivation Check**:
    *   **401 Unauthorized**: Account has been marked deleted in the system (`deleted_on !== null`).

---

## 5. Endpoints Reference

### 1. User Signup
*   **Endpoint**: `POST /api/v1/auth/signup`
*   **Access**: Public (Unauthenticated)
*   **Request Headers**: `Content-Type: application/json`
*   **Validation Rules (Zod Schema)**:
    *   `email`: Valid email format, trimmed, case-insensitive (coerced to lowercase).
    *   `username`: Minimum 3 characters, trimmed, case-insensitive (coerced to lowercase).
    *   `firstname`: Minimum 1 character, trimmed.
    *   `lastname`: Minimum 1 character, trimmed.
    *   `password`: Minimum 8 characters, must contain at least:
        *   1 uppercase letter
        *   1 lowercase letter
        *   1 number
        *   1 special character (`!@#$%^&*(),.?":{}|<>`)
*   **Payload Example**:
    ```json
    {
      "username": "johndoe",
      "email": "john@example.com",
      "firstname": "John",
      "lastname": "Doe",
      "password": "SecureP@ssword1"
    }
    ```
*   **Success Response (201 Created)**:
    *   *Sets Cookie:* `token=<jwt_string>; HttpOnly; Max-Age=43200000; Path=/` (12 Hours)
    *   *Body JSON:*
        ```json
        {
          "success": true,
          "message": "User registered successfully",
          "user": {
            "_id": "64b3ef8e1329c2ab87dc4612",
            "username": "johndoe",
            "email": "john@example.com",
            "firstname": "John",
            "lastname": "Doe",
            "role": "user",
            "is_blocked": false,
            "deleted_on": null,
            "createdAt": "2026-07-31T19:06:50.000Z",
            "updatedAt": "2026-07-31T19:06:50.000Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
*   **Error Responses**:
    *   `400 Bad Request` (Validation Failure):
        ```json
        {
          "success": false,
          "message": "Validation failed",
          "errors": [
            { "field": "password", "message": "Password must be at least 8 characters long" }
          ]
        }
        ```

---

### 2. User Login
*   **Endpoint**: `POST /api/v1/auth/login`
*   **Access**: Public (Unauthenticated)
*   **Request Headers**: `Content-Type: application/json`
*   **Validation Rules (Zod Schema)**:
    *   `email`: Valid email format, trimmed, lowercase.
    *   `password`: Minimum 1 character (required).
*   **Payload Example**:
    ```json
    {
      "email": "john@example.com",
      "password": "SecureP@ssword1"
    }
    ```
*   **Success Response (200 OK)**:
    *   *Sets Cookie:* `token=<jwt_string>; HttpOnly; Max-Age=43200000; Path=/` (12 Hours)
    *   *Body JSON:*
        ```json
        {
          "success": true,
          "message": "Logged in successfully",
          "user": {
            "_id": "64b3ef8e1329c2ab87dc4612",
            "username": "johndoe",
            "email": "john@example.com",
            "firstname": "John",
            "lastname": "Doe",
            "role": "user",
            "is_blocked": false,
            "deleted_on": null,
            "createdAt": "2026-07-31T19:06:50.000Z",
            "updatedAt": "2026-07-31T19:06:50.000Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
*   **Error Responses**:
    *   `400 Bad Request` (Validation Failure):
        ```json
        {
          "success": false,
          "message": "Validation failed",
          "errors": [
            { "field": "email", "message": "Invalid email address" }
          ]
        }
        ```
    *   `401 Unauthorized` (Invalid Credentials / Deleted Account):
        ```json
        {
          "success": false,
          "message": "Invalid email or password"
        }
        ```
    *   `403 Forbidden` (Account Suspended):
        ```json
        {
          "success": false,
          "message": "Your account has been blocked"
        }
        ```

---

### 3. Reset Password
*   **Endpoint**: `POST /api/v1/auth/reset-password`
*   **Access**: Private (Requires active `verifyJWT` session)
*   **Request Headers**:
    *   `Content-Type: application/json`
    *   `token` or `Authorization`: `<JWT_Token>`
*   **Validation Rules (Zod Schema)**:
    *   `newPassword`: Minimum 8 characters, must satisfy complexity criteria (1 uppercase, 1 lowercase, 1 number, 1 special character).
*   **Payload Example**:
    ```json
    {
      "newPassword": "NewSecureP@ssword12"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Password has been reset successfully"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request` (Validation Failure):
        ```json
        {
          "success": false,
          "message": "Validation failed",
          "errors": [
            { "message": "Password must be at least 8 characters long" }
          ]
        }
        ```
    *   `401 Unauthorized` (Missing or Invalid Session / Session Version Mismatch):
        ```json
        {
          "success": false,
          "message": "Unauthorized: Access token is invalid or expired"
        }
        ```

---

### 4. Get Current User Profile
*   **Endpoint**: `GET /api/v1/user/me`
*   **Access**: Private (Requires active `verifyJWT` session)
*   **Request Headers**:
    *   `token` or `Authorization`: `<JWT_Token>`
*   **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "user": {
        "_id": "64b3ef8e1329c2ab87dc4612",
        "email": "john@example.com",
        "username": "johndoe",
        "firstname": "John",
        "lastname": "Doe",
        "role": "user",
        "is_blocked": false,
        "deleted_on": null,
        "createdAt": "2026-07-31T19:06:50.000Z",
        "updatedAt": "2026-07-31T19:06:50.000Z"
      }
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`:
        ```json
        {
          "success": false,
          "message": "Unauthorized: Access token is missing"
        }
        ```

---

### 5. Logout
*   **Endpoint**: `POST /api/v1/auth/logout`
*   **Access**: Private (Requires active `verifyJWT` session to increment DB session counter)
*   **Request Headers**:
    *   `token` or `Authorization`: `<JWT_Token>`
*   **Success Response (200 OK)**:
    *   *Clears Cookie:* Sets cookie `token=; HttpOnly; Max-Age=0; Path=/`
    *   *Body JSON:*
        ```json
        {
          "success": true,
          "message": "Logged out successfully"
        }
        ```

---

## 6. Global Error Structure

### 404 Route Not Found
Triggered when requesting a resource or endpoint URI that is not registered:
*   **Response (404 Not Found)**:
    ```json
    {
      "error": "Endpoint not found"
    }
    ```

### 500 Uncaught Exception / Database Error
Triggered when an unhandled server error occurs:
*   **Response (500 Internal Server Error)**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```
