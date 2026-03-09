import { execute } from "../../services/mysql.connector";
import { Bill } from "./bills.model";
import { billQueries } from "./bills.queries";
import { OkPacket } from "mysql";

export const readBillsByUserId = async (userId: string) => {
    return execute<Bill[]>(billQueries.readBillsByUserId, [userId]);
};

export const readBillById = async (id: string, userId: string) => {
    return execute<Bill[]>(billQueries.readBillById, [id, userId]);
};