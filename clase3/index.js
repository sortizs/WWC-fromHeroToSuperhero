const http = require("http");

const HOST = "localhost";
const PORT = 8000;

function writeHtmlResponse(res, htmlCode) {
    res.setHeader("Content-Type", "text/HTML");
    res.writeHead(200);
    res.end(htmlCode);
};

const server = http.createServer((req, res) => {
    const url = req.url;
    writeHtmlResponse(res, `<h1>Codigo HTML en ${url}</h1>`);
});

server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
})
