const express = require("express");
const router = express.Router();
const path = require("path");
const html_directory = path.join(__dirname, "../html_files");
const css_directory = path.join(__dirname, "../css_files");

router.use(express.static(css_directory));

router.get("/catalogo", (req, res) => {
  res.sendFile(`${html_directory}/catalogo.html`);
});

router.get("/catalogo/brinquedos", (req, res) => {
  res.sendFile(`${html_directory}/brinquedos.html`);
});

router.get("catalogo/", (req, res) => {
  res.sendFile(`${html_directory}/roupas.html`);
});

router.get("catalogo/", (req, res) => {
  res.sendFile(`${html_directory}/livros.html`);
});

module.exports = router;
