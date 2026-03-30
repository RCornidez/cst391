export const billQueries = {
    readBillsByUserId:
        `SELECT
            id                      AS id,
            user_id                 AS userId,
            user_subscription_id    AS userSubscriptionId,
            amount                  AS amount,
            status                  AS status,
            due_date                AS dueDate,
            paid_date               AS paidDate,
            created_at              AS createdAt
        FROM bills
        WHERE user_id = ?
        ORDER BY created_at DESC`,
    readBillById:
        `SELECT
            id                      AS id,
            user_id                 AS userId,
            user_subscription_id    AS userSubscriptionId,
            amount                  AS amount,
            status                  AS status,
            due_date                AS dueDate,
            paid_date               AS paidDate,
            created_at              AS createdAt
        FROM bills
        WHERE id = ? AND user_id = ?`,
    createBill:
        `INSERT INTO bills (id, user_id, user_subscription_id, amount, status, due_date)
        VALUES (UUID(), ?, ?, ?, 'PENDING', ?)`,
    updateBillStatus:
        `UPDATE bills
        SET
            status = ?,
            paid_date = ?
        WHERE id = ? AND user_id = ?`,
}