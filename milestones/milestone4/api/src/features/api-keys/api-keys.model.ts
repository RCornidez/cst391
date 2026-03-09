import { ProviderType } from "../enums";

export interface ApiKey {
    id: string;
    userId: string;
    providerType: ProviderType;
    keyName: string;
    encryptedKey: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiKeyResponse {
    id: string;
    userId: string;
    providerType: ProviderType;
    keyName: string;
    createdAt: Date;
    updatedAt: Date;
}