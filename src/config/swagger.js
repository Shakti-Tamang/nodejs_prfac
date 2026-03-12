const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node First API",
      version: "1.0.0",
      description:
        "REST API with authentication and user management. Use `/auth/login` to obtain a JWT token, then click **Authorize** and paste it as `Bearer <token>`.",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // ── Auth ─────────────────────────────────────────────────────────
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name:     { type: "string", example: "John Doe" },
            email:    { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", minLength: 6, example: "secret123" },
            role:     { type: "string", enum: ["admin", "user"], default: "user", example: "user" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email:    { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            token:   { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user:    { $ref: "#/components/schemas/User" },
          },
        },
        // ── User ─────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            id:    { type: "integer", example: 1 },
            name:  { type: "string",  example: "John Doe" },
            email: { type: "string",  format: "email", example: "john@example.com" },
            role:  { type: "string",  enum: ["admin", "user"], example: "user" },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name:  { type: "string", example: "Jane Smith" },
            email: { type: "string", format: "email", example: "jane@example.com" },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name:  { type: "string", example: "Jane Updated" },
            email: { type: "string", format: "email", example: "jane.updated@example.com" },
          },
        },
        // ── Errors ───────────────────────────────────────────────────────
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["a valid email is required", "password must be at least 6 characters"],
            },
          },
        },
        ErrorMessage: {
          type: "object",
          properties: {
            message: { type: "string", example: "User not found" },
          },
        },
      },
    },
  },
  // Scan these files for @swagger JSDoc comments
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
