import express from "express";
import dotenv from "dotenv";
import { readTxtFile, writeTxtFile } from "./filestream.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.API_URI;

// [GET] /
app.get("/", (req, res) => res.send("Steady, Ready, GO!"));

app
  .route(uri)
  // [GET] /api/v1/products/
  .get(async (req, res) => {
    let products = await readTxtFile();
    res.json(products);
  })
  // [POST] /api/v1/products/
  .post(async (req, res) => {
    const product = req.body;
    const products = await readTxtFile();
    if (products.find((p) => p.id === product.id) === undefined) {
      await writeTxtFile(product);
      res.status(201).json(product);
    } else {
      throw new Error(`Product already exists with id ${product.id}`);
    }
  });

// [PATCH] /api/v1/products/{id}
// TODO: Update product and get product

// [DELETE] /api/v1/products/{id}
// TODO: Delete product an announce action `Product ${name} deleted`

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
  next();
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
