export const userSubscriptionQueries = {
    readSubscriptionPlans:
        `SELECT
            id              AS id,
            name            AS name,
            price           AS price,
            billing_period  AS billingPeriod,
            features        AS features,
            is_active       AS isActive
        FROM subscription_plans
        WHERE is_active = TRUE`,
    readSubscriptionPlanById:
        `SELECT
            id              AS id,
            name            AS name,
            price           AS price,
            billing_period  AS billingPeriod,
            features        AS features,
            is_active       AS isActive
        FROM subscription_plans
        WHERE id = ?`,
    readSubscriptionByUserId:
        `SELECT
            id              AS id,
            user_id         AS userId,
            plan_id         AS planId,
            status          AS status,
            start_date      AS startDate,
            end_date        AS endDate,
            created_at      AS createdAt
        FROM user_subscriptions
        WHERE user_id = ? AND status = 'ACTIVE'`,
    createSubscription:
        `INSERT INTO user_subscriptions (id, user_id, plan_id, status, start_date)
        VALUES (UUID(), ?, ?, 'ACTIVE', NOW())`,
    updateSubscription:
        `UPDATE user_subscriptions
        SET plan_id = ?
        WHERE user_id = ? AND status = 'ACTIVE'`,
    cancelSubscription:
        `UPDATE user_subscriptions
        SET
            status = 'CANCELLED',
            end_date = NOW()
        WHERE user_id = ? AND status = 'ACTIVE'`,
}