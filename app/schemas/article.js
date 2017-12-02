var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ArticleSchema = new mongoose.Schema({
  title: String,
  cover: {
    type: String,
    default: 'img\\defaultArticleCover.jpg'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
  author: {
    type: ObjectId,
    ref: 'User'
  },
  desc: {
    type: String
  },
  content: String,
  readc: {
    type: Number,
    default: 0
  },
  commentc: {
    type: Number,
    default: 0
  },
  applausec: {
    type: Number,
    default: 0
  }
});

//静态方法，在model层可使用这个方法，不需要new 实例化
ArticleSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb) //执行callback
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb) //执行callback
  },
  findLimitByUserId: function(author, cb) {
    return this
      .find({
        author: author
      })
      .sort({
        'meta.updateAt': -1
      })
      .limit(10)
      .exec(cb)
  },
  findByUserId: function(author, cb) {
    return this
      .find({
        author: author
      })
      .sort({
        'meta.createAt': -1
      })
      .exec(cb)
  },
  findBySearch: function findBySearch(query, limitNum, cb) {
    return this
      .find(query)
      .sort({
        'meta.updateAt': -1
      })
      .limit(limitNum)
      .exec(cb)
  }
};
ArticleSchema.pre('save', function(next) {
  var article = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});

//实例方法
ArticleSchema.methods = {
  findByUserId: function(author, cd) {
    return this.find({
      'author': author
    }).sort({
      _id: -1
    }).exec(cb)
  }
};
module.exports = ArticleSchema;
