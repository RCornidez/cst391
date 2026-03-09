import { Request, RequestHandler, Response } from "express";
import * as BillsDao from "./bills.dao";

export const readBills: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const bills = await BillsDao.readBillsByUserId(userId);
        res.status(200).json(bills);
    } catch (error) {
        console.error("[bills.controller][readBills][Error]", error);
        res.status(500).json({ message: "There was an error when fetching bills" });
    }
};

export const readBillById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = req.params.id as string;

        const bills = await BillsDao.readBillById(id, userId);

        if (!bills.length) {
            res.status(404).json({ message: "Bill not found" });
            return;
        }

        res.status(200).json(bills[0]);
    } catch (error) {
        console.error("[bills.controller][readBillById][Error]", error);
        res.status(500).json({ message: "There was an error when fetching the bill" });
    }
};
