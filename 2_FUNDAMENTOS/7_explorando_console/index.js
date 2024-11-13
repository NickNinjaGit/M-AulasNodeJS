// mais de um valor
const x = 10;
const y = "Nicolas";
const z = [1, 2];
const limite = 10;

console.log(x, y, z);

//contagem de impressões
for (let i = 1; i <= limite; i += 2) {
  console.log(`O valor de i é: ${i}`);
  console.count(`Mensagens impressas`);
}

//variavel entre string
console.log("O nome é %s, e ele é programador", y);
//%s é uma interpolação que espera receber uma variavelapós a vírgula.

//limpar o console
setTimeout(() => {
  console.clear();
}, 1000);
