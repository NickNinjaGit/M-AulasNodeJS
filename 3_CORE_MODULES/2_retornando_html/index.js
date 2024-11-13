const http = require("http");

const port = 3000; //guarda a porta em uma variável

const server = http.createServer((req, res) => {
  //função que cria um servidor http  //req - request ou requisition, res - response
  res.statusCode = 200; //controla o statusCode, uma variável que controla as respostas do servidor.
  res.setHeader("Contenty-Type", "text/html"); //Adiciona ao conteúdo que pode ser lido ao site o HTML
  res.end("<h1>Olá server HTML!</h1><p>Testando atualização"); //exibe uma mensagem em header 1.
});

server.listen(port, () => {
  //chamamos nosso servidor pela constante server e usamos listen() para permitir o servidor poder ser acessado (escutado) por outro.
  console.log(`Servidor rodando a porta ${port}`);
});
