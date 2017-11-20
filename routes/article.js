var express = require('express');
var router = express.Router();
var Article = require('../app/middlewares/article');
var User = require('../app/middlewares/user');

/* GET home page. */

router.get('/', Article.showArticle);

router.get('/new', User.signinRequired, Article.newArticle);

router.get('/edit/:id', User.signinRequired, User.authorCheck, Article.editArticle);

router.post('/post', User.signinRequired, Article.postArticle);


module.exports = router;
