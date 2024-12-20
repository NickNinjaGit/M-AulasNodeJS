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

  // Verifique se usuário não colocou um título
  if (!title) {
    res.status(400).send("ERRO: Título e quantidade são necessários");
    return;
  }

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`; 
  //query (comando) para inserir um valor de título e pageqty no banco de dados.

  //consulta o banco de dados para realizar a ação de enviar os valores do código para o banco nas tabelas de title e pageqty
  conn.query(sql, [title, pageqty], function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while inserting the book.");
    } else {
      res.redirect("/books"); //redirecioa o usuário para a página de lista de livros
    }
  });
});

//rota da lista dos livros
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books"; //* significa all no Mysql, seleciona todos os items da tabela books

  //após consultar os dados de books, renderize o resultado na view books.
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const books = data; //obj json com as informações da tabela books
    console.log(books);
    res.render("books", { books }); //renderize esses dados para books para conectar o html com o código
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id; //pega o parâmetro id da url para exibir a rota
  const sql = `SELECT * FROM books WHERE id = ${id}`; //consulta no banco de dados um id = id da rota
  conn.query(sql, function (err, data) { 
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0]; //traduz a informação coletada do banco para um array a partir do índice 0

    res.render("book", { book }); //renderiza book na view 'book'
  });
});

//rota com um formulário para inserir valores para edição de dados na tabela.
app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sql, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];

    res.render("edit_book", { book }); //renderiza o formulário de edicão na view edit_book a patir do id do livro.
  })
})

//rota para atualizar os dados da edicao
app.post('/books/updatebook', (req, res) => {
  
  //coleta as informações do bodyParser enviadas pelo method POST do formulário
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = '${id}'`

  //consulta o banco para executar o comando de atualização de dados (U do CRUD)
  conn.query(sql, function(err) {
    if(err) {
      console.log(err)
      return
    }
    res.redirect('/books') //redirecioa o usuário para lista de livros
  })
})

app.post('/books/remove/:id', (req, res) => {

  const id = req.params.id
  const sql = `DELETE FROM books WHERE id = '${id}'`

  conn.query(sql, function(err) {
    if(err) {
      console.log(err)
      return
    }
    res.redirect('/books')
  })
})

//objeto que representa a conexão com o banco nodemysql1
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql1",
});

//após de conectar com sucesso ao banco, inicie o servidor.
conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectou ao MySQL");
    app.listen(3000);
  }
});
