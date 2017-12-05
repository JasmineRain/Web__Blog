var Follow = require('../models/follow');


exports.add = function(req,res){
     var _user = req.session.user;
     var _tid = req.query.tid;
     var op = req.query.op;
     //console.log(op);
    if(_user._id){
        if(op==='1'){
            Follow.findOne({from:_user._id},function (err, follow) {
                if(err)
                    console.log(err);
                if(follow){
                    if(follow.to.indexOf(_tid)>=0){
                        //console.log(follow.to.indexOf(_tid));
                        follow.to.remove({_id:_tid});
                        follow.save();
                        //console.log(follow.to.indexOf(_tid));

                        res.send({success:1});

                    }else{
                        res.send({success:1});
                    }
                }
                else{
                    res.send({success:1});
                }
            })
        }else{
            Follow.findOne({from:_user._id},function(err,follow){
                if(err)
                    console.log(err);
                if(follow){
                    if(follow.to.indexOf(_tid)>=0)
                        res.send({success:1});
                    else{
                        follow.to.push(_tid);
                        follow.save(function(err,follow){
                            if(err){
                                console.log(err)
                            }
                            res.send({success:1});
                        })
                    }
                }else{
                    var _follow = new Follow({
                        from: _user._id,
                        to:[_tid]
                    });
                    _follow.save(function (err, follow) {
                        if(err)
                            console.log(err);
                        res.send({success:1});
                    });
                }
            })
        }


    }else{
        res.send({success:0});
    }
};

exports.listfollows = function (req, res) {
    Follow.fetch(function(err, follows) {
        if (err) {
            console.log(err)
        }

        res.render('admin_follows', {
            user: req.session.user,
            title: '关注列表页面',
            follows: follows
        })
    })
};
