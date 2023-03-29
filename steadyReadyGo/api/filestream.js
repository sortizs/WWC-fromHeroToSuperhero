import { readFile, appendFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Work-around to set __dirname on ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(`${__dirname}/data/products.txt`);

export async function readTxtFile() {
  try {
    const data = await readFile(filePath, "utf-8");
    const lines = data.trim().split("\n");
    const products = lines.map((line) => {
      const [id, name, description, price, stock, category] = line.split(",");
      return {
        id: parseInt(id),
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
      };
    });
    return products;
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
}

export async function writeTxtFile(product) {
  try {
    const data = Object.values(product).join(",");
    await appendFile(filePath, `${data}\n`);
  } catch (error) {
    throw new Error(`Error writing file: ${error}`);
  }
}
