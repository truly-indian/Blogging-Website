const router = require('express').Router()
const passport = require('passport')




//this is the home page route
router.get('/' , (req,res) => {
    res.render('index/welcome')
})

//dashboard route
router.get('/dashboard' , (req,res) => {
    res.render('index/dashboard')
})

router.get('/about' , (req,res) => {
 res.render('index/about')
})



module.exports = router