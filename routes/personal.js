var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('personal', {
    css_add: '',
    js_add: ''
  });
});

module.exports = router;
