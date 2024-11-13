const express = require("express");
const app = express();
const port = 3000;

const path = require("path"); //core module

const basePath = path.join(__dirname, "templates"); //junta o diretório atual com a pasta "templates"

app.get("/", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
