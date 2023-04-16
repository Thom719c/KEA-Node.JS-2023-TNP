import pool from "./createConnection.js";
import { v4 as uuidv4 } from 'uuid';

/* async function getUsers() {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows;
} */

async function getUserByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
}

async function getUserByUsername(username) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
    return rows[0];
}

async function checkIfUserExist(email, username) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ? OR username = ?`,
        [email, username]
    );
    return rows[0];
}

async function create(user) {
    // Insert the new user data into the database
    const query = 'INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)';
    const values = [user.fullname, user.email, user.username, user.hashedPassword];
    pool.query(query, values);
}

async function update(user) {
    await pool.query(`UPDATE users 
        SET fullname = ?, email = ?, password = ?
        WHERE id = ?`,
        [user.fullname, user.email, user.password, user.id]
    );
}

async function updateUserPassword(encryptedPassword, email) {
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [encryptedPassword, email]);
}

/* Password Reset Token */
async function getEmailByPasswordResetToken(token) {
    const [rows] = await pool.query('SELECT email FROM password_reset_tokens WHERE token = ?', [token]);
    return rows[0];
}

async function createPasswordResetTokenInDB(email) {
    // Generate a unique token
    const token = uuidv4();
    // Save the token and user's email in the database
    await pool.query('INSERT INTO password_reset_tokens (email, token) VALUES (?, ?)', [email, token]);

    return token;
}

async function deletePasswordResetToken(token) {
    await pool.query('DELETE FROM password_reset_tokens WHERE token = ?', [token]);
}


export {
    getUserByEmail,
    getUserByUsername,
    checkIfUserExist,
    create,
    update,
    updateUserPassword,
    getEmailByPasswordResetToken,
    createPasswordResetTokenInDB,
    deletePasswordResetToken
};