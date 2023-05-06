import "./config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler, errorLogger } from "./handlers/errorHandler.js";
import productsRouter from "./controller/products.controller.js";

const PORT = process.env.PORT;
const API_URI = process.env.API_URI;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const app = express();

app.use(cors());
app.use(express.json());
app.use(`${API_URI}/products`, productsRouter);

app.get(API_URI, (_, res) => {
  res.json({ status: "OK", message: "Steady, ready, GO! API V2." });
});

app.get(`${API_URI}/healthCheck`, (_, res) => {
  console.log(`> ${API_URI}/healthCheck`);
  res.json({ status: "OK - Healthy", message: "API V2 working fine." });
});

app.use(errorLogger);
app.use(errorHandler);

async function serverStart() {
  await mongoose.connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

serverStart();
