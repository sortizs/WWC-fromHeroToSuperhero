import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler, errorLogger } from "./handlers/errorHandler";
import { default as sequelize } from "./utils/postgresql";
import router from "./routes";

config();

const PORT = process.env.PORT;
const API_BASE = process.env.API_URI || '/api/v1/';
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const app = express();
app.use(cors());
app.use(express.json());
app.use(API_BASE, router)
app.use(errorLogger);
app.use(errorHandler);

async function serverStart() {
  await sequelize.sync();

  if (MONGODB_CONNECTION) {
    await mongoose.connect(MONGODB_CONNECTION);
  }

  app.listen(PORT, () => {
    console.log(`[Server]: Application is running at http://localhost:${PORT}`)
  })
}

serverStart();