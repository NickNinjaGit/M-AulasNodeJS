const minimist = require("minimist"); //com o minimist, podemos extrair os argumentos de forma mais prática.

const args = minimist(process.argv.slice(2)); //especifica que a partir do 2 indice, ele cria uma cópia dos argumentos

console.log(args);

const nome = args["nome"];
const profissao = args["profissao"];

console.log(nome, profissao);

console.log(`O nome dele é " + ${nome} + " e sua profissão é " + ${profissao}`);
