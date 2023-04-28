import { Product } from "../data/product.js";

/**
 * Get all the products saved in the database
 * @returns {Product[]} Array of products
 */
export async function getProducts() {
  const products = await Product.find();
  if (products.length > 0) {
    return products;
  } else {
    throw new Error(`No products saved.`);
  }
}

/**
 * Creates a new product in the database if does not exists
 * @param {Product} product Product to be created
 */
export async function saveProduct(product) {
  const createdProduct = await new Product(product).save();
  if (createdProduct) {
    return createdProduct;
  } else {
    throw new Error(`Product ${product.name} could not be created.`);
  }
}

/**
 * Updates the given product in the database
 * @param {string} productId Product id
 * @param {Product} product Product to be updated
 * @returns {Promise<Product>} Updated product
 */
export async function updateProduct(productId, product) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
    returnDocument: "after",
  });
  if (updatedProduct) {
    return updatedProduct;
  } else {
    throw new Error(`No product with id ${productId} found.`);
  }
}

/**
 * Deletes the given product from the database
 * @param {number} productId Product Id
 * @returns {string} Confirmation message with the product name deleted
 */
export async function deleteProduct(productId) {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (deletedProduct) {
    return `Product ${deletedProduct.name} deleted`;
  } else {
    throw new Error(`No product with id ${productId} found`);
  }
}

/**
 * Gets the specific product from the database
 * @param {number} productId Product Id
 * @returns {Promise<Product>} Product
 */
export async function getProduct(productId) {
  const product = await Product.findById(productId);
  return product;
}
