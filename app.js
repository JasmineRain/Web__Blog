var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var mongoose = require('mongoose');
const flash = require('connect-flash');


var index = require('./routes/index');
var users = require('./routes/users');
var personal = require('./routes/personal');
var article = require('./routes/article');
var admin = require('./routes/admin');
var upload = require('./routes/upload');
var comment = require('./routes/comment');
var search = require('./routes/search');


var morgan = require("morgan");
var app = express();
var dbUrl = 'mongodb://localhost/test';

mongoose.connect(dbUrl);
app.use(session({
  secret: 'Blog',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })

}));


if ('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true; //格式化显示代码，不要让全部html显示在一行
  mongoose.set('debug', false)
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
// app.use(express.json({limit: '5mb'}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
// flash 中间件，用来显示通知
app.use(flash());

// 添加模板必需的三个变量
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
});

app.use('/', index);
app.use('/users', users);
app.use('/personal', personal);
app.use('/article', article);
app.use('/admin', admin);
app.use('/upload', upload);
app.use('/comment', comment);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("catch 404 and forward to error handler");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("set locals, only providing error in development");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
