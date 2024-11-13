const chalk = require("chalk");

const nota = 1;

if (nota >= 7) {
  console.log(chalk.black.bgWhite(`Parabéns! Você está aprovado!`));
} else {
  console.log(chalk.white.bgBlackBright(`Burro, estude!`));
}
