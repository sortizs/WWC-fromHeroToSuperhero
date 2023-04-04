import express from "express";
import * as productService from "../service/products.service.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
});

productsRouter.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await productService.getProduct(productId);
  res.json(product);
});

productsRouter.post("/", async (req, res) => {
  const product = req.body;
  await productService.saveProduct(product);
  const productCreated = await productService.getProduct(product.id);
  res.status(201).json(productCreated);
});

productsRouter.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  const productUpdated = await productService.updateProduct(productId, product);
  res.json(productUpdated);
});

productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const status = await productService.deleteProduct(productId);
  res.status(200).json({ message: `${status}` });
});

export default productsRouter;
