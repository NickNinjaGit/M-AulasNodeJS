const x = 10; //quando checa um erro, encerra o código e emite um erro estrutural.

//checar se x é um número
if (!Number.isInteger(x)) {
  throw new Error("O Valor de x não é um número inteiro");
}

console.log("Continuando o código...");
