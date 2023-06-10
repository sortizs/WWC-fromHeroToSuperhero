import { Router } from "express";
import { AuthController } from "../controllers/index";
import { isAuth } from "../handlers/authHandler";

const authRouter = Router();

authRouter.route("/login").post(AuthController.login);

authRouter.route("/confidential").get([isAuth], AuthController.restrictedView);

export default authRouter;
