import { Product } from "../data/product.js";
import {
  appendTxtFile,
  deleteLine,
  readTxtFile,
  updateLine,
} from "./filestream.js";

/**
 * Get all the products saved in the database
 * @returns {Product[]} Array of products
 */
export async function getProducts() {
  const products = await readTxtFile();
  if (products) {
    return products;
  } else {
    throw new Error(`No products saved on the list`);
  }
}

/**
 * Creates a new product in the database if does not exists
 * @param {Product} product Product to be created
 */
export async function saveProduct(product) {
  const productExists = await getProduct(product.id);
  if (productExists === undefined) {
    await appendTxtFile(product);
  } else {
    throw new Error(`Product with id ${product.id} already exists.`);
  }
}

/**
 * Updates the given product in the database
 * @param {number} productId Product id
 * @param {Product} productUpdated Product to be updated
 * @returns {Promise<Product>} Updated product
 */
export async function updateProduct(productId, productUpdated) {
  const product = await getProduct(productId);
  if (product) {
    const updatedProduct = { ...product, ...productUpdated };
    await updateLine(updatedProduct);
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
  const products = await readTxtFile();
  const product = await getProduct(productId);
  const indexOfProduct = products.findIndex((p) => p.id === productId);
  if (indexOfProduct !== -1) {
    products.splice(indexOfProduct, 1);
    await deleteLine(products);
    return `Product ${product.name} deleted`;
  } else {
    throw new Error(`No product with id ${productId} found`);
  }
}

/**
 * Gets the specific product from the database
 * @param {number} id Product Id
 * @returns {Promise<Product>} Product
 */
export async function getProduct(id) {
  const products = await readTxtFile();
  const product = products.find((p) => p.id === id);
  return product;
}
