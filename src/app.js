const express        = require("express");
const swaggerUi      = require("swagger-ui-express");
const swaggerSpec    = require("./config/swagger");
const authRoutes       = require("./routes/authRoutes");
const userRoutes       = require("./routes/userRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const errorHandler   = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());

// ─── Swagger UI (NestJS-style) ──────────────────────────
const swaggerUiOptions = {
  swaggerOptions: {
    docExpansion: "none",        // all tags collapsed on load
    filter: true,               // search bar shown
    persistAuthorization: true, // keep token after refresh
    tagsSorter: "alpha",
    operationsSorter: "alpha",
    defaultModelsExpandDepth: 1,
  },
  customSiteTitle: "Node First API Docs",
  customCss: `
    .swagger-ui .topbar { background-color: #e8002d; }
    .swagger-ui .topbar .download-url-wrapper { display: none; }
  `,
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ─── Routes ──────────────────────────────────────────────
app.use("/auth",        authRoutes);       // public
app.use("/users",       userRoutes);       // JWT protected
app.use("/assignments", assignmentRoutes); // JWT protected

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ────────────────────────────────
app.use(errorHandler);

module.exports = app;
