const express = require("express");
const router = express.Router();
const books = require("../models/Book");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/help", (req, res, next) => {
  res.render("help");
});

router.get("/becomember", (req, res, next) => {
  res.render("member");
});

router.get("/map/:id", (req, res, next) => {
  books
    .findById(req.params.id)
    .populate("actualOwners")
    .then(book => {
      res.json(book);
    });
});

module.exports = router;
