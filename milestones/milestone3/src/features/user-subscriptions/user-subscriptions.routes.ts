import { Router } from "express";
import * as UserSubscriptionsController from "./user-subscriptions.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.route("/subscription-plans").get(UserSubscriptionsController.readSubscriptionPlans);
router.route("/subscription-plans/:id").get(UserSubscriptionsController.readSubscriptionPlanById);
router.route("/subscriptions").get(authenticate, UserSubscriptionsController.readSubscription);
router.route("/subscriptions").post(authenticate, UserSubscriptionsController.createSubscription);
router.route("/subscriptions").put(authenticate, UserSubscriptionsController.updateSubscription);
router.route("/subscriptions").delete(authenticate, UserSubscriptionsController.cancelSubscription);

export default router;