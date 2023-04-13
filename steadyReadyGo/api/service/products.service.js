import {
  appendTxtFile,
  deleteLine,
  readTxtFile,
  updateLine
} from "./filestream.js";

export async function getProducts() {
  const products = readTxtFile();
  return products;
}

export async function saveProduct(product) {
  const productExists = await getProduct(product.id);
  if (productExists === undefined) {
    await appendTxtFile(product);
  } else {
    throw new Error(`Product with id ${product.id} already exists.`);
  }
}

export async function updateProduct(productId, productUpdated) {
  const product = await getProduct(productId);
  if (product !== undefined) {
    const updatedProduct = { ...product, ...productUpdated };
    await updateLine(updatedProduct);
    return updatedProduct;
  } else {
    throw new Error(`No product with id ${productId} found.`);
  }
}

export async function deleteProduct(productId) {
  const products = await getProducts();
  const product = await getProduct(productId);
  if (product !== undefined) {
    const indexOfProduct = products.findIndex((p) => p.id === productId);
    products.splice(indexOfProduct, 1);
    await deleteLine(products);
    return `Product ${product.name} deleted`;
  } else {
    throw new Error(`No product with id ${productId} found`);
  }
}

export async function getProduct(id) {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  return product;
}
