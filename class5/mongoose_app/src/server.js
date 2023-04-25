import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3010,
  API_URI = process.env.API_URI,
  MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

const app = express();
app.use(express.json());
app.use(API_URI, routes);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

async function start() {
  try {
    await mongoose.connect(MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
