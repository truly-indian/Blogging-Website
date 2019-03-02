const router = require('express').Router()
const passport = require('passport')

// auth logout
router.get('/logout',(req,res) =>{
 req.logout()
 res.redirect('/')
})
//auth google
router.get('/google',passport.authenticate('google',{
   scope:['profile' , 'email']
}))

//callback route for google to redirect
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  console.log('redirecting to dashboard!!')
  res.redirect('/dashboard')
}) 


router.get('/verify' , (req,res) => {
  if(req.user){
     console.log(req.user)
     res.send(req.user)
  }
  else{
      res.send('not authorized')
      console.log('not looged in')
  }
})
module.exports = router