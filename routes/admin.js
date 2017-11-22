var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var Article = require('../app/middlewares/article');
var Comment = require('../app/middlewares/comment');


router.get('/userlist', User.signinRequired, User.adminRequired, User.listusers);

router.get('/articlelist', User.signinRequired, User.adminRequired, Article.listarticles);

router.get('/commentlist', User.signinRequired, User.adminRequired, Comment.listcomments);

module.exports = router;