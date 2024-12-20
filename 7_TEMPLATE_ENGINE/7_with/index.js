const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    tittle: "Aprender Node.js",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender Node.Js....",
    comments: 4,
  };
  res.render("blogpost", { post });
});

app.get("/", (req, res) => {
  const user = {
    name: "Nicolas",
    surname: "Fernandes",
    age: 15,
  };

  const auth = true;

  const approved = true;
  const palavra = "teste";
  res.render("home", { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
