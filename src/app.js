const express        = require("express");
const swaggerUi      = require("swagger-ui-express");
const swaggerSpec    = require("./config/swagger");
const authRoutes     = require("./routes/authRoutes");
const userRoutes     = require("./routes/userRoutes");
const errorHandler   = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());

// ─── Swagger UI ──────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Raw JSON spec (useful for tools like Postman)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ─── Routes ──────────────────────────────────────────────
app.use("/auth",  authRoutes);   // public  → /auth/register, /auth/login
app.use("/users", userRoutes);   // protected by authenticate + authorize

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ────────────────────────────────
app.use(errorHandler);

module.exports = app;
