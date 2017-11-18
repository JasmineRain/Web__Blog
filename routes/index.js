var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('session in req');
  console.log(req.session.user);
  res.render('index', {
    user:req.session.user,
    title: 'Express',
    css_add: '',
    js_add: ''
  });
});

module.exports = router;
