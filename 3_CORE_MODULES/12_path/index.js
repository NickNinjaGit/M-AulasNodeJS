const path = require("path");

const customPath = "/relatorios/nicolas/relatorio1.pdf";

console.log(path.dirname(customPath)); //exibe apenas o diretório onde está o arquivo
console.log(path.basename(customPath)); //exibe apenas o nome do arquivo
console.log(path.extname(customPath)); //exibe o tipo de extensão do arquivo
