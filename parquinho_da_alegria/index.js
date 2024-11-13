const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const app = express();

const productsRoutes = require("./routes/productsRoutes");
const modelConfig = require("./models/modelConfig");

exphbs.create({
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use(express.json());

app.use("/products", productsRoutes);

conn
  .sync(/*{ force: true }*/)
  .then(() => {
    console.log("Database synced");
    app.listen(4000);
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
