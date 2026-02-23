export const provisionQueries = {
    readProvisionsByUserId:
        `SELECT
            id              AS id,
            user_id         AS userId,
            server_name     AS serverName,
            server_size     AS serverSize,
            status          AS status,
            droplet_id      AS dropletId,
            ip_address      AS ipAddress,
            github_repo_url AS githubRepoUrl,
            created_at      AS createdAt,
            provisioned_at  AS provisionedAt,
            deleted_at      AS deletedAt
        FROM provisions
        WHERE user_id = ?`,
    readProvisionById:
        `SELECT
            id              AS id,
            user_id         AS userId,
            server_name     AS serverName,
            server_size     AS serverSize,
            status          AS status,
            droplet_id      AS dropletId,
            ip_address      AS ipAddress,
            github_repo_url AS githubRepoUrl,
            created_at      AS createdAt,
            provisioned_at  AS provisionedAt,
            deleted_at      AS deletedAt
        FROM provisions
        WHERE id = ? AND user_id = ?`,
    readLastProvisionIdByUserId:
    `SELECT id FROM provisions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
    createProvision:
        `INSERT INTO provisions (id, user_id, server_name, server_size, github_repo_url)
        VALUES (UUID(), ?, ?, ?, ?)`,
    updateProvisionStatus:
        `UPDATE provisions
        SET
            status = ?,
            droplet_id = ?,
            ip_address = ?,
            provisioned_at = ?
        WHERE id = ? AND user_id = ?`,
    deleteProvision:
        `UPDATE provisions
        SET
            status = 'DELETED',
            deleted_at = NOW()
        WHERE id = ? AND user_id = ?`,
}