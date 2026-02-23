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