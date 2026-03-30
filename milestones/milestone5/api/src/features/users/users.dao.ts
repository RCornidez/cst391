import { execute } from "../../services/mysql.connector";
import { User } from "./users.model";
import { userQueries } from "./users.queries";
import { OkPacket } from "mysql";

export const createUser = async (email: string, passwordHash: string) => {
    return execute<OkPacket>(userQueries.createUser, [email, passwordHash]);
};


export const readUserCredentialsByEmail = async (email: string) => {
    return execute<User[]>(userQueries.readUserCredentialsByEmail, [email]);
};