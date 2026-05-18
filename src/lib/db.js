import mysql from 'mysql2/promise'
import { hash } from 'bcryptjs'

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {}
}

if (!global.mysqlPool || global.mysqlPool._closed) {
    global.mysqlPool = mysql.createPool(dbConfig)
}

const pool = global.mysqlPool

// posts

export async function fetchPostsFromDB(limit = 20, offset = 0) {
    const [rows] = await pool.execute(
        `SELECT posts.*, 
                COALESCE(users.name, 'Deleted User') AS author_name
         FROM posts 
         LEFT JOIN users ON posts.userId = users.id
         ORDER BY posts.id DESC 
         LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`
    )
    return rows
}

export async function fetchPostFromDBById(id) {
    const [rows] = await pool.execute(
        `SELECT posts.*, 
                COALESCE(users.name, 'Deleted User') AS author_name
         FROM posts 
         LEFT JOIN users ON posts.userId = users.id 
         WHERE posts.id = ?`,
        [id]
    )
    return rows[0]
}

export async function fetchLatestPostFromDB() {
    const [rows] = await pool.execute(
        `SELECT posts.*, 
                COALESCE(users.name, 'Deleted User') AS author_name
         FROM posts 
         LEFT JOIN users ON posts.userId = users.id
         ORDER BY posts.created_at DESC 
         LIMIT 3`
    )
    return rows
}

export async function fetchCountPostFromDB() {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM posts')
    return rows[0].count
}

export async function fetchCountPostFromDBByKeyword(keyword) {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM posts WHERE title LIKE ?', [`%${keyword}%`])
    return rows[0].count
}

export async function getPostsFromDBByKeyword(keyword, limit = 20, offset = 0) {
    const [rows] = await pool.execute(
        `SELECT posts.*, 
                COALESCE(users.name, 'Deleted User') AS author_name
         FROM posts 
         LEFT JOIN users ON posts.userId = users.id
         WHERE posts.title LIKE ? 
         ORDER BY posts.id DESC 
         LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
        [`%${keyword}%`]
    )
    return rows
}

export async function fetchLatestPostsFromDBById(userId) {
    const [rows] = await pool.execute(
        'SELECT * FROM posts WHERE userId = ? ORDER BY created_at DESC LIMIT 3',
        [userId]
    )
    return rows
}

export async function forwardPostToDB(title, description, email, name, userId) {
    await pool.execute(
        'INSERT INTO posts (title, body, author_email, author_name, userId) VALUES (?, ?, ?, ?, ?)',
        [title, description, email, name, userId]
    )
    return { success: true }
}

export async function deletePostById(id) {
    await pool.execute('DELETE FROM posts WHERE id = ?', [id])
}

export async function fetchCountPostFromDBByUserId(userId) {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM posts WHERE userId = ?', [userId])
    return rows[0].count
}

export async function fetchPostsFromDBById(userId, limit = 20, offset = 0) {
    const [rows] = await pool.execute(
        `SELECT * FROM posts 
         WHERE userId = ? 
         ORDER BY created_at DESC 
         LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
        [userId]
    )
    return rows
}
export async function fetchCountPostFromDBById(userId) {
    const [rows] = await pool.execute(
        `SELECT COUNT(*) AS count FROM posts WHERE userId = ?`,
        [userId]
    )
    return rows[0].count || 0
}




// users

export async function getUsersFromDB() {
    const [rows] = await pool.execute('SELECT * FROM users')
    return rows
}

export async function getUserFromDBByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    return rows[0]
}

export async function getUserFromDBById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    return rows[0]
}

export async function forwardUserToDB(email, password, name) {
    const hashedPassword = await hash(password, 10)
    await pool.execute(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
    )
    return { success: true }
}

export async function createGoogleUserInDB({ name, email, image }) {
    await pool.execute(
        'INSERT INTO users (name, email, image, password) VALUES (?, ?, ?, NULL)',
        [name, email, image]
    )
}

export async function updateUserAvatarByEmail(email, url) {
    await pool.execute(
        'UPDATE users SET image = ? WHERE email = ?',
        [url, email]
    )
}

//links

export async function getLinksFromDB() {
    const [rows] = await pool.execute('SELECT * FROM links')
    return rows
}

//comments

export async function getCommentsFromDBByPostId(id) {
    const [rows] = await pool.execute(`SELECT comments.*, 
                users.name AS author_name, 
                users.image AS author_avatar
         FROM comments 
         LEFT JOIN users ON comments.user_id = users.id
         WHERE comments.post_id = ?
         ORDER BY comments.created_at DESC`,
        [id])
    return rows
}

export async function getCountCommentsFromDBByPostId(id) {
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM comments WHERE post_id = ?', [id])
    return rows[0]?.count || 0

}

export async function forwardCommentToDB(comment_text, post_id, user_id) {
    await pool.execute(
        'INSERT INTO comments (comment_text, post_id, user_id) VALUES (?, ?, ?)',
        [comment_text, post_id, user_id]
    )
    return { success: true }
}