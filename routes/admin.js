var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var Article = require('../app/middlewares/article');
var Comment = require('../app/middlewares/comment');
var Follow = require('../app/middlewares/follow');

router.get('/', User.signinRequired, User.adminRequired,function(req,res){
    res.render('admin')
});

router.get('/userlist', User.signinRequired, User.adminRequired, User.listusers);

router.get('/articlelist', User.signinRequired, User.adminRequired, Article.listarticles);

router.get('/commentlist', User.signinRequired, User.adminRequired, Comment.listcomments);

router.get('/followlist', User.signinRequired, User.adminRequired, Follow.listfollows);

module.exports = router;