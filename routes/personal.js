var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');

/* GET users listing. */
router.get('/',User.signinRequired,User.Showpersonal);

module.exports = router;
