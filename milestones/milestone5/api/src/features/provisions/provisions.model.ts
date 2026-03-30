import { ProvisionStatus } from "../enums";

export interface Provision {
    id: string;
    userId: string;
    serverName: string;
    serverSize: string;
    status: ProvisionStatus;
    dropletId: string | null;
    ipAddress: string | null;
    githubRepoUrl: string | null;
    createdAt: Date;
    provisionedAt: Date | null;
    deletedAt: Date | null;
}