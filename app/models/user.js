var mongoose = require('mongoose')//引入mongoose这个建模模块
var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports=User;