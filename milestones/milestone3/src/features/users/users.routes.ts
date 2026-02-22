import { Router } from "express";
import * as UsersController from "./users.controller";

const router = Router();

router.route("/auth/register").post(UsersController.register);
router.route("/auth/login").post(UsersController.login);
router.route("/auth/logout").post(UsersController.logout);

export default router;