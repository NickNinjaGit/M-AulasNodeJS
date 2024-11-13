const express = require("express");
const app = express();
const port = 3000;

const path = require("path"); //core module

const basePath = path.join(__dirname, "templates"); //junta o diretório "__dirname" atual com a pasta "templates"

const checkAuth = function (req, res, next) {
  //função de middleware, que são funções executadas no meio das aplicações. EX: função de autenticação
  req.authStatus = false;

  if (req.authStatus) {
    console.log("Está logado, pode continuar");
    next();
  } else {
    console.log("Não está logado, faça o login para continuar");
    next();
  }
};

app.use(checkAuth); //invocamos nosso middleware a partir da função .use do express

app.get("/", (req, res) => {
  //req, é o que o programa recebe do cliente, e res, é uma resposta do programa.
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
