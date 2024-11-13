const inquirer = require("inquirer");
const folderops = require("./FolderOps");
const fileops = require("./FileOps");
module.exports = {
  GeneralOptions: GeneralOptions,
};
function GeneralOptions() {
  //inquire com perguntas de "Opções Gerais":
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message:
          "Bem-vindo ao gerenciador de arquivos Grape!\n O que deseja fazer?",
        choices: ["1- Arquivo", "2- Pasta", "3- Sobre", "4- Sair"],
      },
    ])
    .then((answers) => {
      const escolha = answers.options;
      if (escolha === "1- Arquivo") {
        fileops.GeneralFileOptions();
      } else if (escolha === "2- Pasta") {
        folderops.GeneralFolderOptions();
      }
    });
}

GeneralOptions();
