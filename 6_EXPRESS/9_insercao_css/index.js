const express = require("express");
const app = express();
const port = 3000;

const path = require("path"); //core module

const users = require("./users");

//ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// arquivos estáticos
app.use(express.static("public"));

const basePath = path.join(__dirname, "templates"); //junta o diretório "__dirname" atual com a pasta "templates"

app.use("/users", users); //middleware que inicia as rotas de /users entre as configurações gerais e a rota da home.

app.get("/", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
