const http = require("http");

const port = 3000; //guarda a porta em uma variável

const server = http.createServer((req, res) => {
  //função que cria um servidor http  //req - request ou requisition, res - response

  res.write("Isso e um teste"); //recebe uma resposta do navegador emitindo uma mensagem.
  res.end(); //encerra todas as respostas do navegador.
});

server.listen(port, () => {
  //chamamos nosso servidor pela constante server e usamos listen() para permitir o servidor poder ser acessado (escutado) por outro.
  console.log(`Servidor rodando a porta ${port}`);
});
