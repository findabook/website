const express = require("express");
const router = express.Router();
const books = require("../models/Book")
const chats = require("../models/Chat")
const users = require("../models/User")

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/help", (req, res, next) => {
  res.render("help")
})

router.get("/becomember", (req, res, next) => {
  res.render("member")
})

router.get("/map/:id", (req, res, next) => {
  books.findById(req.params.id)
    .populate("actualOwners")
    .then(book => {
      res.json(book);
    });
});

router.post("/chat", (req, res) => {
  chats.create({
    messages: []
  })
    .then(chat => {
      users.findByIdAndUpdate(req.body.id, { $push: { chats: chat._id } })
        .then(res.json(chat))
    })
})

router.get("/chat/:id", (req, res) => {
  chats.findById(req.params.id)
    .then(chat => res.render("chatview", { chat }))
})

router.put("/chat/message", (req, res) => {
  chats.findByIdAndUpdate(req.body.id, { $push: { messages: { message: req.body.message, sender: req.user_id} } })
  .then(res.send())
})

router.get("/chat/message/:id", (req, res) => {
  chats.findById(req.params.id)
  .then(chat => res.json(chat))
})
  
module.exports = router;
