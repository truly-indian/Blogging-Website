const router = require('express').Router()
const passport = require('passport')
const {ensureAuthenticated, ensureGuest} = require('../helper/auth-helper')



//this is the home page route
router.get('/' , ensureGuest,(req,res) => {
    res.render('index/welcome')
})

//dashboard route
router.get('/dashboard' ,ensureAuthenticated, (req,res) => {
    res.render('index/dashboard')
})

router.get('/about' , (req,res) => {
 res.render('index/about')
})



module.exports = router