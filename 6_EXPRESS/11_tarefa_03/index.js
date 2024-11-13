//module config
const express = require("express");
const app = express();
const port = "5000";
const path = require("path");
const produtos = require("./public/routers/produtos");

//path config
const html_directory = path.join(__dirname, "public", "html_files");
const css_directory = path.join(__dirname, "public", "css_files");

//interpretacao de arquivos estáticos
app.use(express.static(css_directory));

//middleware que intercepta as conexões com a rotas que comecem com /produtos EX: /produtos/catalogo
app.use("/produtos", produtos);

app.get("/", (req, res) => {
  res.sendFile(`${html_directory}/index.html`);
});

app.use(function (req, res, next) {
  res.status(404).sendFile(`${html_directory}/404.html`);
});

app.listen(port, () => {
  console.log("Servidor rodando...");
});
