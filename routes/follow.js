var express = require('express');
var router = express.Router();
var Follow = require('../app/middlewares/follow');


router.get('/add', Follow.add);


module.exports = router;