const Product = require("../models/Product");

module.exports = class ProductController {
  static addProducts(req, res) {
  }
  
  static showProducts(req, res) {
    res.render("products/home");
  }
};
