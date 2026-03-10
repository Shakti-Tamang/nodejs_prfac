const { DataSource } = require("typeorm");
const User = require("../entities/User");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "node_api",
  synchronize: true,  // auto-creates/updates tables from entities (dev only)
  logging: false,
  entities: [User],
});

module.exports = AppDataSource;
