const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* signup page */
router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})


module.exports = router;