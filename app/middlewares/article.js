var Article = require('../models/article.js');
var Comment = require('../models/comment');
var hljs = require('highlight.js'); // https://highlightjs.org/
var md = require('markdown-it')({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});



exports.showArticle = function(req, res, next) {
  var article_id = req.params._id;
  Article.findOne({'_id': article_id}, function(err, article) {
    var content_md = md.render(article.content);
    article.content = content_md;
    Comment
        .find({
              article: article_id})
        .populate('from', 'name')
        .populate('reply.from reply.to', 'name')
        .exec(function(err, comments) {
            res.render('article', {
                css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-dune-dark.min.css"><link rel="stylesheet" href="/stylesheets/article.css">',
                title: '详情页面' + article.title,
                article: article,
                comments: comments,
                user: req.session.user
            })
        });

    // res.render('article', {
    //     comments: comments,
    //   user: req.session.user,
    //   article: article,
    //   css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"><link rel="stylesheet" href="/stylesheets/article.css">'
    // });
  })
      .populate('author','name -_id');
};


exports.newArticle = function(req, res, next) {
  res.render('md_editor', {
    css_add: '<link rel="stylesheet" href="editormd.min.css" />'
  })
};



exports.editArticle = function(req, res, next) {
  var article_id = req.params._id;
  Article.findOne({
    _id: article_id}, function(err, article) {
    res.render('md_editor', {
      css_add: '<link rel="stylesheet" href="editormd.min.css" />',
      article: article
    })
  })
};

//提交文章
exports.postArticle = function(req, res, next) {
  var _article = {};
  if (req.body.article._id) {
    Article.findById(req.body.article._id, function(err, article) {
      article.title = req.body.article.title;
      article.content = req.body.article.content;
      article.save(function(err, article) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      })
    })
  } else {
    _article = {
      title: req.body.article.title,
      content: req.body.article.content,
      author: req.session.user,
      desc: '???',
      readc: 0,
      commentc: 0,
      applausec: 0
    };
    var article = new Article(_article);
    article.save(function(err, article) {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    })
  }
};



//detail page
exports.detail = function(req, res) {
  var id = req.params._id;

  //每次进入电影详情页则该电影访客数pv加一
  // Movie.update({_id:id},{$inc:{pv:1}},function(err){
  //     if(err){
  //         console.log(err)
  //     }
  // })

  Article.findById(id, function(err, article) {
    Comment
      .find({
        article: id
      })
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        console.log(comments);
        res.render('detail', {
          title: '详情页面' + article.title,
          article: article,
          comments: comments,
          user: req.session.user
        })
      })
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
