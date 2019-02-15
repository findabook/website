const express = require("express");
const router = express.Router();
const books = require("../models/Book");

router.get("/used", (req, res) => {
  books.find({}).then(books => res.render("books/used", { books }));
});

router.get("/new", (req, res) => {
  res.render("books/new");
});

router.get("/trending", (req, res) => {
  res.render("books/trending");
});

router.get("/add", (req, res) => {
  res.render("books/add");
});

router.post("/add", (req, res) => {
  let categories = req.body.categories.split(" / ");
  categories = categories.filter(
    (categorie, i) => categories.indexOf(categorie) === i
  );
  books.findOne({ name: req.body.name }).then(book => {
    if (book == null) {
      books.create({
        name: req.body.name,
        author: req.body.author,
        resume: req.body.resume,
        categories,
        imageUrl: req.body.image,
        quantity: 1,
        actualOwners: [req.user._id]
      });
      res.redirect("/books/used/" + req.body.name);
      return;
    }
    books
      .findOneAndUpdate(
        { name: req.body.name },
        { $inc: { quantity: 1 }, $push: { actualOwners: req.user._id } },
        { new: true }
      )
      .then(() => res.redirect("/books/used/" + req.body.name));
  });
});

router.get("/trending", (req, res) => {
  res.render("books/trending");
});

router.get("/used/:name", (req, res) => {
  books.findOne({ name: req.params.name })
    .populate("actualOwners")
    .then(book => {
      res.render("books/singleview", { book });
    });
});

module.exports = router;
