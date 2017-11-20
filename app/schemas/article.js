var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    },
    author: { type: 'string' },
    desc: { type: 'string' },
    content:String,
    readc: Number,
    commentc:Number,
    applausec:Number
});

module.exports=ArticleSchema;
