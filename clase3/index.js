const http = require("http");

const HOST = "localhost";
const PORT = 8000;

function writeHtmlResponse(res, htmlCode) {
  res.setHeader("Content-Type", "text/HTML");
  res.writeHead(200);
  res.end(htmlCode);
}

function getProducts(res, json) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(json));
}

const products = [
  {
    name: "Reloj",
    price: 300,
    quantity: 2,
  },
  {
    name: "Correa",
    price: 100,
    quantity: 6,
  },
  {
    name: "Sombrero",
    price: 50,
    quantity: 3,
  },
];

const server = http.createServer(async (req, res) => {
  let body = "";
  const url = req.url;
  const method = req.method;

  // Descargar y juntar los datos de la petición
  await req.on("data", (chunk) => (body += chunk));

  switch (url) {
    case "/api/v1/products":
      if (method === "GET") {
        getProducts(res, products);
      } else if (method === "POST") {
        const product = JSON.parse(body)
        products.push(product);
        getProducts(res, products);
      }
      break;
    default:
      writeHtmlResponse(res, `<h1>Codigo HTML en ${url}</h1>`);
      break;
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
