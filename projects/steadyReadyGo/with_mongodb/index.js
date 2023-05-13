import "./config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/index.js";
import { errorHandler, errorLogger } from "./handlers/errorHandler.js";
import { default as sequelize } from "./utils/postgresql.js";

const PORT = process.env.PORT;
const API_URI = process.env.API_URI;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const app = express();

app.use(cors());
app.use(express.json());
app.use(API_URI, router);
app.use(errorLogger);
app.use(errorHandler);

async function serverStart() {
  await sequelize.sync();

  await mongoose.connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

serverStart();
