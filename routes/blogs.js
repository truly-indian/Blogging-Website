const router = require('express').Router()
const passport = require('passport')
const {ensureAuthenticated, ensureGuest} = require('../helper/auth-helper')
//stories route
router.get('/' , (req,res) => {
  res.render('blogs/index')
})

//add blog route
router.get('/add' , ensureAuthenticated,(req,res) => {
 res.render('blogs/add')
})


module.exports = router