var User = require('../models/user');
var Article = require('../models/article');
var appData = require('../../data.json'); //虚拟数据


//登录页面
exports.showSignin = function(req, res) {
  res.render('signin', {
    user: req.session.user,
    title: '登录页'
  })
};

//注册页面
exports.showSignup = function(req, res) {
  res.render('signup', {
    user: req.session.user,
    title: '注册页'
  })
};


//注册操作
exports.signup = function(req, res) {
  var _user = req.body.user;

  User.findOne({
    name: _user.name
  }, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/users/signin')
    } else {
      var user = new User(_user);

      user.save(function(err, user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      })
    }
  })
};


//登录操作
exports.signin = function(req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err)
    }
    console.log(user);
    if (!user) {
      return res.redirect('/users/signup')
    }

    //对比密码是否正确
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err);
      }

      if (isMatch) {
        //将用户登录信息存入session
        req.session.user = user;
        return res.redirect('/')
      } else {
        return res.redirect('/users/signin')
      }
    })
  })
};


//注销操作
exports.logout = function(req, res) {
  var user = req.session.user;
  if (user) {
    delete req.session.user;
    res.redirect('/');
  } else {
    res.redirect('/users/signin');
  }
};

exports.Showpersonal = function(req, res) {
  res.render('personal', {
    user: req.session.user,
    timeline: appData.timeline,
    posts: appData.perPosts,
    attention: appData.attention,
    perDetail: appData.perDetail
  });
};

exports.ShowPeronalAttention = function(req, res) {
  res.render('personal-attention', {
    user: req.session.user,
    attention: appData.attention,
    perDetail: appData.perDetail
  });
};

exports.ShowPeronalPosts = function(req, res) {
  res.render('personal-posts', {
    user: req.session.user,
    posts: appData.perPosts,
    perDetail: appData.perDetail
  });
};

exports.ShowPeronalDetail = function(req, res) {
  res.render('personal-detail', {
    user: req.session.user,
    perDetail: appData.perDetail
  });
};

exports.ShowPeronalDetailEdit = function(req, res) {
  res.render('personal-detail-edit', {
    user: req.session.user,
    perDetail: appData.perDetail
  });
};



//midware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user;
  if (!user) {
    return res.redirect('/users/signin');
  }
  next();
};

//检查当前登录用户是否为该文章的作者
exports.authorCheck = function(req, res, next) {
  var user = req.session.user;
  var article_id = req.param._id;
  Article.findOne({
    _id: article_id
  }, function(err, article) {
    if (err) {
      console.log(err);
    }
    if (article) {
      if(article.author!=user){
        return res.redirect('/users/signin');
      }
    }
    next();
  })
};


//--------------------------------以下为管理员中间件-------------------

exports.adminRequired = function(req, res, next) {
  var user = req.session.user;

  if (user.role <= 10) {
    return res.redirect('/users/signin')
  }

  next();
};

exports.list = function(req, res) {
  User.fetch(function(err, users) {
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
