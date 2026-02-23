import { Request, RequestHandler, Response } from "express";
import { OkPacket } from "mysql";
import * as ProvisionsDao from "./provisions.dao";
import { provisionDroplet, deprovisionDroplet } from "../../services/provision.service";
import { ProvisionStatus } from "../enums";


export const readProvisions: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const provisions = await ProvisionsDao.readProvisionsByUserId(userId);
        res.status(200).json(provisions);
    } catch (error) {
        console.error("[provisions.controller][readProvisions][Error]", error);
        res.status(500).json({ message: "There was an error when fetching provisions" });
    }
};

export const readProvisionById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = req.params.id as string;

        const provisions = await ProvisionsDao.readProvisionById(id, userId);

        if (!provisions.length) {
            res.status(404).json({ message: "Provision not found" });
            return;
        }

        res.status(200).json(provisions[0]);
    } catch (error) {
        console.error("[provisions.controller][readProvisionById][Error]", error);
        res.status(500).json({ message: "There was an error when fetching the provision" });
    }
};

export const createProvision: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { serverName, serverSize, githubRepoUrl } = req.body;

        // create the provision record first with PENDING status
        const provisionId = await ProvisionsDao.createProvision(userId, serverName, serverSize, githubRepoUrl ?? null);

        // update to PROVISIONING
        await ProvisionsDao.updateProvisionStatus(provisionId, userId, ProvisionStatus.PROVISIONING, null, null, null);

        // provisioning the droplet
        const result = await provisionDroplet({ serverName, serverSize, githubRepoUrl });

        if (!result.success) {
            await ProvisionsDao.updateProvisionStatus(provisionId, userId, ProvisionStatus.FAILED, null, null, null);
            throw new Error("Droplet provisioning failed");
        }

        // update to ACTIVE with droplet details
        await ProvisionsDao.updateProvisionStatus(
            provisionId,
            userId,
            ProvisionStatus.ACTIVE,
            result.dropletId,
            result.ipAddress,
            result.provisionedAt
        );

        res.status(201).json({ message: "Server provisioned successfully", ipAddress: result.ipAddress });
    } catch (error) {
        console.error("[provisions.controller][createProvision][Error]", error);
        res.status(500).json({ message: "There was an error when provisioning the server" });
    }
};

export const deleteProvision: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = req.params.id as string;

        const provisions = await ProvisionsDao.readProvisionById(id, userId);

        if (!provisions.length) {
            res.status(404).json({ message: "Provision not found" });
            return;
        }

        const provision = provisions[0];

        if (provision.dropletId) {
            const deprovisioned = await deprovisionDroplet(provision.dropletId);
            if (!deprovisioned) throw new Error("Droplet deprovisioning failed");
        }

        const okPacket: OkPacket = await ProvisionsDao.deleteProvision(id, userId);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "Server deprovisioned successfully" });
        } else {
            res.status(404).json({ message: "Provision not found" });
        }
    } catch (error) {
        console.error("[provisions.controller][deleteProvision][Error]", error);
        res.status(500).json({ message: "There was an error when deprovisioning the server" });
    }
};