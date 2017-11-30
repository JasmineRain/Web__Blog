// import { port } from '_debugger';

var User = require('../models/user');
var Article = require('../models/article');
var appData = require('../../data.json'); //虚拟数据
var moment = require('moment');


//登录页面
exports.showSignin = function (req, res) {
  res.render('signin', {
    user: req.session.user,
    title: '登录页'
  })
};

//注册页面
exports.showSignup = function (req, res) {
  res.render('signup', {
    user: req.session.user,
    title: '注册页'
  })
};


//注册操作
exports.signup = function (req, res) {
  var _user = req.body.user;

  User.findOne({
    name: _user.name
  }, function (err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/users/signin')
    } else {
      var user = new User(_user);

      user.save(function (err, user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      })
    }
  })
};


//登录操作
exports.signin = function (req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({
    name: name
  }, function (err, user) {
    if (err) {
      console.log(err)
    }
    console.log(user);
    if (!user) {
      return res.redirect('/users/signup')
    }

    //对比密码是否正确
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err);
      }

      if (isMatch) {
        //将用户登录信息存入session
        req.session.user = user;
        req.flash('success', '登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功登录成功');
        return res.redirect('/')
      } else {
        return res.redirect('/users/signin')
      }
    })
  })
};


//注销操作
exports.logout = function (req, res) {
  var user = req.session.user;
  if (user) {
    req.session.user = null;
    req.flash('success', '注销成功');
    res.redirect('/');
  } else {
    res.redirect('/users/signin');
  }
};


//个人主页相关操作
//时间轴
exports.Showpersonal = function (req, res) {
  var _id = req.session.user._id;
  User.findOne({
    '_id': _id
  }, function (err, user) {
    Article.findLimitByUserId(req.session.user._id, function (err, posts) {
      let timeline = [];


      if (posts.length) {
        for (let i = 0; i < posts.length; i++) {
          let onepost = {};
          onepost.postId = posts[i]._id;
          onepost.updateAt = moment(posts[i].meta.updateAt).format('YYYY/MM/DD');
          onepost.title = posts[i].title;
          onepost.desc = posts[i].desc;

          timeline.push(onepost);
        }
      }
      console.log(timeline);
      res.render('personal', {
        user: req.session.user,
        timeline: timeline,
        perDetail: user
      });
    })
  })
};
//我的关注
exports.ShowPeronalAttention = function (req, res) {
  var _id = req.session.user._id;
  User.findOne({
    '_id': _id
  }, function (err, user) {
    res.render('personal-attention', {
      user: req.session.user,
      attention: appData.attention,
      perDetail: user
    });
  })

};
//我的文章
exports.ShowPeronalPosts = function (req, res) {
  var _id = req.session.user._id;
  User.findOne({
    '_id': _id
  }, function (err, user) {
    Article.findByUserId(req.session.user._id, function (err, posts) {
      let perPosts = [];
      if (posts.length) {
        for (let i = 0; i < posts.length; i++) {
          let onepost = {};
          onepost.postId = posts[i]._id;
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
        posts: perPosts,
        perDetail: user
      });
    })

  })
};
//我的资料
exports.ShowPeronalDetail = function (req, res) {
  var _id = req.session.user._id;
  User.findOne({
    '_id': _id
  }, function (err, user) {
    res.render('personal-detail', {
      user: req.session.user,
      perDetail: user
    });
  })
};
//编辑我的资料
exports.ShowPeronalDetailEdit = function (req, res) {
  var _id = req.session.user._id;
  User.findOne({
    '_id': _id
  }, function (err, user) {
    res.render('personal-detail-edit', {
      user: req.session.user,
      perDetail: user
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
      if (_user.name) {
        user.name = _user.name;
      }
      if (_user.gender) {
        user.gender = _user.gender;
      }
      user.email = _user.email;
      user.signature = _user.signature;
      user.desc = _user.desc;

      user.save(function (err, user) {
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
      user.background = backgroundPath;
      user.save(function (err, user) {
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
      user.avatar = avatarPath;
      user.save(function (err, user) {
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



//midware for user
exports.signinRequired = function (req, res, next) {
  var user = req.session.user;
  if (!user) {
    return res.redirect('/users/signin');
  }
  next();
};

//检查当前登录用户是否为该文章的作者
exports.authorCheck = function (req, res, next) {
  var user = req.session.user;
  var article_id = req.param._id;
  Article.findOne({
    _id: article_id
  }, function (err, article) {
    if (err) {
      console.log(err);
    }
    if (article) {
      if (article.author != user) {
        return res.redirect('/users/signin');
      }
    }
    next();
  })
};


//--------------------------------以下为管理员中间件-------------------

exports.adminRequired = function (req, res, next) {
  var user = req.session.user;

  if (user.role <= 10) {
    return res.redirect('/users/signin')
  }

  next();
};

exports.listusers = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err)
    }

    res.render('admin_users', {
      user: req.session.user,
      title: '用户列表页面',
      users: users
    })
  })
};