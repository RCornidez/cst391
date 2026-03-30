import { Request, RequestHandler, Response } from "express";
import { OkPacket } from "mysql";
import * as BillingInfoDao from "./billing-info.dao";
import { encryptKey } from "../../utilities/crypto";
import { createPaymentToken, updatePaymentToken, deletePaymentToken } from "../../services/external-payment.service";

export const readBillingInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const billingInfo = await BillingInfoDao.readBillingInfoByUserId(userId);

        if (!billingInfo.length) {
            res.status(404).json({ message: "No billing info found" });
            return;
        }

        res.status(200).json(billingInfo[0]);
    } catch (error) {
        console.error("[billing-info.controller][readBillingInfo][Error]", error);
        res.status(500).json({ message: "There was an error when fetching billing info" });
    }
};

export const createBillingInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { nameOnCard, address, state, zip, cardNumber, expMonth, expYear, cvv, cardType } = req.body;

        const result = await createPaymentToken({ nameOnCard, cardNumber, expMonth, expYear, cvv, address, state, zip });
        if (!result.success) throw new Error("Payment tokenization failed");

        const encryptedPaymentProviderToken = encryptKey(result.token);
        const cardLastFour = result.last4;

        const okPacket: OkPacket = await BillingInfoDao.createBillingInfo(userId, encryptedPaymentProviderToken, cardLastFour, cardType);

        if (okPacket.affectedRows > 0) {
            res.status(201).json({ message: "Billing info created successfully" });
        } else {
            throw new Error("Billing info not created");
        }
    } catch (error) {
        console.error("[billing-info.controller][createBillingInfo][Error]", error);
        res.status(500).json({ message: "There was an error when creating billing info" });
    }
};

export const updateBillingInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { nameOnCard, address, state, zip, cardNumber, expMonth, expYear, cvv, cardType } = req.body;

        const result = await updatePaymentToken({ nameOnCard, cardNumber, expMonth, expYear, cvv, address, state, zip });
        if (!result.success) throw new Error("Payment tokenization failed");

        const encryptedPaymentProviderToken = encryptKey(result.token);
        const cardLastFour = result.last4;

        const okPacket: OkPacket = await BillingInfoDao.updateBillingInfo(userId, encryptedPaymentProviderToken, cardLastFour, cardType);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "Billing info updated successfully" });
        } else {
            res.status(404).json({ message: "Billing info not found" });
        }
    } catch (error) {
        console.error("[billing-info.controller][updateBillingInfo][Error]", error);
        res.status(500).json({ message: "There was an error when updating billing info" });
    }
};

export const deleteBillingInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const existing = await BillingInfoDao.readBillingInfoByUserId(userId);
        if (!existing.length) {
            res.status(404).json({ message: "Billing info not found" });
            return;
        }

        const tokenDeleted = await deletePaymentToken(existing[0].paymentProviderToken);
        if (!tokenDeleted) throw new Error("Failed to delete payment token");

        const okPacket: OkPacket = await BillingInfoDao.deleteBillingInfo(userId);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "Billing info deleted successfully" });
        } else {
            res.status(404).json({ message: "Billing info not found" });
        }
    } catch (error) {
        console.error("[billing-info.controller][deleteBillingInfo][Error]", error);
        res.status(500).json({ message: "There was an error when deleting billing info" });
    }
};