/**
 * Created by 14798 on 2017/5/16.
 * 搜索操作
 */

var Article = require('../models/article'); // 文章模型
var limit = 10;
/**
 * 搜索功能
 */
exports.search = function(req, res, next) {
  var reg = new RegExp(req.params.query);
  var query = {
    $or: [{
        'title': reg
      },
      {
        'author': reg
      },
    ]
  };
  Article.findBySearch(query,limit).then(function(obj) {
    if (!obj.length) {
      console.log("article not found");
      var message = 'not found';
      res.send(message);
    } else {
      var articles = [];
      for (var i = 0; i < obj.length; i++) {
        articles[i] = {
          _id: obj[i]._id,
          title: obj[i].title,
          author: obj[i].author,
          desc: obj[i].desc,
          readc: obj[i].readc,
          applausec: obj[i].applausec
        }
      }
      res.send(articles);
    }
  });
};
