export const apiKeyQueries = {
    readApiKeysByUserId:
        `SELECT
            id              AS id,
            user_id         AS userId,
            provider_type   AS providerType,
            key_name        AS keyName,
            created_at      AS createdAt,
            updated_at      AS updatedAt
        FROM api_keys
        WHERE user_id = ?
        ORDER BY created_at DESC`,
    createApiKey:
        `INSERT INTO api_keys (id, user_id, provider_type, key_name, encrypted_key)
        VALUES (UUID(), ?, ?, ?, ?)`,
    updateApiKeyName:
        `UPDATE api_keys
        SET key_name = ?
        WHERE id = ? AND user_id = ?`,
    deleteApiKey:
        `DELETE FROM api_keys
        WHERE id = ? AND user_id = ?`,
}