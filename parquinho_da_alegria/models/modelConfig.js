const User = require("./User");
const Product = require("./Product");
const UserProducts = require("./UsersProducts");

const modelConfig = {
    User,
    Product,
    UserProducts,
}

// Definindo as associações
User.belongsToMany(Product, {
  through: UserProducts,
  as: "products",
  foreignKey: "UserId",
});

Product.belongsToMany(User, {
  through: UserProducts,
  as: "users",
  foreignKey: "ProductId",
});

module.exports = modelConfig;