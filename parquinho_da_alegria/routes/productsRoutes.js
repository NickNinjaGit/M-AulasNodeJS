const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/home", ProductController.showProducts);

module.exports = router;
