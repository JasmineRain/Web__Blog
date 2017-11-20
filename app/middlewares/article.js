//render
var ArticleModel = require('../models/article.js');
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
var Article = require('../models/article');



exports.showArticle = function(req, res, next) {

  // var article_id = req.param.article_id;//get article_id
  var article = {
    title: 'JavaScript闭包',
    meta: {
      createAt: Date.now(),
      updateAt: Date.now()
    },
    author: 'ghr',
    desc: '66666',
    content: '**闭包**是指有权访问另一个函数作用域中的变量的函数。\n  --------------------------------------------------------------------------------\n  ## **创建闭包**\n  **创建闭包**的常见方式就是在一个函数内部创建另一个函数\n  ```javascript\n  function createComparisonFunction(propertyName) {\n    return function(object1, object2) {\n      var value1 = object1[propertyName];\n      var value2 = object2[propertyName];\n      if (value1 < value2) {\n        return -1;\n      } else if (value1 > value2) {\n        return 1;\n      } else {\n        return 0;\n      }\n    };\n  }\n  ```',
    readc: 5,
    commentc: 6,
    applausec: 7
  }
  var content_md = md.render(article.content); //render
  article.content = content_md;
  res.render('article', {
    user: req.session.user,
    article: article,
    css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"><link rel="stylesheet" href="/stylesheets/article.css">',
    js_add: ''
  });
  // ArticleModel.findOne({//find article by article_id
  //   '_id': article_id
  // }, function(err, article) {
  //   var content_md = md.render(article.content);//render
  //   article.content = content_md;
  //   res.render('article', {
  //     user: req.session.user,
  //     article: article,
  //     css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"><link rel="stylesheet" href="/stylesheets/article.css">',
  //     js_add: ''
  //   });
  // });

};


exports.newArticle = function(req, res, next) {
  res.render('md_editor', {
    css_add: '<link rel="stylesheet" href="editormd.min.css" />',
    js_add: ''
  })
};
