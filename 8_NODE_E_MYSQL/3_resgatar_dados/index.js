const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

port = "3000";

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  // Verifique se title e pageqty não estão vazios
  if (!title || !pageqty) {
    res.status(400).send("Title and page quantity are required.");
    return;
  }

  const sql = `INSERT INTO books (title, pageqty) VALUES (?, ?)`;
  
  conn.query(sql, [title, pageqty], function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while inserting the book.");
    } else {
      res.redirect("/books");
    }
  });
});


app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books" //* significa all no Mysql

  conn.query(sql, function(err, data){ 
    if (err) {
      console.log(err)
      return
    }
    const books = data
    console.log(books)
    res.render('books', {books})
  })
})

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql1",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectou ao MySQL");
    app.listen(3000);
  }
});
