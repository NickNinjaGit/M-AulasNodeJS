const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

module.exports = {
  //funções relacionadas a arquivos
  createFile: createFile,
  //funções relacionadas a pastas
  createFolder: createFolder,
  deleteFolder: deleteFolder,
  renameFolder: renameFolder,
  //outras funções
  formatPath: formatPath,
  loadingAnimation: loadingAnimation,
  stopLoadingAnimation: stopLoadingAnimation,
  FolderCheck: FolderCheck,
};

//funções de gerencimanto de Arquivos:
function createFile(directory, fileName) {
  fs.writeFileSync(directory, fileName);
  path.resolve(directory, fileName),
    { recursive: true },
    (err) => {
      if (err) {
        throw new Error(
          `Ocorreu um erro ao tentar criar o arquivo ${fileName}: \n ${err}`
        );
      }
    };
}
//funções de gerenciamento de Pasta:
function createFolder(directory, folderName) {
  fs.mkdirSync(
    path.resolve(directory, folderName), //pega o path absoluto do diretório que especificado em folderName
    { recursive: true },
    (err, data) => {
      if (err) {
        throw new Error(
          `Ocorreu um erro ao criar a pasta ${folderName}: \n ${err}`
        );
      }
    }
  );
}
function deleteFolder(directory, folderName) {
  fs.rmSync(
    path.resolve(directory, folderName),
    { recursive: true },
    (err, data) => {
      if (err) {
        throw new Error(
          `Ocorreu um erro ao excluir a pasta ${folderName}: ${err}`
        );
      }
    }
  );
}
function renameFolder(OldFolder, NewFolder) {
  fs.renameSync(OldFolder, NewFolder),
    { recursive: true },
    (err) => {
      if (err) {
        throw new Error(
          `Ocorreu um erro ao renomear a pasta ${OldFolder}: ${err}`
        );
      }
    };
}

//outras funções:
function formatPath(inputPath) {
  const osCheck = require("os").type;
  if (osCheck == "Windows_NT") {
    // Substitui todas as barras normais (/) por barras duplas (\\)
    return inputPath.replace(/\//g, "\\");
  } else {
    return inputPath;
  }
}

function loadingAnimation() {
  let counter = 1;
  const interval = setInterval(() => {
    process.stdout.write(`\rCarregando${".".repeat(counter)}`);
    counter = (counter % 3) + 1; // Loop de 1 a 3
  }, 500); // Delay de 500 milissegundos entre cada ponto

  setTimeout(() => {
    clearInterval(interval); // Para o intervalo quando a animação terminar
    process.stdout.write("\nExecução bem-sucedida!\n");
  }, 1600); // Aguarde 1600 milissegundos após o início da animação para exibir a mensagem

  return interval;
}

function stopLoadingAnimation(interval) {
  clearInterval(interval);
  process.stdout.write("\n"); // Nova linha para limpar a linha de carregamento
}

function FolderCheck(folderPath, folderName) {
  if (fs.existsSync(folderPath)) {
    console.log(chalk.bgRed.white(`A pasta ${folderName} já existe.`));
    setTimeout(() => {
      console.clear();
    }, 1000);
  }
}
