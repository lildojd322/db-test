import mysql from 'mysql2/promise'
import { hash } from 'bcryptjs'

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const pool = global.mysqlPool || (global.mysqlPool = mysql.createPool(dbConfig))

export async function fetchPostsFromDB(limit = 20, offset = 0) {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?', [Number(limit), Number(offset)])
    return rows
}

export async function fetchPostFromDBById(id) {
    const [rows] = await pool.execute('SELECT * FROM posts WHERE id = ? ', [id])
    return rows[0]
}

export async function fetchCountPostFromDB() {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM posts ')
    return rows[0].count
}   

export async function fetchCountPostFromDBByKeyword(keyword) {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM posts WHERE title LIKE ?', [`%${keyword}%`])
    return rows[0].count
}

export async function getPostsFromDBByKeyword(keyword, limit = 20, offset = 0) {
    const [rows] = await pool.query(
        'SELECT * FROM posts WHERE title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
        [`%${keyword}%`, Number(limit), Number(offset)]
    )
    return rows
}

export async function deletePostById(id) {
    await pool.execute('DELETE from posts WHERE id = ? ', [id])
}

export async function getLinksFromDB() {
    const [rows] = await pool.execute('SELECT * FROM links ')
    return rows
}

export async function getUsersFromDB() {
    const [rows] = await pool.execute('SELECT * FROM users ')
    return rows
}

export async function getUserFromDBByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? ', [email])
    return rows[0]
}

export async function forwardUserToDB(email, password, name) {
    const hashedPassword = await hash(password, 10);
    await pool.execute(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
    )
    return { success: true }
}