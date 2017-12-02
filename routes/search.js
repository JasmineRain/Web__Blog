var express = require('express');
var router = express.Router();
var Search = require('../app/middlewares/search')


/* GET home page. */
router.get('/:query',Search.search);

module.exports = router;
