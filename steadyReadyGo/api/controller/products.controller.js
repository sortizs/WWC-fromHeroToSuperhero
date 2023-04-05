import express from "express";
import * as productService from "../service/products.service.js";

const productsRouter = express.Router();

// [GET] /api/v1/products
productsRouter.get("/", async (req, res) => {
  const products = await productService.getProducts();
  if (products !== undefined) {
    res.json(products);
  } else {
    throw new Error("No products saved");
  }
});

// [GET] /api/v1/products/id
productsRouter.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await productService.getProduct(productId);
  if (product !== undefined) {
    res.json(product);
  } else {
    throw new Error(`Could not get product with id ${productId}`);
  }
});

// [POST] /api/v1/products
productsRouter.post("/", async (req, res) => {
  const product = req.body;
  await productService.saveProduct(product);
  const productCreated = await productService.getProduct(product.id);
  if (productCreated !== undefined) {
    res.status(201).json(productCreated);
  } else {
    throw new Error(`Could not save new product with id ${product.id}`);
  }
});

// [PATCH] /api/v1/products/id
productsRouter.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  const productUpdated = await productService.updateProduct(productId, product);
  if (productUpdated) {
    res.json(productUpdated);
  } else {
    throw new Error(`Could not upgrade product with id ${productId}`);
  }
});

// [DELETE] /api/v1/products/id
productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const status = await productService.deleteProduct(productId);
  if (status !== undefined) {
    res.status(200).json({ message: `${status}` });
  } else {
    throw new Error(`Could not delete product with id ${productId}`);
  }
});

export default productsRouter;
