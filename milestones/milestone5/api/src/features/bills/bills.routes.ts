import { Router } from "express";
import * as BillsController from "./bills.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.route("/bills").get(authenticate, BillsController.readBills);
router.route("/bills/:id").get(authenticate, BillsController.readBillById);

export default router;