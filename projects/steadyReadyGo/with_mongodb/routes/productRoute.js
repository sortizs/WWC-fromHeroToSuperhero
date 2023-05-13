import { Router } from "express";
import { ProductController } from "../controllers/index.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(ProductController.getAllProducts)
  .post(ProductController.createProduct);

productRouter
  .route("/:id")
  .get(ProductController.getProductById)
  .patch(ProductController.updateproduct)
  .delete(ProductController.deleteproduct);

export default productRouter;
