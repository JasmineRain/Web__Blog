var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('session in req');
  console.log(req.session.user);
  res.render('index', {
    user:req.session.user,
    title: 'Express'
  });
});

module.exports = router;

// module.exports = function (app) {
//   app.get('/', function (req, res) {
//     console.log('session in req');
//     console.log(req.session.user);
//     res.render('index', {
//       user:req.session.user,
//       title: 'Express'
//     });
//   })
//   // app.use('/signup', require('./signup'))
//   // app.use('/signin', require('./signin'))
//   // app.use('/signout', require('./signout'))
//   // app.use('/posts', require('./posts'))
//   // app.use('/comments', require('./comments'))

//   // app.use('/', require('./index'));
//   app.use('/users', require('./users'));
//   app.use('/personal',require('./personal'));
//   app.use('/article',require('./article'));
//   app.use('/admin',require('./admin'));
//   app.use('/upload',require('./upload'));
//   app.use('/comment',require('./comment'));

//   // 404 page
//   app.use(function (req, res) {
//     if (!res.headersSent) {
//       res.status(404).render('404')
//     }
//   })
// }