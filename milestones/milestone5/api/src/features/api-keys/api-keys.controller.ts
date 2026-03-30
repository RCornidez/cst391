import { Request, RequestHandler, Response } from "express";
import { OkPacket } from "mysql";
import * as ApiKeysDao from "./api-keys.dao";
import { ProviderType } from "../enums";
import { encryptKey } from "../../utilities/crypto";

export const readApiKeys: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const keys = await ApiKeysDao.readApiKeysByUserId(userId);
        res.status(200).json(keys);
    } catch (error) {
        console.error("[api-keys.controller][readApiKeys][Error]", error);
        res.status(500).json({ message: "There was an error when fetching API keys" });
    }
};

export const createApiKey: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { providerType, keyName, apiKey } = req.body;

        if (!providerType || !keyName || !apiKey) {
            res.status(400).json({ message: "providerType, keyName, and apiKey are required" });
            return;
        }

        if (!Object.values(ProviderType).includes(providerType as ProviderType)) {
            res.status(400).json({ message: `providerType must be one of: ${Object.values(ProviderType).join(", ")}` });
            return;
        }

        const encryptedKey = encryptKey(apiKey);

        const okPacket: OkPacket = await ApiKeysDao.createApiKey(userId, providerType, keyName, encryptedKey);

        if (okPacket.affectedRows > 0) {
            res.status(201).json({ message: "API key created successfully" });
        } else {
            throw new Error("API key not created");
        }
    } catch (error) {
        console.error("[api-keys.controller][createApiKey][Error]", error);
        res.status(500).json({ message: "There was an error when creating the API key" });
    }
};

export const updateApiKeyName: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = req.params.id as string;
        const { keyName } = req.body;

        if (!keyName || keyName.trim().length === 0) {
            res.status(400).json({ message: "keyName is required" });
            return;
        }

        const okPacket: OkPacket = await ApiKeysDao.updateApiKeyName(id, userId, keyName.trim());

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "API key updated successfully" });
        } else {
            res.status(404).json({ message: "API key not found" });
        }
    } catch (error) {
        console.error("[api-keys.controller][updateApiKeyName][Error]", error);
        res.status(500).json({ message: "There was an error when updating the API key" });
    }
};

export const deleteApiKey: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = req.params.id as string;

        const okPacket: OkPacket = await ApiKeysDao.deleteApiKey(id, userId);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "API key deleted successfully" });
        } else {
            res.status(404).json({ message: "API key not found" });
        }
    } catch (error) {
        console.error("[api-keys.controller][deleteApiKey][Error]", error);
        res.status(500).json({ message: "There was an error when deleting the API key" });
    }
};