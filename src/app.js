const express = require("express");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────
app.use("/users", userRoutes);

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ────────────────────────────────
app.use(errorHandler);

module.exports = app;
