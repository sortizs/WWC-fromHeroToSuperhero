import { readFile, appendFile, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Product } from "../data/product.js";

const PRODUCTS_DB = process.env.PRODUCTS_DB;

// Work-around to set __dirname on ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(`${__dirname}/..${PRODUCTS_DB}`);

/**
 * Reads a text file and returns an array of Product objects
 * @returns Array of Product objects
 */
export async function readTxtFile() {
  try {
    const data = await readFile(filePath, "utf-8");
    const lines = data.trim().split("\n");
    const products = lines.map((line) => {
      const [id, name, description, price, stock, category] = line.split(",");
      return new Product(id, name, description, price, stock, category);
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

export async function updateLine(product) {
  try {
    const data = Object.values(product).join(",");
    const fileContent = await readFile(filePath, "utf-8");
    const lines = fileContent.trim().split("\n");
    lines.forEach((line) => {
      if (line.startsWith(`${product.id},`)) {
        line = data;
      }
    });
    const newFileContent = lines.join("\n");
    await writeFile(filePath, newFileContent);
  } catch (error) {
    throw new Error(`Error updating line in file: ${error}`);
  }
}

export async function deleteLine(products) {
  try {
    const data = products.map((p) => Object.values(p).join(",")).join("\n");
    await writeFile(filePath, data);
  } catch (error) {
    throw new Error(`Error deleting line in file: ${error}`);
  }
}
