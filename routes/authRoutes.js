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

    /* validation of signup */
    if(username === "" || password === ""){
        res.render('auth/signup', {
            errorMessage: 'Not a valid username or password'
        });
        return;
    }
  
User.findOne({'username': username}, 'username',
    (err, user) => {
        if (user !== null){
            res.render('auth/signup',{
                errorMessage: "Username Taken"
            });
            return;
        }
    }
)
    
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = User({
        username: username,
        password: hashPass,
    });

// /* validation of signup */
//     if(username === "" || password === ""){
//         res.render('auth/signup', {
//             errorMessage: 'Not a valid username or password'
//         });
//         return;
//     }
   
   
/* create new user  and then redirect to congrats page */
    newUser.save((err) => {
        if(err){
            res.render('auth/signup',{
                errorMessage: "Failed to save new user"
            });
        }else{
        res.redirect('auth/congrats');
        }
    });
});

/* congrats page after sign up */
// authRouter.get('/congrats', (req, res, next) => {
//     res.render('auth/congrats')
// })

module.exports = authRouter;