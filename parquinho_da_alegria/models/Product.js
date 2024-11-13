const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Product = db.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  frete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  sizes: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  category: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
