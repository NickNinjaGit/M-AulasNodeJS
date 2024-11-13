const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Qual arquivo você deseja acessar? \n`, (userInput) => {
  fs.readFile(userInput, "utf-8", (err, data) => {
    if (err) {
      console.log("Erro ao encontrar o arquivo:   \n", err);
      rl.close();
      return;
    }
    console.log(`Conteúdo do Arquivo: \v  ${data}`);
    rl.close();
  });
});
