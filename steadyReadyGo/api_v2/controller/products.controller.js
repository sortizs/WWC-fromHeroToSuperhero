import express from "express";
import * as productService from "../service/products.service.js";
import { fullSchema, partialSchema } from "../data/schema.js";

const productsRouter = express.Router();

// [GET] /api/v1/products
productsRouter.get("/", async (_, res, next) => {
  console.log("Products -> getProducts");
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(new Error(error));
  }
});

// [GET] /api/v1/products/id
productsRouter.get("/:id", async (req, res, next) => {
  console.log("Products -> getProduct");
  const productId = req.params.id;
  const product = await productService.getProduct(productId);
  if (product) {
    res.json(product);
  } else {
    next(new Error(`Could not get product with id ${productId}`));
  }
});

// [POST] /api/v1/products
productsRouter.post("/", async (req, res, next) => {
  const { error, value } = fullSchema.validate(req.body);
  if (error) {
    next(new Error(`Validation error: ${error.message}`));
  } else {
    try {
      const productCreated = await productService.saveProduct(value);
      res.status(201).json(productCreated);
    } catch (error) {
      next(new Error(error));
    }
  }
});

// [PATCH] /api/v1/products/id
productsRouter.patch("/:id", async (req, res, next) => {
  const { error, value } = partialSchema.validate(req.body);
  if (error) {
    next(new Error(`Validation error: ${error.message}`));
  } else {
    try {
      const productUpdated = await productService.updateProduct(
        req.params.id,
        value
      );
      res.json(productUpdated);
    } catch (error) {
      next(new Error(error));
    }
  }
});

// [DELETE] /api/v1/products/id
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const status = await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: status });
  } catch (error) {
    next(new Error(error));
  }
});

export default productsRouter;
