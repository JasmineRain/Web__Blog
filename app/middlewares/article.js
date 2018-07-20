var Article = require('../models/article.js');
var Comment = require('../models/comment');
var Follow = require('../models/follow');
let fs = require('fs');
let path = require('path');
var moment = require('moment');

exports.showArticle = function(req, res, next) {
  var article_id = req.params._id;
  Article.update({
    _id: article_id
  }, {
    $inc: {
      readc: 1
    }
  }, function(err) {
    if (err) {
      console.log(err);
    }
  });

  Article.findOne({
      '_id': article_id
    }, function(err, article) {
      if (err) {
        console.log(err)
        req.flash('error', '找不到该文章！');
        return res.redirect('back'); //返回之前页面
      }


      Comment
        .find({
          article: article_id
        })
        .populate('from')
        .populate('reply.from reply.to')
        .exec(function(err, comments) {
          if (req.session.user) {
            Follow.findOne({
              from: req.session.user._id
            }, function(err, follow) {
              var isFollow = 0;
              // console.log("req"+req.session.user._id);
              // console.log(follow.to);
              console.log(article.author._id);
              if (follow) {
                if (follow.to.indexOf(article.author._id) >= 0) {
                  isFollow = 1;

                }

              }
              res.render('article_details', {
                css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-dune-dark.min.css"><link rel="stylesheet" href="/stylesheets/article.css"><link rel="stylesheet" href="https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.css"><link href="https://cdn.bootcss.com/KaTeX/0.9.0-alpha2/katex.min.css" rel="stylesheet">',
                js_add: '<script src="/javascript/article.js"></script>',
                title: '详情页面' + article.title,
                article: article,
                comments: comments,
                user: req.session.user,
                isFollow: isFollow,
                time:moment(article.meta.updateAt).format('YYYY/MM/DD')
              })
            });
          } else {
            res.render('article_details', {
              css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-dune-dark.min.css"><link rel="stylesheet" href="/stylesheets/article.css"><link rel="stylesheet" href="https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.css"><link href="https://cdn.bootcss.com/KaTeX/0.9.0-alpha2/katex.min.css" rel="stylesheet">',
              js_add: '<script src="/javascript/article.js"></script>',
              title: '详情页面' + article.title,
              article: article,
              comments: comments,
              user: req.session.user,
              time:moment(article.meta.updateAt).format('YYYY/MM/DD')
            })
          }
        });
    })
    .populate('author');
};


exports.newArticle = function(req, res, next) {
  res.render('article_edit', {
    js_add: '<script src="/javascript/autoSave.js"></script>'
  })
};

exports.Tset = function(req, res, next) {
  res.render('eidtorTest');
};




exports.editArticle = function(req, res, next) {
  var article_id = req.params._id;
  Article.findOne({
    _id: article_id
  }, function(err, article) {
    res.render('article_edit', {
      css_add: '<link rel="stylesheet" href="editormd.min.css" />',
      js_add: '<script src="/javascript/autoSave.js"></script>',
      article: article
    })
  })
};

//提交文章
exports.postArticle = function(req, res, next) {
  var _article = {};
  let uploadpath = 0;
  //判断封面
  if (req.body.cover) {
    uploadpath = imageUpload(req.body.cover, 'upload/image/articleCover/');
    console.log('uploadpath', uploadpath)
  }
  var reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g;
  if (req.body._id) {
    Article.findById(req.body._id, function(err, article) {
      if (!article) {
        return res.send({
          success: 0
        }); //返回之前页面
      }
      if (req.body.cover)
        article.cover = uploadpath;
      article.title = req.body.title;
      article.content = req.body.content;
      article.desc = req.body.content.substring(0, 500).replace(reg, ""); //截取前50个字符作为简介
      article.save(function(err, article) {
        if (err) {
          console.log(err);
          res.send({
            success: 0
          });

        }
        res.send({
          success: 1,
          id: article._id
        });
      })
    })
  } else {
    if (uploadpath !== 0) {
      _article = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.user,
        cover: uploadpath,
        desc: req.body.content.substring(0, 500).replace(reg, ""), //截取前50个字符作为简介
        readc: 0,
        commentc: 0,
        applausec: 0
      };
      console.log('_article', _article);
    } else {
      _article = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.user,
        desc: req.body.content.substring(0, 500).replace(reg, ""), //截取前50个字符作为简介
        readc: 0,
        commentc: 0,
        applausec: 0
      };
    }
    var article = new Article(_article);
    article.save(function(err, article) {
      if (err) {
        console.log(err);
        res.send({
          success: 0
        });

      }
      res.send({
        success: 1,
        id: article._id
      });
    })
  }


  // imgData：传来的图片数据
  // path：保存的路径  这里建议使用 “upload/image/articleCover/”
  function imageUpload(imgData, uploadpath) {
    console.log('dadadadasdsadad');
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let filename = "image_upload_" + Date.parse(new Date()) + ".png";
    let str = uploadpath + filename;

    fs.writeFile(str, dataBuffer, function(err) {
      if (err) {
        console.log('66666655555555555555', err);
      } else {
        console.log('success')
      }
    });

    return str
  }
};

exports.deleteArticle = function(req, res) {
  var ArticleId = req.query.aid;
  Article.findOne({
    _id: ArticleId
  }, function(err, article) {
    if (err)
      console.log(err);
    if (article) {
      Comment.find({
          article: ArticleId
        })
        .exec(function(err, comments) {
          Comment.remove({
            article: ArticleId
          }, function(err, comments) {
            if (err)
              console.log(err)
          });
        })
    }
    Article.remove({
      _id: ArticleId
    }, function(err, article) {
      if (err)
        console.log(err);
    });
  });
  res.json({
    success: 1
  })
};



exports.listarticles = function(req, res) {
  Article.fetch(function(err, articles) {
    if (err) {
      console.log(err)
    }

    res.render('admin_articles', {
      user: req.session.user,
      title: '文章列表页面',
      articles: articles
    })
  })
};

exports.getAllArticles = function (req, res) {
    Article.fetch(function(err, articles) {
        if (err) {
            console.log(err)
        }

        res.render('article_list', {
            user: req.session.user,
            title: '全部文章',
            articles: articles
        })
    })
};
