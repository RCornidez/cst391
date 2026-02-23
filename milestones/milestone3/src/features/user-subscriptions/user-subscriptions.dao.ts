import { execute } from "../../services/mysql.connector";
import { UserSubscription, SubscriptionPlan} from "./user-subscriptions.model";
import { userSubscriptionQueries } from "./user-subscriptions.queries";
import { OkPacket } from "mysql";


export const readSubscriptionPlans = async () => {
    return execute<SubscriptionPlan[]>(userSubscriptionQueries.readSubscriptionPlans, []);
};

export const readSubscriptionPlanById = async (id: string) => {
    return execute<SubscriptionPlan[]>(userSubscriptionQueries.readSubscriptionPlanById, [id]);
};

export const readSubscriptionByUserId = async (userId: string) => {
    return execute<UserSubscription[]>(userSubscriptionQueries.readSubscriptionByUserId, [userId]);
};

export const createSubscription = async (userId: string, planId: string) => {
    return execute<OkPacket>(userSubscriptionQueries.createSubscription, [userId, planId]);
};

export const updateSubscription = async (userId: string, planId: string) => {
    return execute<OkPacket>(userSubscriptionQueries.updateSubscription, [planId, userId]);
};

export const cancelSubscription = async (userId: string) => {
    return execute<OkPacket>(userSubscriptionQueries.cancelSubscription, [userId]);
};