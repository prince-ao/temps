import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "voteon",
  password: "Coolcoolboy1",
  port: 5432,
});

export default pool;
