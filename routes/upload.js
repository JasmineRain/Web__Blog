var express = require('express');
var router = express.Router();
var User = require('../app/middlewares/user');
var multer=require('multer');// 文件上传中间件

// 中间件设置
var bstorage = multer.diskStorage({
    destination: function (req, file, cb){// 设置文件存储路径
        cb(null, './upload/image/background')
    },
    filename: function (req, file, cb){// 设置文件名字格式
        if(file){
            cb(null,"upload_"+Date.parse(new Date())+"_"+file.originalname);
        }   
    }
});

var backgroundUpload = multer({
    storage: bstorage// 应用设置
});

var astorage = multer.diskStorage({
    destination: function (req, file, cb){// 设置文件存储路径
        cb(null, './upload/image/avatar')
    },
    filename: function (req, file, cb){// 设置文件名字格式
        if(file){
            cb(null,"upload_"+Date.parse(new Date())+"_"+file.originalname);
        }   
    }
});

var avatarUpload = multer({
    storage: astorage// 应用设置
});

/* GET users listing. */
router.post('/background', User.signinRequired, backgroundUpload.single('background'), function (req, res) {
   // console.log('background文件上传 '+ req.file.filename);//, req.file, req.session.user);
   //数据库写入
    res.send({
        code:0,
        path:req.file.path
    });
});

router.post('/avatar', User.signinRequired, avatarUpload.single('avatar'), function (req, res) {

    //console.log('avatar文件上传 '+ req.file.filename);//, req.file, req.session.user);
    //res.send(req.file.path);
    res.send({
        code:0,
        path:req.file.path
    });
});
module.exports = router;