import { Router } from "express";
import { UserController } from "../controllers/index.js";
import {
  validateFullUser,
  validatePartialUser,
} from "../handlers/validationHandler.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(UserController.getAllUsers)
  .post([validateFullUser], UserController.createUser);

userRouter
  .route("/:id")
  .get(UserController.getUserById)
  .patch([validatePartialUser], UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
