const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes')
const indexRoutes = require('./routes/index')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const app = express()
const blogs = require('./routes/blogs')
const SERVER_PORT = process.env.PORT || 3000

mongoose.connect(keys.mongodb.dbURI , { useNewUrlParser: true }).then(() => console.log('connected to databse')).catch((err) => console.log('not connected!!' + err))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookiekey]
}));


app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))

app.use(passport.initialize());
app.use(passport.session());

//global vars
app.use((req,res,next) => {
   res.locals.user = req.user || null
   next()
})

app.engine('handlebars' , exphbs({
    defaultLayout:'main'
}))
app.set('view engine' , 'handlebars')


app.use('/' , indexRoutes)

app.use('/auth' , authRoutes)

app.use('/blogs' , blogs)


app.listen(SERVER_PORT , () => {
    console.log('server started at port:' + 'http://localhost:3000')
})