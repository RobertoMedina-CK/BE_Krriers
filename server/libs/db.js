import mysql from "mysql2";

export const db = mysql.createPool({
  host: "localhost",
  user: "rudy",
  password: "123456",
  database: "krriers",
  port: 3306,
});
