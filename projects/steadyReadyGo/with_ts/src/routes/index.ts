import path from "path";
import { Router } from "express";
import appRouter from "./appRoute";
import productRouter from "./productRoute";
import userRouter from "./userRoute";
import authRouter from "./authRoute";

const router = Router();

router
  .use("/", appRouter)
  .use("/", authRouter)
  .use("/products", productRouter)
  .use("/users", userRouter);

/*
if (process.env.NODE_ENV !== "production") {
  router.get("/index", (req, res) => {
    res.sendFile(path.resolve("views/login.html"));
  });
  router.get("/playground", (req, res) => {
    res.sendFile(path.resolve("views/playground.html"));
  });
}
*/

export default router;
