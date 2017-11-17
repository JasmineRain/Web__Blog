var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');



/* GET users listing. */
router.get('/users/siginin', User.showSignin());

router.get('/users/siginup', User.showSignup());

router.post('/users/siginin', User.signin());

router.post('/users/signup', User.signup());

router.get('/users/logout', User.logout());

router.get('/users/siginup', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
