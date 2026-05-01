import mysql from 'mysql2/promise'
import { hash } from 'bcryptjs'



// posts

export async function fetchPostsFromDB(limit = 20, offset = 0) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.query('SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?', [Number(limit), Number(offset)])
    await connection.end()
    return rows
}

export async function fetchPostFromDBById(id) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ? ', [id])
    await connection.end()
    return rows[0]
}

export async function fetchCountPostFromDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM posts ')
    await connection.end()
    return rows[0].count
}



export async function fetchCountPostFromDBByKeyword(keyword) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM posts WHERE title LIKE ?',
        [`%${keyword}%`])
    await connection.end()
    return rows[0].count
}

export async function getPostsFromDBByKeyword(keyword, limit = 20, offset = 0) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.query(
        'SELECT * FROM posts WHERE title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
        [`%${keyword}%`, Number(limit), Number(offset)]
    )
    await connection.end()
    return rows
}

export async function deletePostById(id) {
    const connection = await mysql.createConnection(
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    )

    const [rows] = await connection.execute('DELETE from posts WHERE id = ? ', [id])
}


// links        
export async function getLinksFromDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'links'
    })
    const [rows] = await connection.execute('SELECT * FROM links ')
    await connection.end()
    return rows
}

// users

export async function getUsersFromDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'users'
    })
    const [rows] = await connection.execute('SELECT * FROM users ')
    await connection.end()
    return rows
}

export async function getUserFromDBByEmail(email) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'users'
    })
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ? ', [email])
    await connection.end()
    return rows[0]
}


export async function forwardUserToDB(email, password, name) {

    const hashedPassword = await hash(password, 10);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'users'
    })
    const [rows] = await connection.execute(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
    )

    await connection.end();
    return { success: true }
}