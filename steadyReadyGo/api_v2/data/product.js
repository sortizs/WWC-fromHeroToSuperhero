import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: false, default: 0 },
    category: { type: String, required: true }
});

export const Product = mongoose.model('Product', productSchema);
