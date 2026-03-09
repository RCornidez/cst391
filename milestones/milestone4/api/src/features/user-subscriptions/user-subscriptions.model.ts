import { SubscriptionStatus } from "../enums";

export interface UserSubscription {
    id: string;
    userId: string;
    planId: string;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    billingPeriod: string;
    features: string;
    isActive: boolean;
}
