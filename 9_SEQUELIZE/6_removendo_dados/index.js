const express = require("express");
const exphbs = require("express-handlebars");

const conn = require("./db/conn");

const User = require("./models/User");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
// Habilita a opção de usar urls dinâmicas e envia as informações através de um json.
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Routers
app.get("/users/create", (req, res) => {
  res.render("adduser");
});

//criação do Usuário
app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  if (!name || !occupation) {
    res.status(400).send("Usuário e ocupação são requeridos");
    return;
  }

  console.log(req.body);

  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

//Exibição de página única de um usuário específico baseado no ID da url dinâmica
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  //resgata o id do usuário específico no banco
  const user = await User.findOne({ raw: true, where: { id: id } });
  //renderiza na view as informações do usuário com id especifico informado pelo banco.
  res.render("userview", { user });
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render("useredit", { user });
});

//Exibe todos os usuários na home page através da função User.findAll para a consulta do banco no código
app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users: users });
});

//Conexão com o banco de dados antes da execução do server (Baseado em Promises)
conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
