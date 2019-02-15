const express = require('express')
const router = express.Router()
const chats = require("../models/Chat");
const users = require("../models/User");

router.post("/", (req, res) => {
    chats
        .create({
            messages: []
        })
        .then(chat => {
            users
                .findOneAndUpdate({ username: req.body.username }, { $push: { chats: chat._id } })
                .then(() => {
                    users
                        .findByIdAndUpdate(req.user._id, { $push: { chats: chat._id } })
                        .then(res.json(chat))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
    chats.findById(req.params.id).then(chat => res.render("chatview", { chat }));
});

router.put("/message", (req, res) => {
    chats
        .findByIdAndUpdate(req.body.id, {
            $push: { messages: { sender: req.user._id, message: req.body.message } }
        })
        .then(res.send());
});

router.get("/message/:id", (req, res) => {
    const user = req.user.id
    chats.findById(req.params.id).then(chat => {
        res.json({chat, user});
    });
});
module.exports = router