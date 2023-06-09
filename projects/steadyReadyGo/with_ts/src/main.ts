import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { errorHandler, errorLogger } from "./handlers/errorHandler";

config();
