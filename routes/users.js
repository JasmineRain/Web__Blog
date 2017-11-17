var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');



/* GET users listing. */
router.get('/signin', User.showSignin);

router.get('/signup', User.showSignup);

router.post('/signin', User.signin);

router.post('/signup', User.signup);

router.get('/logout', User.logout);

router.get('/siginup', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
