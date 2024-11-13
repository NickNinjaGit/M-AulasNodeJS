const os = require("os");

//Checkar cores da cpu.
console.log(os.cpus());

//checkar memória RAM livre
console.log(os.freemem());

//checkar Diretório Home
console.log(os.homedir());

//checkar qual é o tipo de OS
console.log(os.type());

if (os.type == "Windows_NT") {
  console.log("Você está usando Windows!");
} else {
  console.log("Você está em outro OS");
}
