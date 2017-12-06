var User = require('../models/user');
var Article = require('../models/article');
var Follow = require('../models/follow');
var moment = require('moment');

//个人主页相关操作
//点赞
exports.GiveApplause = function(req,res){
    console.log(req.params._id);
    let id=req.params._id;
    Article.update({_id:id},{$inc:{applausec:1}},function(err){
        if(err){
            console.log(err)
            return res.send({success:0})
        }

        return res.send({success:1})
        
    });
}

//时间轴
exports.Showpersonal = function (req, res) {
    let targId = req.query.id;
    let usId = req.session.user._id;
    let thisUser = true;
    if (!targId) { //没写目标id
        req.flash('error', '找不到该博主！');
        return res.redirect('back'); //返回之前页面
    } else if (targId !== usId) {
        thisUser = false;
    }
    console.log(targId, usId);
    User.findOne({
        _id: targId
    }, function (err, user) {
        if (err) { //报错
            console.log(err);
            req.flash('error', err);
            return res.redirect('back'); //返回之前页面
        }
        Article.findLimitByUserId(targId, 10, function (err, posts) {
            if (err) { //报错
                console.log(err);
                req.flash('error', err);
                return res.redirect('back'); //返回之前页面
            }
            let timeline = [];

            if (posts.length) {
                for (let i = 0; i < posts.length; i++) {
                    let onepost = {};
                    onepost._id = posts[i]._id;
                    onepost.updateAt = moment(posts[i].meta.updateAt).format('YYYY/MM/DD');
                    onepost.title = posts[i].title;
                    onepost.desc = posts[i].desc;

                    timeline.push(onepost);
                }
            }
            console.log(timeline);
            res.render('personal', {
                user: req.session.user, //当前用户
                thisUser: thisUser,
                timeline: timeline,
                toUser: user //目标用户
            });
        })
    })
};

