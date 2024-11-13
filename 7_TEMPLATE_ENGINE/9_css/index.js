const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static('public'))

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

app.get("/blog", (req, res) => {
  const posts = [
    {
      tittle: "Aprender Node.js",
      category: "Javascript",
      comments: 4,
    },

    {
      tittle: "Aprender PHP",
      category: "PHP",
      comments: 5,
    },

    {
      tittle: "Aprender Python",
      category: "Python",
      comments: 2,
    },
  ];

  res.render("blog", { posts });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
