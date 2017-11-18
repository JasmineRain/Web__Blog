var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');


/* GET users listing. */
router.get('/signin', User.showSignin);

router.get('/signup', User.showSignup);

router.post('/signin', User.signin);

router.post('/signup', User.signup);

router.get('/logout', User.logout);


module.exports = router;
