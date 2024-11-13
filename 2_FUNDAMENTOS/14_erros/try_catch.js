const x = 10;

try {
  x = 2;
} catch (err) {
  console.log(`Erro: ${err}`);
}
console.log("Continuando o código");
/*ao contrário do throw, ele força o erro dentro de uma função, ou seja, exibirá uma mensagem de erro(TypeError),
e não interromperá o código já que não se trata de um erro estrutural*/
