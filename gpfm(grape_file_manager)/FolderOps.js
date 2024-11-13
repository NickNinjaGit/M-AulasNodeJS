const grape = require("./grape");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

module.exports = {
  OpCreateFolder: OpCreateFolder,
  OpDeleteFolder: OpDeleteFolder,
  OpRenameFolder: OpRenameFolder,
  GeneralFolderOptions: GeneralFolderOptions,
};
//Opções gerais da pasta
function GeneralFolderOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "file_options",
        message: "Opções de Pasta: Qual ação você deseja fazer?",
        choices: [
          "1- Criar Pasta",
          "2- Excluir Pasta",
          "3- Renomear Pasta",
          "4- Copiar Pasta",
          "5- Mover Pasta",
          "6- Propriedades",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.file_options) {
        case "1- Criar Pasta":
          OpCreateFolder()
            .then(() => {
              console.clear();
              GeneralFolderOptions();
            })
            .catch((error) => {
              console.error("Ocorreu um erro ao criar a pasta:", error);
            });
          break;

        case "2- Excluir Pasta":
          OpDeleteFolder()
            .then(() => {
              console.clear();
              GeneralOptions();
            })
            .catch((error) => {
              console.error("Ocorreu um erro ao excluir a pasta", error);
            });
          break;

        case "3- Renomear Pasta":
          OpRenameFolder()
            .then(() => {
              console.clear();
              GeneralFolderOptions();
            })
            .catch((error) => {
              console.error("Ocorreu um erro ao renomear a pasta", error);
            });
          break;

        case "4- Copiar Pasta":
          console.log("Digite o nome do arquivo");
          break;

        case "5- Mover Pasta":
          console.log("Digite o nome do arquivo");
          break;

        case "6- Propriedades":
          console.log("Digite o nome do arquivo");
          break;
      }
    });
}

