const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// Serve arquivos estáticos da pasta 'public'
app.use(express.static("public"));

// Define o caminho para as imagens
const img_path = "/css/src/images";

// Cria uma instância do motor de template Handlebars
const hbs = exphbs.create({
  partialsDir: ["views/partials/"],
});

// Configura o motor de visualização
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Registra o helper 'join'
hbs.handlebars.registerHelper("join", function (array, delimiter) {
  if (Array.isArray(array)) {
    return array.join(delimiter);
  }
  return array; // Se não for um array, retorna o valor como está
});

const auth = false;
// Dados de exemplo
const roupas = [
  {
    name: "Camiseta de ursinho Infantil",
    description: "A Camiseta de Ursinho Infantil é perfeita para trazer conforto e estilo ao guarda-roupa dos pequenos. Feita com 100% algodão de alta qualidade, ela oferece maciez e durabilidade, ideal para acompanhar as aventuras do dia a dia. Com um adorável ursinho estampado na frente, essa camiseta é colorida e divertida, tornando-se rapidamente a favorita das crianças. Disponível em várias cores e tamanhos, é uma excelente escolha para presentear e alegrar os pequenos com muito charme e conforto.",
    rating: 4.5,
    src: `${img_path}/roupa_1.png`,
    preco: 50.99,
    tamanhos: ["P", "M", "G"],
    frete_gratis: false,
    id: 1,
  },
  {
    name: "Jaqueta Jeans Confort Baby",
    description: "A Jaqueta Jeans Confort Baby é a combinação perfeita de estilo e conforto para os pequenos. Confeccionada em jeans macio e flexível, esta jaqueta proporciona liberdade de movimento e um ajuste confortável. Com um design moderno e versátil, é ideal para qualquer ocasião, adicionando um toque descolado ao visual das crianças. Possui botões de pressão que facilitam na hora de vestir e detalhes delicados que encantam. Disponível em tamanhos para bebês e crianças pequenas, a Jaqueta Jeans Confort Baby é a escolha ideal para manter seu bebê aquecido e na moda.",
    rating: 4.6,
    src: `${img_path}/roupa_2.png`,
    preco: 99.99,
    tamanhos: ["P", "M", "G"],
    frete_gratis: true,
    id: 2,
  },
  {
    name: "All Star Infantil",
    description: "O All Star Infantil é a escolha perfeita para adicionar um toque clássico e descontraído ao visual das crianças. Feito com materiais de alta qualidade, esse tênis oferece durabilidade e conforto para acompanhar os pequenos em todas as suas aventuras. Disponível em diversas cores e estampas, ele se adapta a qualquer estilo, desde os mais descolados até os mais elegantes. Com seu design icônico e solado de borracha antiderrapante, o All Star Infantil garante segurança e estilo para o dia a dia dos pequenos.",
    rating: "3.3",
    src: `${img_path}/roupa_3.png`,
    preco: 39.99,
    tamanhos: [20, 25, 30, 33],
    frete_gratis: false,
    id: 3,
  },
  {
    name: "Óculos de Sol Infantil",
    description: "Os Óculos de Sol Infantil são essenciais para proteger os olhos dos pequenos com estilo e segurança. Com lentes UV400 de alta proteção, eles garantem a defesa necessária contra os raios solares prejudiciais. O design leve e confortável se adapta perfeitamente ao rosto das crianças, enquanto as armações coloridas e divertidas tornam o uso ainda mais agradável. Disponíveis em vários formatos e cores, os Óculos de Sol Infantil são o acessório ideal para combinar proteção e diversão nas atividades ao ar livre.",
    rating: "4.0",
    src: `${img_path}/roupa_4.png`,
    preco: 19.99,
    tamanhos: ["P", "M", "G"],
    frete_gratis: true,
    id: 4,
  },
  {
    name: "Camiseta de ursinho Infantil",
    description: "A Camiseta de Ursinho Infantil é perfeita para trazer conforto e estilo ao guarda-roupa dos pequenos. Feita com 100% algodão de alta qualidade, ela oferece maciez e durabilidade, ideal para acompanhar as aventuras do dia a dia. Com um adorável ursinho estampado na frente, essa camiseta é colorida e divertida, tornando-se rapidamente a favorita das crianças. Disponível em várias cores e tamanhos, é uma excelente escolha para presentear e alegrar os pequenos com muito charme e conforto.",
    rating: 4.5,
    src: `${img_path}/roupa_1.png`,
    preco: 50.99,
    tamanhos: ["P", "M", "G"],
    frete_gratis: false,
    id: 1,
  },
  {
    name: "Camiseta de ursinho Infantil",
    description: "A Camiseta de Ursinho Infantil é perfeita para trazer conforto e estilo ao guarda-roupa dos pequenos. Feita com 100% algodão de alta qualidade, ela oferece maciez e durabilidade, ideal para acompanhar as aventuras do dia a dia. Com um adorável ursinho estampado na frente, essa camiseta é colorida e divertida, tornando-se rapidamente a favorita das crianças. Disponível em várias cores e tamanhos, é uma excelente escolha para presentear e alegrar os pequenos com muito charme e conforto.",
    rating: 4.5,
    src: `${img_path}/roupa_1.png`,
    preco: 50.99,
    tamanhos: ["P", "M", "G"],
    frete_gratis: false,
    id: 1,
  },
];


// Roteamento
app.get("/", (req, res) => {
  res.render("home", { auth, roupas });
});

app.get("/roupas", (req, res) => {
  res.render("roupas", { auth, roupas });
});

app.get("/roupas/:id", (req, res) => {
  const roupa = roupas[parseInt(req.params.id) - 1];
  if (roupa) {
    res.render("roupa", { auth, roupa });
  } else {
    res.status(404).send("Produto não encontrado!");
  }
});

console.log(img_path);
// Inicia o servidor
app.listen(8080, () => {
  console.log("Servidor rodando...");
});
