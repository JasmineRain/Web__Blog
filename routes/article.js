var express = require('express');
var router = express.Router();
//render
var hljs = require('highlight.js') // https://highlightjs.org/
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

/* GET home page. */
router.get('/', function(req, res, next) {

  var article_text = '# **JavaScript闭包**\n  **闭包**是指有权访问另一个函数作用域中的变量的函数。\n  --------------------------------------------------------------------------------\n  ## **创建闭包**\n  **创建闭包**的常见方式就是在一个函数内部创建另一个函数\n  ```javascript\n  function createComparisonFunction(propertyName) {\n    return function(object1, object2) {\n      var value1 = object1[propertyName];\n      var value2 = object2[propertyName];\n      if (value1 < value2) {\n        return -1;\n      } else if (value1 > value2) {\n        return 1;\n      } else {\n        return 0;\n      }\n    };\n  }\n  ```'; //article-test
  var article_md = md.render(article_text);

  res.render('article', {
    css_add: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">',
    js_add: '',
    article: article_md
  });
});

router.get('/editor/md/new', function(req, res, next) {
  res.render('md_editor',{
    css_add: '<link rel="stylesheet" href="editormd.min.css" />',
    js_add: ''
  })
});

module.exports = router;
