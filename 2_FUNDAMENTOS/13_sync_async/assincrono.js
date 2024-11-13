const fs = require("fs");

console.log("Início");

fs.writeFile("arquivo.txt", "oi", function (err) {
  setTimeout(function () {
    console.log("Arquivo criado!");
  }, 1000);
}); //comando assincrono é aquele que executa em paralelo ao síncrono, ele não segue a arquitetura do event loop

console.log("Fim");
