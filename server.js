const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

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


app.use('/auth' , authRoutes)



//this is the home page route
app.get('/' , (req,res) => {
    res.send('hello world !!')
})

//user authorization routes



app.listen(SERVER_PORT , () => {
    console.log('server started at port:' + 'http://localhost:3000')
})