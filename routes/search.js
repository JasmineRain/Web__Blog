var express = require('express');
var router = express.Router();
var Search = require('../app/middlewares/search')


/* GET home page. */

router.get('/:content',Search.search);


module.exports = router;
