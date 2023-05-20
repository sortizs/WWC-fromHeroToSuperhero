import { Router } from "express";
import appRouter from "./appRoute.js";
import productRouter from "./productRoute.js";
import userRouter from "./userRoute.js";
import authRouter from "./authRoute.js";

export const router = Router();

router
  .use("/", appRouter)
  .use("/", authRouter)
  .use("/products", productRouter)
  .use("/users", userRouter);
