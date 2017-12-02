var express = require('express');
var router = express.Router();
var Search = require('../middlewares/search')
/* GET home page. */
router.get('/search/:seach_content', User.signinRequired,Search.search);
router.get('/test',Search.test);

module.exports = router;
