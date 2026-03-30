import { Router } from "express";
import * as ApiKeysController from "./api-keys.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.route("/keys").get(authenticate, ApiKeysController.readApiKeys);
router.route("/keys").post(authenticate, ApiKeysController.createApiKey);
router.route("/keys/:id").put(authenticate, ApiKeysController.updateApiKeyName);
router.route("/keys/:id").delete(authenticate, ApiKeysController.deleteApiKey);

export default router;