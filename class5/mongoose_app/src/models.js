import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  stock: { type: Number, required: false, default: 0 },
  price: { type: Number, required: true },
});

export const Product = mongoose.model("products", ProductSchema);
