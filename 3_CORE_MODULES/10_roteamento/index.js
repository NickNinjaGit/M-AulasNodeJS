const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000; //guarda a porta em uma variável

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname.substring(1); //Lê a URL fragmentada depois da barra.

  if (filename.includes("html")) {
    //Se incluir html em filename, então execute a ação
    if (fs.existsSync(filename)) {
      //se o diretório da Url existir, ou seja, se a página existir.
      fs.readFile(filename, function (err, data) {
        //Leia o que tem dentro do arquivo da página.
        res.writeHead(200, { "Content-Type": "text/html" }); //diz ao http atraves do requisition 200, que queremos renderizar um hmtl
        res.write(data); //renderiza o arquivo html
        return res.end(); //encerra a requisição
      });
    } else {
      fs.readFile("404.html", function (err, data) {
        res.writeHead(404, { "Content-Type": "text/html" });
        //diz ao http atraves do requisition 404, que a página não foi encontrada e nos joga para a página "404.html".
        res.write(data); //renderiza o arquivo html
        return res.end(); //encerra a requisição
      });
    }
  }
});

server.listen(port, () => {
  //chamamos nosso servidor pela constante server e usamos listen() para permitir o servidor poder ser acessado (escutado) por outro.
  console.log(`Servidor rodando a porta ${port}`);
});
