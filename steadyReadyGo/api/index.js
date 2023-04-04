import "./config.js";
import express from "express";
import cors from "cors";
import productsRouter from "./controller/products.controller.js";

const PORT = process.env.PORT || 3080;
const API_URI = process.env.API_URI;
const app = express();

app.use(cors());
app.use(express.json());

app.use(`${API_URI}`, productsRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

/**
 * Log error and pass them to the next middleware.
 * @param {object} err The error that needs to be logged
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware in the chain
 */
function errorLogger(err, req, res, next) {
  console.error(err);
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
