//nome

console.log(process.argv);

const args = process.argv.slice(2); //slice(); - retorna uma cópia de uma seção do array

console.log(args);

const nome = args[0].split("=")[1]; //split(); - divide strings em subtrings e a retorna para o array.

console.log(nome);

const idade = args[1].split("=")[1];

console.log(idade);

console.log(
  `O nome dele é " + ${nome} + " e sua idade é " + ${idade} + " anos!`
);
