import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { isAuth } from "../handlers/authHandler.js";

const authRouter = Router();

authRouter.route("/login").post(AuthController.login);

authRouter.route("/confidential").get([isAuth], AuthController.restrictedView);

export default authRouter;
