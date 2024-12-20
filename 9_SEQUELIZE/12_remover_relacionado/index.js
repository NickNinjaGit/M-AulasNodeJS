const express = require("express");
const exphbs = require("express-handlebars");

const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

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

//Exibe todos os usuários na home page através da função User.findAll para a consulta do banco no código
app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users: users });
});

//Rota do Formulário de criação de Usuário
app.get("/users/create", (req, res) => {
  res.render("adduser");
});

//Coleta das informações do formulário de criação de Usuário
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

//Delete o usuário específico pelo ID do banco de dados
app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

//Renderiza a página de edição de usuário baseado no ID dele.
app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ include: Address, where: { id: id } });
    res.render("useredit", { user: user.get({ plain: true }) });
  } catch (error) {
    console.log(error)
  }
});

//Coleta as informações do usuário pelo formulário e atualiza o banco de dados.
app.post("/users/edit", async (req, res) => {
  const id = req.body.id;
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

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });

  res.redirect("/");
});

//Criação de um novo endereço que é uma tabela Address relacioanada à tabela Users
app.post("/address/create", (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    street,
    number,
    city,
    UserId,
  };

  Address.create(address)
    .then(res.redirect(`/users/edit/${UserId}`))
    .catch((err) => console.log(err));
});

app.post("/address/delete", async (req, res) => {
  const UserId = req.body.UserId;
  const id = req.body.id
  
  await Address.destroy({
    where: {id: id}
  })

  res.redirect(`/users/edit/${UserId}`)
})

//Conexão com o banco de dados (através do conn.js) antes da execução do server (Baseado em Promises)
conn
  .sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
