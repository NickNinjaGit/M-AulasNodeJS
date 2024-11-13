const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const UserProducts = db.define("UserProducts", {
  UserId: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
    onDelete: "CASCADE",
    primaryKey: true,
    allowNull: false,
  },
  ProductId: {
    type: DataTypes.INTEGER,
    references: { model: "Products", key: "id" },
    onDelete: "CASCADE",
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = UserProducts;
