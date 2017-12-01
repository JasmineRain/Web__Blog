var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var Index = require('../app/middlewares/index');

/* GET home page. */
router.get('/', Index.index);

module.exports = router;
