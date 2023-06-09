import "./config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import { router } from "./routes/index.js";
import { errorHandler, errorLogger } from "./handlers/errorHandler.js";
import { default as sequelize } from "./utils/postgresql.js";
import { socketEvents } from "./utils/socket.js";

const PORT = process.env.PORT;
const API_URI = process.env.API_URI;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origins: "*" } });
io.on("connection", socketEvents);

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

  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

serverStart();
