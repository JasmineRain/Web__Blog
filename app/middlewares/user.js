var User = require('../models/user');


//登录页面
exports.showSignin = function (req, res) {
    res.render('signin',{
        title:'登录页'
    })
};

//注册页面
exports.showSignup = function (req, res) {
    res.render('signup',{
        title:'注册页'
    })
};


//注册操作
exports.signup = function (req, res) {
    var _user=req.body.user;

    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err)
        }

        if(user){
            return res.redirect('/signin')
        }else{
            var user=new User(_user);

            user.save(function(err,user){
                if(err){
                    console.log(err);
                }

                res.redirect('/')
            })
        }
    })
};


//登录操作
exports.signin = function (req, res) {
    var _user=req.body.user;
    var name=_user.name;
    var password=_user.password;

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err)
        }

        if(!user){
            return res.redirect('/signup')
        }

        //对比密码是否正确
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }

            if(isMatch){
                //将用户登录信息存入session中
                req.session.user=user;
                return res.redirect('/')
            }else{
                return res.redirect('/signin')
            }
        })
    })
};


//注销操作
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/')
};