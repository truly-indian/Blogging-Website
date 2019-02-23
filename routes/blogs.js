const router = require('express').Router()
const passport = require('passport')

//stories route
router.get('/' , (req,res) => {
  res.render('blogs/index')
})

//add blog route
router.get('/add' , (req,res) => {
 res.render('blogs/add')
})


module.exports = router