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

router.get('/add', (req, res, next) => {
    res.render('books/add')
})

router.get('/trending', (req, res, next) => {
    res.render('books/trending')
})


router.get("/used/:name", (req, res, next) => {
  books.findOne({ name: req.params.name })
    .populate("users")
    .then(book => {
      res.render("books/singleview", {book});
  })
});

module.exports = router;
