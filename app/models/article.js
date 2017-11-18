var mongoose = require('mongoose');//引入mongoose这个建模模块
var ArticleSchema = require('../schemas/article');
var Article = mongoose.model('Article',ArticleSchema);

module.exports=Article;