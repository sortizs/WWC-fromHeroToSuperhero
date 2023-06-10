import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: false, default: 0 },
    price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;