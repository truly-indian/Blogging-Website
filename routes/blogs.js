const router = require('express').Router()
const passport = require('passport')
const {ensureAuthenticated, ensureGuest} = require('../helper/auth-helper')
const bodyParser = require('body-parser')
const multer  = require('multer')
const mongoose = require('mongoose')


const Blog = require('../models/blog-model')
const User = require('../models/user-model')



const storage = multer.diskStorage({
  destination: function(req,file,cb) {
        cb(null,'uploads/')
  },
  filename: function(req,file,cb) {
   cb(null, Date.now() + file.originalname)
  }
})

const filefilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true)
  }else {
cb(null,false)
  }

}
const upload = multer({storage:storage,limits:{
  fileSize: 1024 *1024 *5 

}, fileFilter:filefilter
})

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//stories route
router.get('/' , (req,res) => {
  Blog.find({status:'public'})
  .then(blogs => {
    console.log(blogs)
    res.render('blogs/index' , {blogs:blogs})
  })
 
})

//get add blog route
router.get('/add' , ensureAuthenticated,(req,res) => {
 res.render('blogs/add')
})

//post add blog route

router.post('/' ,upload.single('image'),(req,res ) => {
  console.log(req.file)
  console.log(req.body)
 
      let allowComments;
      if(req.body.allowComments){
               allowComments = true;
      }else {
        allowComments = false;
      }
    if(req.file!=undefined) {
        image = req.file.path.substring(8)
    }else {
      image=false
    }
      const newBlog = {
        title:req.body.title,
        details:req.body.details,
        status:req.body.status,
        image:image,
        allowComments:allowComments,
        user:req.user.id,
        username:req.user.username,
        thumbnail:req.user.thumbnail
      }
      new Blog(newBlog).save().then(blog=> {
         res.redirect(`/blogs/show/${blog.id}`)
      }).catch()
}) 

module.exports = router