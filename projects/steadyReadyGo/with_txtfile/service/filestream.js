import { readFile, appendFile, writeFile, access } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Product } from "../data/product.js";

const PRODUCTS_DB = process.env.PRODUCTS_DB;

// Work-around to set __dirname on ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(`${__dirname}/..${PRODUCTS_DB}`);

export function createDb() {
  access(filePath).catch(() => writeFile(filePath, ""));
}

/**
 * Reads a text file and returns an array of Product objects
 * @returns {Promise<Product[]>} Array of Products
 */
export async function readTxtFile() {
  try {
    let data;
    access(filePath)
      .then(() => fs.readFile(filePath, "utf-8"))
      .then((fileContent) => (data = fileContent))
      .catch((err) => {
        if (err.code === "ENOENT") {
          console.error("File does not exist. Creating file...");
          return writeFile(filePath, "")
            .then(() => {
              console.log("File created");
              return fs.readFile(filePath, "utf-8");
            })
            .then((fileContent) => (data = fileContent))
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          console.error(err);
        }
      });
    if (data === "") return null;
    const lines = data.trim().split("\n");
    const products = lines.map((line) => {
      const [id, name, description, category, stock, price] = line.split(",");
      return new Product(id, name, description, category, stock, price);
    });
    return products;
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
}

/**
 * Append a comma-separated list of values to a given file.
 * @param {Product} product JSON object containing the data to be writen to the file
 */
export async function appendTxtFile(product) {
  try {
    const data = Object.values(product).join(",");
    await appendFile(filePath, `${data}\n`);
  } catch (error) {
    throw new Error(`Error appending file: ${error}`);
  }
}

/**
 * Updates a line in a text file
 * @param {Product} product JSON object containing the data to be updated in the file
 */
export async function updateLine(product) {
  try {
    const products = await readTxtFile();
    const indexOf = products.findIndex((p) => p.id === product.id);
    products[indexOf] = product;
    const data = products.map((prod) => Object.values(prod)).join("\n");
    await writeFile(filePath, data + "\n");
  } catch (error) {
    throw new Error(`Error updating line in file: ${error}`);
  }
}

/**
 * Deletes a file from a file writing the updated list of Products
 * @param {Product[]} products Array of products
 */
export async function deleteLine(products) {
  try {
    const data = products.map((p) => Object.values(p).join(",")).join("\n");
    await writeFile(filePath, data + "\n");
  } catch (error) {
    throw new Error(`Error deleting line in file: ${error}`);
  }
}
