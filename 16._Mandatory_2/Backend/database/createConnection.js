import mysql from "mysql2";
import dotenv from "dotenv/config";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

pool.on('error', (err) => {
    console.error('Error connecting to MySQL database: ', err);
});

pool.on('connect', () => {
    console.log('Connected to MySQL database.');
});

export default pool;