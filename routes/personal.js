var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');

/* GET users listing. */
router.get('/',User.signinRequired,User.Showpersonal);

router.get('/attention',User.signinRequired,User.ShowPeronalAttention);

router.get('/posts',User.signinRequired,User.ShowPeronalPosts);

router.get('/detail',User.signinRequired,User.ShowPeronalDetail);

router.get('/detailEdit',User.signinRequired,User.ShowPeronalDetailEdit);


router.post('/detailEdit',User.signinRequired,User.PeronalDetailEdit)

module.exports = router;
