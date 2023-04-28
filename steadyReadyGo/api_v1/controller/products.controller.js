import express from "express";
import * as productService from "../service/products.service.js";
import { fullSchema, partialSchema } from "../data/schema.js";

const productsRouter = express.Router();

// [GET] /api/v1/products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(new Error(error));
  }
});

// [GET] /api/v1/products/id
productsRouter.get("/:id", async (req, res, next) => {
  const productId = parseInt(req.params.id);
  const product = await productService.getProduct(productId);
  if (product !== undefined) {
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
      await productService.saveProduct(value);
      const productCreated = await productService.getProduct(value.id);
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
    const productId = parseInt(req.params.id);
    try {
      const productUpdated = await productService.updateProduct(
        productId,
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
    const productId = parseInt(req.params.id);
    const status = await productService.deleteProduct(productId);
    res.status(200).json({ message: `${status}` });
  } catch (error) {
    next(new Error(error));
  }
});

export default productsRouter;
