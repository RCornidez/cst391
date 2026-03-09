import { execute } from "../../services/mysql.connector";
import { ApiKeyResponse } from "./api-keys.model";
import { apiKeyQueries } from "./api-keys.queries";
import { OkPacket } from "mysql";

export const readApiKeysByUserId = async (userId: string) => {
    return execute<ApiKeyResponse[]>(apiKeyQueries.readApiKeysByUserId, [userId]);
};

export const createApiKey = async (userId: string, providerType: string, keyName: string, encryptedKey: string) => {
    return execute<OkPacket>(apiKeyQueries.createApiKey, [userId, providerType, keyName, encryptedKey]);
};

export const updateApiKeyName = async (id: string, userId: string, keyName: string) => {
    return execute<OkPacket>(apiKeyQueries.updateApiKeyName, [keyName, id, userId]);
};

export const deleteApiKey = async (id: string, userId: string) => {
    return execute<OkPacket>(apiKeyQueries.deleteApiKey, [id, userId]);
};