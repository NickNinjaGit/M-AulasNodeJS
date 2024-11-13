const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let num1;
let num2;

rl.question("Digite o primeiro número: ", (userInput1) => {
  num1 = parseInt(userInput1);
  if (isNaN(num1)) {
    console.log("Resposta Inválida, Digite apenas números");
    rl.close();
    return;
  }

  rl.question("Digite o segundo número: ", (userInput2) => {
    num2 = parseInt(userInput2);
    if (isNaN(num2)) {
      console.log("Resposta Inválida, Digite apenas números");
      rl.close();
      return;
    }

    const resultado = num1 + num2;
    console.log(`O resultado da soma é:", ${resultado}`);
    rl.close();
  });
});
