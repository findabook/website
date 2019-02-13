const express = require("express");
const router = express.Router();
const books = require("../models/Book");

router.get("/used", (req, res, next) => {
  res.render("books/used");
});

router.get("/new", (req, res, next) => {
  res.render("books/new");
});

router.get("/trending", (req, res, next) => {
  res.render("books/trending");
});

router.get("/used/:name", (req, res, next) => {
  res.render("books/singleview");
});

router.get("/map/:id", (req, res, next) => {
  books.find({ _id: req.params.id }).then(book => {
    res.json(book);
  });
});

module.exports = router;
