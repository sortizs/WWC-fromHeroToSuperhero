import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
// FIXME: Delete unnecesary variable
const uri = process.env.API_URI;

// FIXME: Move routing to Controller
app
  .route(uri)
  // [GET] /api/v1/products/
  .get(async (req, res) => {
    let products = await readTxtFile();
    res.json(products);
  })
  // [POST] /api/v1/products/
  .post(async (req, res) => {
    const products = await readTxtFile();
    let product = req.body;
    const lastProduct = products[products.length - 1];
    product.id = ++lastProduct.id;
    if (products.find((p) => p.id === product.id) === undefined) {
      await appendTxtFile(product);
      res.status(201).json(product);
    } else {
      throw new Error(`Product already exists with id ${product.id}`);
    }
  });

app
  .route(`${uri}/:id`)
  .get(async (req, res) => {
    const products = await readTxtFile();
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (product !== undefined) {
      res.json(product);
    } else {
      throw new Error(`Cannot find product with id ${productId}`);
    }
  })
  // [PATCH] /api/v1/products/{id}
  .patch(async (req, res) => {
    const productId = parseInt(req.params.id);
    const updates = req.body;
    const products = await readTxtFile();
    const product = products.find((p) => p.id === productId);
    if (product !== undefined) {
      product = { ...product, ...updates };
      await writeTxtFile(product);
      products = await readTxtFile();
      product = products.find((p) => p.id === productId);
      res.json(product);
    } else {
      throw new Error(`Cannot find product with id ${productId}`);
    }
  })
  // [DELETE] /api/v1/products/{id}
  // TODO: Delete product an announce action `Product ${name} deleted`
  .delete(async (req, res) => {
    const productId = parseInt(req.params.id);
    const products = await readTxtFile();
    const productIndex = products.findIndex((p) => p.id === productId);
    products.splice(productIndex, 1);
    res.send("Not implemented");
  });

app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

/**
 * Log error and pass them to the next middleware.
 * @param {object} err The error that needs to be logged
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware in the chain
 */
function errorLogger(err, req, res, next) {
  console.log(err);
  next(err);
}

/**
 * Handle errors and send a response with a estatus code of 400
 * and a JSON object containing the error message.
 * @param {object} err The error that needs to be logged
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware in the chain
 */
function errorHandler(err, req, res, next) {
  res.send(400).json({
    messaje: err.messaje,
  });
}
