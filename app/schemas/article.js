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

//静态方法，在model层可使用这个方法，不需要new 实例化
ArticleSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)//执行callback
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)//执行callback
    }
};
ArticleSchema.pre('save',function(next){
    var article=this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
});
module.exports=ArticleSchema;
