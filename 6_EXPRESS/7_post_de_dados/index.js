const express = require("express");
const app = express();
const port = 3000;

const path = require("path"); //core module

//criando um middleware para ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //utilizamos o middleware exprees.json para ler os dados do body

const basePath = path.join(__dirname, "templates"); //junta o diretório "__dirname" atual com a pasta "templates"

app.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

app.post("/users/save", (req, res) => {
  //a rota users/save recebe esses dados via o POST.
  console.log(req.body); //enviamos dados via POST, para um banco de dados por exemplo.

  const name = req.body.name; //a partir das informações coletadas do formulário pelo POST, armazenamos elas em variáveis
  const age = req.body.age;

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos`);

  res.sendFile(`${basePath}/userform.html`); //redirecionamos ele ao formulário novamente após isso.
});

app.get("/users/:id", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  const id = req.params.id;

  //leitura da tabela users, resgatar um usuário do banco
  console.log(`Buscando pelo usuário: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

app.get("/", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
