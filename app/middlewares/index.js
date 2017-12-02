var Article = require('../models/article.js');


exports.index= function(req, res, next) {
    // console.log('session in req');
    // console.log(req.session.user);

    // var mostNew = Article
    //     .find({})
    //     .populate('author','name')
    //     .sort('meta.createAt')
    //     .limit(4);
    //

    var mostHot = Article
        .find({})
        .populate('author','name')
        .sort('readc')
        .limit(3)
        .exec(function (err, mostHot) {
            var mostNew = Article
                .find({})
                .populate('author','name')
                .sort('-meta.createAt')
                .limit(3)
                .exec(function (err,mostNew) {
                    console.log(mostHot);
                    console.log(mostNew);
                    res.render('index', {
                        user:req.session.user,
                        HotArticles:mostHot,
                        NewArticles:mostNew
                    });
                })
        });

};

