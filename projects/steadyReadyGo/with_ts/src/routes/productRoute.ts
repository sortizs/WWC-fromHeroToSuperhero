import { Router } from "express";
import { ProductController } from "../controllers";
import {
  validateFullProduct,
  validatePartialProduct,
} from "../handlers/validationHandler";

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
