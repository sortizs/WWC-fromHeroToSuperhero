import { Router } from "express";
import { UserController } from "../controllers/index.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

userRouter
  .route("/:id")
  .get(UserController.getUserById)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
