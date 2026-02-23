import { Router } from "express";
import * as BillingInfoController from "./billing-info.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.route("/billing").get(authenticate, BillingInfoController.readBillingInfo);
router.route("/billing").post(authenticate, BillingInfoController.createBillingInfo);
router.route("/billing").put(authenticate, BillingInfoController.updateBillingInfo);
router.route("/billing").delete(authenticate, BillingInfoController.deleteBillingInfo);

export default router;