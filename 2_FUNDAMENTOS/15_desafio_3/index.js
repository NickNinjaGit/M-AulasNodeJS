const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "name",
      message: "Qual é seu nome?",
    },
    {
      name: "age",
      message: "Qual a sua idade?",
    },
  ])
  .then((answers) => {
    const Name = answers.name;
    const Age = answers.age;

    const obj = {};
    console.log(obj.propriedade.que.nao.existe);

    console.log(
      chalk.bgYellow.black(`Seu nome é ${Name} e você tem ${Age} anos!`)
    );
  })
  .catch((error) => {
    console.log(`Erro: ${error}`);
  });
