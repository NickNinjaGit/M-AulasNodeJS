const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual a sua linguagem preferida?", (language) => {
  language = language.trim();

  if (language === "Phyton") {
    console.log("bobão! Phyton é mó cringe kkkkkkk");
    readline.close();
    return;
  }
  console.log(`A minha linguagem favorita é: ${language}`);
  readline.close();
});
