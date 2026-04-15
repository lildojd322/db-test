import mysql from 'mysql2/promise'

export async function fetchPostsFromDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.execute('SELECT * FROM posts ')
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

export async function getPostsFromDBByKeyword(keyword) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    const [rows] = await connection.execute(
        'SELECT * FROM posts WHERE title LIKE ?',
        [`%${keyword}%`]
    )
    await connection.end()
    return rows
}

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