const http = require("http");
const fs = require("fs");

const port = 3000; //guarda a porta em uma variável

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" }); //escreve um cabeçalho de http que diz enviar um content de html.
      res.write(data); //requisita ao http exibir no site o arquivo lido pelo método fs.readFile, referenciado na variável data.
      return res.end(); //para o código encerrando essa requisição.
    });
  } else {
    fs.writeFile("arquivo.txt", name, function (err, data) {
      res.writeHead(302, {
        Location: "/",
      });
      return res.end();
    });
  }
});

server.listen(port, () => {
  //chamamos nosso servidor pela constante server e usamos listen() para permitir o servidor poder ser acessado (escutado) por outro.
  console.log(`Servidor rodando a porta ${port}`);
});
