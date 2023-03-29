import express from "express";
import dotenv from "dotenv";
import { readTxtFile, writeTxtFile } from "./filestream.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.API_URI;

// [GET] /
app.get("/", (req, res) => res.send("Express Server"));

// [GET] /api/v1/products/
// TODO: All products

// [POST] /api/v1/products/
// TODO: Create product and get created id

// [PATCH] /api/v1/products/{id}
// TODO: Update product and get product

// [DELETE] /api/v1/products/{id}
// TODO: Delete product an announce action `Product ${name} deleted`

app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

function errorLogger(err, req, res, next) {
  console.log(err);
  next();
}

function errorHandler(err, req, res, next) {
  res.send(400).json({
    messaje: err.messaje,
  });
}
