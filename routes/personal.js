var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var Personal = require('../app/middlewares/personal');

/* GET users listing. */
router.get('/',User.signinRequired,Personal.Showpersonal);

router.get('/attention',User.signinRequired,Personal.ShowPeronalAttention);

router.get('/posts',User.signinRequired,Personal.ShowPeronalPosts);

router.get('/detail',User.signinRequired,Personal.ShowPeronalDetail);

router.get('/detailEdit',User.signinRequired,Personal.ShowPeronalDetailEdit);


router.post('/detailEdit',User.signinRequired,Personal.PeronalDetailEdit);

module.exports = router;
