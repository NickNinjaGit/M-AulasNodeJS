const fs = require("fs");

console.log("Início");

fs.writeFileSync("arquivo.txt", "oi"); //comando sincrono espera executar algo para continuar o código.

console.log("Fim");
