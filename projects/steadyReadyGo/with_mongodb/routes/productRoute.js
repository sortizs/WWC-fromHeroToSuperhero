import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import {
  validateFullProduct,
  validatePartialProduct,
} from "../handlers/validationHandler.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(ProductController.getAllProducts)
  .post([validateFullProduct], ProductController.createProduct);

productRouter
  .route("/:id")
  .get(ProductController.getProductById)
  .patch([validatePartialProduct], ProductController.updateproduct)
  .delete(ProductController.deleteproduct);

export default productRouter;
