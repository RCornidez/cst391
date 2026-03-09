import { CardType } from "../enums";

export interface BillingInfo {
    id: string;
    userId: string;
    paymentProviderToken: string;
    cardLastFour: string;
    cardType: CardType;
    createdAt: Date;
    updatedAt: Date;
}