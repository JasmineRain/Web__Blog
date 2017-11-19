var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');

/* GET users listing. */
router.post('/',User.signinRequired,function(req,res){
    console.log('文件上传');
});

module.exports = router;