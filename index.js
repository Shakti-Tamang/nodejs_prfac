require("dotenv").config(); // load .env variables first

const AppDataSource = require("./src/config/data-source");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Initialize TypeORM DataSource first, then start Express
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to PostgreSQL via TypeORM");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  });
