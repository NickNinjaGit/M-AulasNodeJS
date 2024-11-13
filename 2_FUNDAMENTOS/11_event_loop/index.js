function a() {
  console.log("Executando a()");
}
function b() {
  console.log("Executando b()");
}
function c() {
  console.log("Executando c()");
  a();
  b();
}

c();

//arquitetura que determina a ordem de execução das instruções do código, no caso de cima para baixo
