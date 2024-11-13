const EventEmitter = require("events"); //uma classe que permite criar funções globais, usado em logs.
const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("Durante");
});

console.log("Antes");
eventEmitter.emit("start");
console.log("Depois");
