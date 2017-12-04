var express = require('express');
var router = express.Router();
var Article = require('../app/middlewares/article');
var User = require('../app/middlewares/user');

/* GET home page. */

router.get('/new', User.signinRequired, Article.newArticle);
router.get('/test', User.signinRequired, Article.Tset);
router.get('/:_id', Article.showArticle);


router.get('/edit/:_id', User.signinRequired, User.authorCheck, Article.editArticle);

router.post('/post', User.signinRequired, Article.postArticle);

router.get('/delete',User.signinRequired, User.authorCheck, Article.deleteArticle);

module.exports = router;
