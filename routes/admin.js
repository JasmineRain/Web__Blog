var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var Article = require('../app/middlewares/article');


router.get('/userlist', User.signinRequired, User.adminRequired, User.listusers);

router.get('/articlelist', User.signinRequired, User.adminRequired, Article.listarticles);

module.exports = router;