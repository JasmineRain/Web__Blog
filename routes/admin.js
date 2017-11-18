var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');


router.get('/userlist', User.signinRequired, User.adminRequired, User.list);

module.exports = router;