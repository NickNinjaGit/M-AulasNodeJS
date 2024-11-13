const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates"); //junta o diretório "__dirname" atual com a pasta "templates"

router.get("/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos`);

  res.sendFile(`${basePath}/userform.html`);
});

router.get("/:id", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  const id = req.params.id;

  //leitura da tabela users, resgatar um usuário do banco
  console.log(`Buscando pelo usuário: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;
