import mysql from "mysql2/promise";
import dotenv from "dotenv/config";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const [rows, fields] = await connection.query("SELECT * FROM categories");
console.log(rows);
