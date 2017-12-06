var express = require('express');
var router = express.Router();
var Comment = require('../app/middlewares/comment');
var User = require('../app/middlewares/user');

router.post('/new', User.signinRequired, Comment.save);
router.get('/giveApplause',User.signinRequired,Comment.giveApplause)



module.exports = router;