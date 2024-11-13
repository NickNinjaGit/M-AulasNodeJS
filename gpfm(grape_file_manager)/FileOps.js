const grape = require("./grape");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

module.exports = {
  GeneralFileOptions: GeneralFileOptions,
  OpCreateFile: OpCreateFile,
};
//inquire com perguntas de "Opções de Arquivos":
function GeneralFileOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "file_options",
        message: "Opções de Arquivos: Qual ação você deseja fazer?",
        choices: [
          "1- Criar arquivo",
          "2- Excluir Arquivo",
          "3- Renomear Arquivo",
          "4- Copiar arquivo",
          "5- Mover Arquivo",
          "6- Propriedades",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.file_options) {
        case "1- Criar arquivo":
          fileops
            .OpCreateFile()
            .then(() => {
              console.clear();
              GeneralOptions();
            })
            .catch((error) => {
              console.error("Ocorreu um erro ao criar a pasta:", error);
            });
          break;

        case "2- Excluir Arquivo":
          console.log("Digite o nome do arquivo");
          break;

        case "3- Renomear Arquivo":
          console.log("Digite o nome do arquivo");
          break;

        case "4- Copiar arquivo":
          console.log("Digite o nome do arquivo");
          break;

        case "5- Mover Arquivo":
          console.log("Digite o nome do arquivo");
          break;

        case "6- Propriedades":
          console.log("Digite o nome do arquivo");
          break;
      }
    });
}
function OpCreateFile() {
  return new Promise((resolve, reject) => {
    /*Cria uma promessa, um objeto que tem 2 parâmetros, resolve e reject. Usada para controlar
          Promessas (ou Promises) são objetos em JavaScript que representam o resultado de uma operação assíncrona que pode ser resolvida (com sucesso) ou rejeitada (com falha). 
          Elas são usadas para lidar com código assíncrono de uma forma mais limpa e legível, evitando o chamado "callback hell" (aninhamento excessivo de funções de retorno de chamada).
          Uma promessa pode estar em um dos três estados:
      
          Pendente (Pending): Estado inicial, quando a operação assíncrona ainda não foi concluída.
          Resolvida (Fulfilled): Quando a operação assíncrona é concluída com sucesso.
          Rejeitada (Rejected): Quando a operação assíncrona falha. */

    inquirer //inicia um prompt, função do próprio JavaScript que permite a criação de uma caixa de perguntas no terminal.
      .prompt([
        {
          name: "createFile", //Pergunta qual diretório o usuário deseja criar a pasta.
          message: "Digite o diretório que deseja criar o arquivo:",
          validate: function (input) {
            if (fs.existsSync(input)) {
              return true;
            } else {
              return "Diretório inválido, Por favor, insira um diretório existente.";
            }
          },
        },
        {
          name: "fileName", //Pergunta o nome da pasta.
          message: "Digite o nome do arquivo (com a extensão):",
          validate: function (input) {
            if (input === "") {
              return "Digite um nome válido!";
            } else if (!input.path.extname) {
              return "Digite o nome do arquivo com extensão!";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        //então pegue as respostas e execute algo...
        let directory = answers.createFile; //atribui a resposta da pergunta createFolder a uma variavel chamada "directory", armazenando em um let, um valor alterável.
        directory = grape.formatPath(directory); //executa a função formatPath do grape, que converte / ou \ para \\. Obs: útil apenas no Windows.
        const fileName = answers.fileName; //atribui a resposta da pergunta folderName a uma variavel chamada "folderName", armazenando em um const, um valor inalterável.

        // Verifica se a pasta já existe
        const filePath = path.resolve(directory, fileName); //variavel que recebe path.resolve, função de path que acessa o diretório absoluto de um arquivo.
        if (fs.existsSync(filePath)) {
          //Caso sim exibe uma mensagem dizendo que o arquivo já existe.
          //a partir da função existSync do filesystem, verificamos se os valores de folderPath atribuidos anteriormente já existem
          console.log(`O arquivo ${fileName} já existe.`);
          setTimeout(() => {
            console.clear();
            GeneralFileOptions();
          }, 1000);
          return; //para de executar o código aqui.
        }

        const loadingInterval = grape.loadingAnimation(); // atribui a função loadingAnimation do módulo grape para a variável loadingInterval.

        grape.createFile(directory, folderName); // Cria a pasta a partir da função createFolder do módulo grape.
        setTimeout(() => {
          //executa um delay de 3 segudos (representados em 3000 milesimos) para executar uma função.

          grape.stopLoadingAnimation(loadingInterval); //executa stopLoadingAnimation do módulo grape, recebendo como parâmetro a variável loadingInterval.
          resolve(); //Resolve a promessa criada no início do código.
        }, 3000); // Tempo total de 3 segundos para a animação
      })
      .catch((error) => {
        //.catch captura se acontecer algo errado em uma Promise.
        reject(error); // Rejeita a promessa se ocorrer um erro
      });
  });
}
