export const userQueries = {
    createUser:
        `INSERT INTO users (id, email, password_hash)
        VALUES (UUID(), ?, ?)`,
    readUserCredentialsByEmail:
        `SELECT
            id            AS id,
            email         AS email,
            password_hash AS passwordHash
        FROM users
        WHERE users.email = ?`
}