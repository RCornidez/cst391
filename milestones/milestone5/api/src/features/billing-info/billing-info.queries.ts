export const billingInfoQueries = {
    readBillingInfoByUserId:
        `SELECT
            id                      AS id,
            user_id                 AS userId,
            card_last_four          AS cardLastFour,
            card_type               AS cardType,
            created_at              AS createdAt,
            updated_at              AS updatedAt
        FROM billing_info
        WHERE user_id = ?`,
    createBillingInfo:
        `INSERT INTO billing_info (id, user_id, payment_provider_token, card_last_four, card_type)
        VALUES (UUID(), ?, ?, ?, ?)`,
    updateBillingInfo:
        `UPDATE billing_info
        SET
            payment_provider_token = ?,
            card_last_four = ?,
            card_type = ?
        WHERE user_id = ?`,
    deleteBillingInfo:
        `DELETE FROM billing_info
        WHERE user_id = ?`,
}