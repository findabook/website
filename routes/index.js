const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/help", (req, res, next) => {
  res.render("help")
})

router.get("/becomember", (req, res, next) => {
  res.render("member")
})

module.exports = router;
