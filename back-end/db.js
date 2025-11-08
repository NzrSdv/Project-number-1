import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "habits_db",
  password: "Sa2kassov!",
  port: "5432",
});

export default pool;