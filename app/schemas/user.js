var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    // 0: normal user
    // 1: verified user 通过邮箱注册激活的用户
    // 2: professional user 资料完整的用户
    // >10: admin
    // >50: super admin 开发时的超级管理员
    role:{
        type:Number,
        default:50
    },
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
    avatar: String ,
    gender: { type: String},
    desc: String ,
    signature: String,
    email : String
});

//静态方法，在model层可使用这个方法，不需要new 实例化
UserSchema.statics={
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

UserSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){
            return next(err)
        }

        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err)
            }

            user.password=hash;
            next();
        })
    })
});

//实例方法
UserSchema.methods={
    comparePassword:function(_password,cb){
        //调用bcrypt的compare方法，对比经处理后的密码与当前输入的密码是否一致
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err){
                return cb(err);
            }else{
                cb(null,isMatch);
            }
        })
    }
};

module.exports=UserSchema;