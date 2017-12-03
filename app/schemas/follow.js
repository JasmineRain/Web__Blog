var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var FollowSchema = new Schema({
    from:{type:ObjectId,ref:'User'},
    to:[{type:ObjectId,ref:'User'}],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});


FollowSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }

    next()
});

FollowSchema.statics={
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

module.exports=FollowSchema;