import express, { Router } from "express";
import { Product } from "./models.js";

const routes = express.Router();

routes.get("/health", (_, res) =>
  res.json({
    status: "ok",
    hasConnection: !!process.env.MONGODB_CONNECTION,
  })
);

const BASE = "/products";

// [GET] /api/v1/products
routes.get(BASE, async (req, res) => {
  console.log("Products -> GetAll");
  const products = await Product.find();
  res.json(products);
});

// [GET] /api/v1/products/id

routes.get(`${BASE}/:id`, async (req, res) => {
  console.log("Products -> GetById");
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// [POST] /api/v1/products
routes.post(BASE, async (req, res) => {
  console.log("Products -> Create");
  const product = await new Product(req.body).save();
  res.json(product);
});

// [PATCH] /api/v1/products/id
routes.patch(`${BASE}/:id`, async (req, res) => {
  console.log("Products -> Update");
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
  res.json(product);
});

// [DELETE] /api/v1/products/id
routes.delete(`${BASE}/:id`, async (req, res) => {
  console.log("Products -> Update");
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
});

export default routes;
