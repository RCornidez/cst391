import { Router } from "express";
import * as ProvisionsController from "./provisions.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.route("/provisions").get(authenticate, ProvisionsController.readProvisions);
router.route("/provisions/:id").get(authenticate, ProvisionsController.readProvisionById);
router.route("/provisions").post(authenticate, ProvisionsController.createProvision);
router.route("/provisions/:id").delete(authenticate, ProvisionsController.deleteProvision);

export default router;