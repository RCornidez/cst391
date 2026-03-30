import { Request, RequestHandler, Response } from "express";
import { OkPacket } from "mysql";
import * as UserSubscriptionsDao from "./user-subscriptions.dao";


export const readSubscriptionPlans: RequestHandler = async (req: Request, res: Response) => {
    try {
        const plans = await UserSubscriptionsDao.readSubscriptionPlans();
        res.status(200).json(plans);
    } catch (error) {
        console.error("[user-subscriptions.controller][readSubscriptionPlans][Error]", error);
        res.status(500).json({ message: "There was an error when fetching subscription plans" });
    }
};

export const readSubscriptionPlanById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const plans = await UserSubscriptionsDao.readSubscriptionPlanById(id);

        if (!plans.length) {
            res.status(404).json({ message: "Subscription plan not found" });
            return;
        }

        res.status(200).json(plans[0]);
    } catch (error) {
        console.error("[user-subscriptions.controller][readSubscriptionPlanById][Error]", error);
        res.status(500).json({ message: "There was an error when fetching the subscription plan" });
    }
};

export const readSubscription: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const subscriptions = await UserSubscriptionsDao.readSubscriptionByUserId(userId);

        if (!subscriptions.length) {
            res.status(404).json({ message: "No active subscription found" });
            return;
        }

        res.status(200).json(subscriptions[0]);
    } catch (error) {
        console.error("[user-subscriptions.controller][readSubscription][Error]", error);
        res.status(500).json({ message: "There was an error when fetching the subscription" });
    }
};

export const createSubscription: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { planId } = req.body;

        const existing = await UserSubscriptionsDao.readSubscriptionByUserId(userId);
        if (existing.length && existing[0].status == 'ACTIVE') {
            res.status(409).json({ message: "User already has an active subscription" });
            return;
        }

        const okPacket: OkPacket = await UserSubscriptionsDao.createSubscription(userId, planId);

        if (okPacket.affectedRows > 0) {
            res.status(201).json({ message: "Subscription created successfully" });
        } else {
            throw new Error("Subscription not created");
        }
    } catch (error) {
        console.error("[user-subscriptions.controller][createSubscription][Error]", error);
        res.status(500).json({ message: "There was an error when creating the subscription" });
    }
};

export const updateSubscription: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { planId } = req.body;

        const okPacket: OkPacket = await UserSubscriptionsDao.updateSubscription(userId, planId);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "Subscription updated successfully" });
        } else {
            res.status(404).json({ message: "No active subscription found" });
        }
    } catch (error) {
        console.error("[user-subscriptions.controller][updateSubscription][Error]", error);
        res.status(500).json({ message: "There was an error when updating the subscription" });
    }
};

export const cancelSubscription: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const okPacket: OkPacket = await UserSubscriptionsDao.cancelSubscription(userId);

        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: "Subscription cancelled successfully" });
        } else {
            res.status(404).json({ message: "No active subscription found" });
        }
    } catch (error) {
        console.error("[user-subscriptions.controller][cancelSubscription][Error]", error);
        res.status(500).json({ message: "There was an error when cancelling the subscription" });
    }
};