function OpCreateFolder() {
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
          name: "createFolder", //Pergunta qual diretório o usuário deseja criar a pasta.
          message: "Digite o diretório que deseja criar a pasta:",
          validate: function (input) {
            if (fs.existsSync(input)) {
              return true;
            } else {
              return "Diretório inválido, Por favor, insira um diretório existente.";
            }
          },
        },
        {
          name: "folderName", //Pergunta o nome da pasta.
          message: "Digite o nome da pasta:",
          validate: function (input) {
            if (input === "") {
              return "Digite um nome válido!";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        //então pegue as respostas e execute algo...
        let directory = answers.createFolder; //atribui a resposta da pergunta createFolder a uma variavel chamada "directory", armazenando em um let, um valor alterável.
        directory = grape.formatPath(directory); //executa a função formatPath do grape, que converte / ou \ para \\. Obs: útil apenas no Windows.
        const folderName = answers.folderName; //atribui a resposta da pergunta folderName a uma variavel chamada "folderName", armazenando em um const, um valor inalterável.
        const loading = grape.loadingAnimation(); //executa a função loadingAnimation do módulo grape para a variável loadingInterval.

        // Verifica se a pasta já existe
        const folderPath = path.resolve(directory, folderName); //variavel que recebe path.resolve, função de path que acessa o diretório absoluto de uma pasta.
        if (grape.FolderCheck(folderPath, folderName)) {
          loading;
          setTimeout(() => {
            grape.stopLoadingAnimation(loading);
          }, 3000);
          return;
        }

        grape.createFolder(directory, folderName); // Cria a pasta a partir da função createFolder do módulo grape.
        setTimeout(() => {
          //executa um delay de 3 segudos (representados em 3000 milesimos) para executar uma função.

          grape.stopLoadingAnimation(loading); //executa stopLoadingAnimation do módulo grape, recebendo como parâmetro a variável loadingInterval.
          resolve(); //Resolve a promessa criada no início do código.
        }, 3000); // Tempo total de 3 segundos para a animação
      })
      .catch((error) => {
        //.catch captura se acontecer algo errado em uma Promise.
        reject(error); // Rejeita a promessa se ocorrer um erro
      });
  });
}
function OpDeleteFolder() {
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
          name: "deleteFolder", //Pergunta qual diretório o usuário deseja criar a pasta.
          message: "Digite o diretório que deseja excluir a pasta",
          validate: function (input) {
            if (fs.existsSync(input)) {
              return true;
            } else {
              return "Diretório inválido! Por favor, digite um diretório existente.";
            }
          },
        },
        {
          name: "folderName", //Pergunta o nome da pasta.
          message: "Digite o nome da pasta:",
          validate: function (input) {
            if (input === "") {
              return "Digite um nome válido!";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        //então pegue as respostas e execute algo...
        let directory = answers.deleteFolder; //atribui a resposta da pergunta createFolder a uma variavel chamada "directory", armazenando em um let, um valor alterável.
        directory = grape.formatPath(directory); //executa a função formatPath do grape, que converte / ou \ para \\. Obs: útil apenas no Windows.
        const folderName = answers.folderName; //atribui a resposta da pergunta folderName a uma variavel chamada "folderName", armazenando em um const, um valor inalterável.

        // Verifica se a pasta já existe
        const folderPath = path.resolve(directory, folderName); //variavel que recebe path.resolve, função de path que acessa o diretório absoluto de uma pasta.
        if (!fs.existsSync(folderPath)) {
          console.log(`A pasta ${folderName} não existe.`);
          setTimeout(() => {
            console.clear();
            GeneralFolderOptions();
          }, 1000);
          return; // Retorna sem tentar excluir a pasta
        }
        const loadingInterval = grape.loadingAnimation(); // atribui a função loadingAnimation do módulo grape para a variável loadingInterval.

        grape.deleteFolder(directory, folderName); // Cria a pasta a partir da função createFolder do módulo grape.
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

function OpRenameFolder() {
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
          name: "renameFolder", //Pergunta qual diretório o usuário deseja renomear a pasta.
          message:
            "Digite o diretório onde está a pasta que você deseja renomear:",
          validate: function (input) {
            if (fs.existsSync(input)) {
              return true;
            } else {
              return "Diretório inválido! Por favor, digite um diretório existente.";
            }
          },
        },
        {
          name: "OldFolderName", //Pergunta o nome da pasta.
          message: "Digite o nome da pasta:",
          validate: function (input) {
            if (input === "") {
              return "Digite um nome válido!";
            } else {
              return true;
            }
          },
        },
        {
          name: "NewFolderName", //Pergunta o novo nome da pasta.
          message: "Digite um novo nome para pasta:",
          validate: function (input) {
            if (input === "") {
              return "Digite um nome válido!";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        //então pegue as respostas e execute algo...
        let directory = answers.renameFolder; //atribui a resposta da pergunta createFolder a uma variavel chamada "directory", armazenando em um let, um valor alterável.
        directory = grape.formatPath(directory); //executa a função formatPath do grape, que converte / ou \ para \\. Obs: útil apenas no Windows.
        const OldfolderName = answers.OldFolderName;
        const NewFolderName = answers.NewFolderName;

        const folderPathAntigo = path.join(
          directory,
          grape.formatPath("/"),
          OldfolderName
        ); //cria um diretório com a função path.join que contém o diretório raiz informado pelo usuário, uma barra e a pasta antiga.
        const folderPathNovo = path.join(
          directory,
          grape.formatPath("/"),
          NewFolderName
        ); //cria um diretório com a função path.join que contém o diretório raiz informado pelo usuário, uma barra e a pasta nova.
        if (!fs.existsSync(folderPathAntigo)) {
          console.log(`A pasta ${OldfolderName} não existe.`);
          setTimeout(() => {
            console.clear();
            GeneralFolderOptions();
          }, 1000);
          return; // Retorna sem tentar renomear a pasta
        }
        const loadingInterval = grape.loadingAnimation(); // atribui a função loadingAnimation do módulo grape para a variável loadingInterval.

        grape.renameFolder(folderPathAntigo, folderPathNovo); //função que renomeia uma pasta.
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
