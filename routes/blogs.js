const router = require('express').Router()
const passport = require('passport')
const {ensureAuthenticated, ensureGuest} = require('../helper/auth-helper')
const bodyParser = require('body-parser')
const multer  = require('multer')
const mongoose = require('mongoose')
const path = require('path')

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

//show single blog
router.get('/show/:id' , (req,res) => {
   Blog.findOne({
     _id:req.params.id
   })
   .then(blog => {
     res.render('blogs/show' , {
       blog:blog
     })
   })
})

//edit story page
router.get('/edit/:id' , (req,res ) => {
  Blog.findOne({
    _id:req.params.id
  }).then(blog => {
    res.render('blogs/edit' , {
      blog:blog
    })
  })
 
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

//edit form route
router.post('/:id' , (req,res) => {
          console.log('this is the edit route')
          console.log(req.body)
          res.send('functionality still not added!!')
  })
  
//delete
router.delete('/:id' , (req,res) => {
  Blog.remove({
    _id:req.params.id
  })
  .then(() => {
    res.redirect('/dashboard')
  })
})

//add comment

  router.post('/comment/:id' , (req,res) => {
    console.log(req.body)
    console.log(req.user.username)
     Blog.findOne({
       _id:req.params.id
     })
     .then(blog => {
        const newComment = {
          commentBody:req.body.commentBody,
          commenteruser:req.user.username
        }
        console.log(req.user.username)
        //push to comments array
        blog.comments.unshift(newComment)
         blog.save()
         .then(blog => {
           res.redirect(`/blogs/show/${blog.id}`)
         }) 
     })
  })


module.exports = router