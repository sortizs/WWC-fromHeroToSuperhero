import { Product } from "../models/index.js";
import { fullProductSchema, partialProductSchema } from "../models/schema.js";

export async function getAllProducts(_, res, next) {
  console.log("Product -> getAllProducts");
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(new Error(err.message));
  }
}

export async function createProduct(req, res, next) {
  console.log("Product -> createProduct");
  try {
    const product = await new Product(req.body).save();
    res.json(product);
  } catch (err) {
    next(new Error(err.message));
  }
}

export async function getProductById(req, res, next) {
  console.log("Product -> getProductById");
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    next(new Error(`No product with id: ${productId}`));
  } else {
    res.json(product);
  }
}

export async function deleteproduct(req, res, next) {
  console.log("Product -> deleteProduct");
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);
  if (!product){
    next(new Error(`No product with id: ${productId}`))
  } else {
    res.json({
      code: 200,
      status: "Ok",
      message: `Product ${product.name} has been deleted`,
    });
  }
}

export async function updateproduct(req, res, next) {
  console.log("Product -> updateproduct");
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      returnDocument: "after",
    });
    res.json(product);
  } catch (err) {
    next(new Error(err.message));
  }
}
