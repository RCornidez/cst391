import { BillStatus } from "../enums";

export interface Bill {
    id: string;
    userId: string;
    userSubscriptionId: string;
    amount: number;
    status: BillStatus;
    dueDate: Date;
    paidDate: Date | null;
    createdAt: Date;
}