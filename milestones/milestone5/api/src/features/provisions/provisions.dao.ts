import { execute } from "../../services/mysql.connector";
import { Provision } from "./provisions.model";
import { provisionQueries } from "./provisions.queries";
import { OkPacket } from "mysql";

export const readProvisionsByUserId = async (userId: string) => {
    return execute<Provision[]>(provisionQueries.readProvisionsByUserId, [userId]);
};

export const readProvisionById = async (id: string, userId: string) => {
    return execute<Provision[]>(provisionQueries.readProvisionById, [id, userId]);
};

export const createProvision = async (userId: string, serverName: string, serverSize: string, githubRepoUrl: string | null) => {
    await execute<OkPacket>(provisionQueries.createProvision, [userId, serverName, serverSize, githubRepoUrl]);
    const rows = await execute<{ id: string }[]>(provisionQueries.readLastProvisionIdByUserId, [userId]);
    return rows[0].id;
};
export const updateProvisionStatus = async (id: string, userId: string, status: string, dropletId: string | null, ipAddress: string | null, provisionedAt: Date | null) => {
    return execute<OkPacket>(provisionQueries.updateProvisionStatus, [status, dropletId, ipAddress, provisionedAt, id, userId]);
};

export const deleteProvision = async (id: string, userId: string) => {
    return execute<OkPacket>(provisionQueries.deleteProvision, [id, userId]);
};