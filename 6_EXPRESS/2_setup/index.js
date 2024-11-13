const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  res.send("Olá mundo!!");
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
