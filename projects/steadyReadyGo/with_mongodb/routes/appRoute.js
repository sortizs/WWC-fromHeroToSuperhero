import { Router } from "express";
import { AppController } from "../controllers/index.js";

const appRouter = Router();

appRouter.route("/").get(AppController.welcomePage);

appRouter.route("/health").get(AppController.healthCheck);

export default appRouter;
