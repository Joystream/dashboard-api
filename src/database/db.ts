import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "your_username",
  host: process.env.DB_HOST || "your_host",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
