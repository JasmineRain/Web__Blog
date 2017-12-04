var Article = require('../models/article.js');
var Comment = require('../models/comment');
var Follow = require('../models/follow');

var hljs = require('highlight.js'); // https://highlightjs.org/
let kt = require('katex'),
  tm = require('markdown-it-texmath').use(kt);
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
md.use(require('markdown-it-emoji'))
  .use(require('markdown-it-toc'))
  .use(tm);



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
      console.log(err)
    }
  });



  Article.findOne({
      '_id': article_id
    }, function(err, article) {



      var content_md = md.render(article.content);
      article.content = content_md;



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
                isFollow: isFollow
              })
            });
          } else {
            res.render('article_details', {
              css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-dune-dark.min.css"><link rel="stylesheet" href="/stylesheets/article.css"><link rel="stylesheet" href="https://gitcdn.xyz/cdn/goessner/markdown-it-texmath/master/texmath.css"><link href="https://cdn.bootcss.com/KaTeX/0.9.0-alpha2/katex.min.css" rel="stylesheet">',
              js_add: '<script src="/javascript/article.js"></script>',
              title: '详情页面' + article.title,
              article: article,
              comments: comments,
              user: req.session.user
            })
          }



        });
    })
    .populate('author');
};


exports.newArticle = function(req, res, next) {
  res.render('article_edit', {
    css_add: '<link rel="stylesheet" href="editormd.min.css" />'
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
      article: article
    })
  })
};

//提交文章
exports.postArticle = function(req, res, next) {
  var _article = {};
  var reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g;
  if (req.body.article._id) {
    Article.findById(req.body.article._id, function(err, article) {
      article.title = req.body.article.title;
      article.content = req.body.article.content;
      article.desc = req.body.article.content.substring(0, 500).replace(reg, ""); //截取前50个字符作为简介
      article.save(function(err, article) {
        if (err) {
          console.log(err);
        }
        res.redirect('/article/'+article._id);
      })
    })
  } else {
    _article = {
      title: req.body.article.title,
      content: req.body.article.content,
      author: req.session.user,
      desc: req.body.article.content.substring(0, 500).replace(reg, ""), //截取前50个字符作为简介
      readc: 0,
      commentc: 0,
      applausec: 0
    };
    var article = new Article(_article);
    article.save(function(err, article) {
      if (err) {
        console.log(err);
      }
      res.redirect('/article/'+article._id);
    })
  }
};

exports.deleteArticle = function (req, res) {
    var ArticleId = req.query.aid;
    Article.findOne({_id:ArticleId},function (err, article) {
        if(err)
            console.log(err);
        if(article){
            console.log(' i am runing');
            Comment.find({article: ArticleId})
                .exec(function (err, comments) {
                    console.log(comments.length);
                    Comment.remove({article:ArticleId});
                    Comment.save();
                })
        }
        Article.remove({_id:ArticleId},function (err, article) {
            if(err)
                console.log(err);
        });
    });
    res.json({success:1})
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
