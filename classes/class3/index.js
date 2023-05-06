const express = require("express");

const PORT = 3000;
const API = "/api/v1";

const app = express();
app.use(express.json());

const errorLogger = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.send(400).json({
    messaje: err.messaje,
  });
};

const products = [
  {
    id: 1,
    name: "Gloves",
    price: 300,
    quantity: 2,
  },
  {
    id: 2,
    name: "Belt",
    price: 100,
    quantity: 6,
  },
  {
    id: 3,
    name: "Hat",
    price: 50,
    quantity: 3,
  },
];

app.get("/", (req, res) => {
  res.send("Express first app");
});

// [GET] /api/v1/products
app.get(`${API}/products`, (req, res) => {
  console.log(req.query);
  res.json(products);
});

// [GET] /api/v1/products/2
app.get(`${API}/products/:id`, (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product !== undefined) {
    res.json(product);
  } else {
    throw new Error(`Cannot find product with id ${productId}`);
  }
});

// [POST] /api/v1/products
app.post(`${API}/products`, (req, res) => {
  const product = req.body;
  if (!productExists(product)) {
    products.push(product);
    res.send(products.find((p) => p.id === product.id));
  } else {
    throw new Error(`Product already exists with id ${product.id}`);
  }
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost${PORT}`);
});

function productExists(product) {
  return products.find((p) => p.id === product.id) === undefined ? false : true;
}