//我的关注
exports.ShowPeronalAttention = function (req, res) {
    console.log('ShowPeronalAttention');
    let targId = req.query.id;
    let usId = req.session.user._id;
    let thisUser = true;
    let attention=[];
    if (targId !== usId) {
        req.flash('error', '无权访问该页面');
        return res.redirect('back'); //返回之前页面
    }
    User.findOne({
        '_id': targId
    }, function (err, user) {
        if(err){
            console.log(err);
            req.flash('error', '访问出错！');
            return res.redirect('back')
        }
        //存在该用户
        //查找该用户关注的人的列表
        Follow.findOne({from:targId},function(err,follow){
            if(err){
                console.log(err);
                req.flash('error', '访问出错！');
                return res.redirect('back')
            }
            if(follow){
            Article
            .find({author:{$in:follow.to}})
            .populate('author', ['name','avatar'])
            .sort({'meta.updateAt': -1})
            .exec(function(err,articles){
                console.log(articles);

                if(err){
                    console.log(err);
                    req.flash('error', '访问出错！');
                    return res.redirect('back')
                }
                if(articles){
                    for(var i=0;i<articles.length;i++){
                        let post={
                            _id:articles[i]._id,
                            title:articles[i].title,
                            cover:articles[i].cover,
                            updateAt:moment(articles[i].updateAt).format('YYYY/MM/DD'),
                            author:articles[i].author,
                            desc:articles[i].desc,
                            readc:articles[i].readc,
                            commentc:articles[i].commentc,
                            applausec:articles[i].applausec,
                        };
                        attention.push(post);
                    }
                }
                console.log(attention);
                //console.log('Article',articles);
                //发送数据
                return res.render('personal-attention', {
                    user: req.session.user,
                    thisUser: thisUser,
                    attention: attention,
                    toUser: user
                });
            });
        }else{
            return res.render('personal-attention', {
                user: req.session.user,
                thisUser: thisUser,
                attention: attention,
                toUser: user
            });
        }
        })
    })

};
//我的文章
exports.ShowPeronalPosts = function (req, res) {
    //用户判断
    let targId = req.query.id;
    let usId = req.session.user._id;
    let thisUser = true;
    if (!targId) { //没写目标id
        req.flash('error', '找不到该博主！');
        return res.redirect('back'); //返回之前页面
    } else if (targId !== usId) {
        console.log('thisUser');
        thisUser = false;
    }
    User.findOne({
        '_id': targId
    }, function (err, user) {
        if (err) { //报错
            console.log(err);
            req.flash('error', err);
            return res.redirect('back'); //返回之前页面
        }

        Article.findByUserId(targId, function (err, posts) {
            if (err) { //报错
                console.log(err);
                req.flash('error', err);
                return res.redirect('back'); //返回之前页面
            }

            let perPosts = [];
            if (posts.length) {
                for (let i = 0; i < posts.length; i++) {
                    let onepost = {};
                    onepost._id = posts[i]._id;
                    onepost.cover = posts[i].cover;
                    onepost.createAt = moment(posts[i].meta.createAt).format('YYYY/MM/DD');
                    onepost.title = posts[i].title;
                    onepost.desc = posts[i].desc;
                    onepost.readc = posts[i].readc;
                    onepost.commentc = posts[i].commentc;
                    onepost.applausec = posts[i].applausec;


                    perPosts.push(onepost);
                }
            }
            res.render('personal-posts', {
                user: req.session.user,
                thisUser: thisUser,
                posts: perPosts,
                toUser: user
            });
        })

    })
};
//我的资料
exports.ShowPeronalDetail = function (req, res) {
    //用户判断
    let targId = req.query.id;
    let usId = req.session.user._id;
    let thisUser = true;
    if (!targId) { //没写目标id
        req.flash('error', '找不到该博主！');
        return res.redirect('back'); //返回之前页面
    } else if (targId !== usId) {
        console.log('thisUser');
        thisUser = false;
    }
    User.findOne({
        '_id': targId
    }, function (err, user) {
        if (err) { //报错
            console.log(err);
            req.flash('error', err);
            return res.redirect('back'); //返回之前页面
        }

        res.render('personal-detail', {
            user: req.session.user,
            thisUser: thisUser,
            toUser: user
        });
    })
};
//编辑我的资料
exports.ShowPeronalDetailEdit = function (req, res) {
    //用户判断
    let targId = req.query.id;
    let usId = req.session.user._id;
    let thisUser = true;
    if (!targId) { //没写目标id
        req.flash('error', '找不到该博主！');
        return res.redirect('back'); //返回之前页面
    } else if (targId !== usId) {
        console.log('thisUser');
        thisUser = false;
    }
    User.findOne({
        '_id': targId
    }, function (err, user) {
        if (err) { //报错
            console.log(err);
            req.flash('error', err);
            return res.redirect('back'); //返回之前页面
        }
        res.render('personal-detail', {
            user: req.session.user,
            thisUser: thisUser,
            toUser: user
        });
    })
};

exports.PeronalDetailEdit = function (req, res) {
    var _user = req.body.user;
    var _id = req.session.user._id;
    console.log(_user);
    User.findOne({
        '_id': _id
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            let user2 = {};
            if (_user.name) {
                user2.name = _user.name;
            }
            if (_user.gender) {
                user2.gender = _user.gender;
            }
            user2.email = _user.email;
            user2.signature = _user.signature;
            user2.desc = _user.desc;
            console.log('66666666666666666', user2);

            User.update({
                _id: _id
            }, user2, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('更改成功');
                res.redirect('back');
            })
        }
    })
};

//upload相关操作
//更改背景图
exports.UploadChangeBackground = function (req, res) {
    console.log('执行');
    var _user = req.session.user;
    var backgroundPath = req.file.path;
    console.log(_user.name, backgroundPath)
    User.findOne({
        '_id': _user._id
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            User.update({
                _id: _user._id
            }, {
                background: backgroundPath
            }, function (err) {
                if (err) {
                    console.log('2', err);
                }
                res.send({
                    code: 0,
                    path: req.file.path
                });
            })
        } else {
            res.render('/singin');
        }
    })
};
//更改头像
exports.UploadChangeAvatar = function (req, res) {
    console.log('执行');
    var _user = req.session.user;
    var avatarPath = req.file.path;
    User.findOne({
        '_id': _user._id
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            User.update({
                _id: _user._id
            }, {
                avatar: avatarPath
            }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.send({
                    code: 0,
                    path: req.file.path
                });
            })
        } else {
            res.render('/singin');
        }
    })
};