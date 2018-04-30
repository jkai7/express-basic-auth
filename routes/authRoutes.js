const express = require('express');
const authRouter  = express.Router();//const name must be same everywhere

//== user model to handle sign up request
const User = require("../models/user");

//== bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


/* GET home page */
authRouter.get('/', (req, res, next) => {
  res.render('index');
});

/* signup page */
authRouter.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

/* signup post */
authRouter.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
        username: username,
        password: hashPass,
    });
    newUser.save((err) => {
        res.redirect('/');
    });
});

/* congrats page after sign up */
authRouter.get('/congrats', (req, res, next) => {
    res.render('auth/congrats')
})

module.exports = authRouter;