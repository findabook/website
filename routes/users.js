const express = require('express')
const router = express.Router()

router.get('/:id', (req, res, next) => {
    res.render('user/profile')
})

router.post('/:id/report', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

module.exports = router