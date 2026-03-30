import { execute } from "../../services/mysql.connector";
import { BillingInfo } from "./billing-info.model";
import { billingInfoQueries } from "./billing-info.queries";
import { OkPacket } from "mysql";

export const readBillingInfoByUserId = async (userId: string) => {
    return execute<BillingInfo[]>(billingInfoQueries.readBillingInfoByUserId, [userId]);
};

export const createBillingInfo = async (userId: string, paymentProviderToken: string, cardLastFour: string, cardType: string) => {
    return execute<OkPacket>(billingInfoQueries.createBillingInfo, [userId, paymentProviderToken, cardLastFour, cardType]);
};

export const updateBillingInfo = async (userId: string, paymentProviderToken: string, cardLastFour: string, cardType: string) => {
    return execute<OkPacket>(billingInfoQueries.updateBillingInfo, [paymentProviderToken, cardLastFour, cardType, userId]);
};

export const deleteBillingInfo = async (userId: string) => {
    return execute<OkPacket>(billingInfoQueries.deleteBillingInfo, [userId]);
};