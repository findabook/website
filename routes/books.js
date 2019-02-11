const express = require('express')
const router = express.Router()

router.get('/used', (req, res, next) => {
    res.render('books/used')
})

router.get('/new', (req, res, next) => {
    res.render('books/new')
})

router.get('/trending', (req, res, next) => {
    res.render('books/trending')
})

router.get("/used/:name", (req, res, next) => {
    res.render("books/singleview")
})






module.exports = router