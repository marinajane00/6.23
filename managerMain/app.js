var express = require('express');  
var path = require('path');  
var favicon = require('serve-favicon');  
var logger = require('morgan');  
var cookieParser = require('cookie-parser');  
var bodyParser = require('body-parser');

/*
var login = require('./routes/login');  
var index = require('./routes/index');
var admin = require('./routes/admin');
var table = require('./routes/table');
var upload = require('./routes/upload');
var dataSource = require('./routes/dataSource');
*/
var admin = require('./routes/admin');
var dbSource = require('./routes/dbSource');

var app = express();

// 设置模版引擎
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');

app.use(logger('dev'));  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public')));

// 启用自定义的路由中间件
app.use(admin.get);
dbSource.dbSource();
/*
app.use(login.get);  
app.use(login.post);  
app.use(index.get);
app.use(admin.get);
app.use(dataSource.get);
app.use(dataSource.post);
app.use(table.get);
app.use(table.post);
app.use(upload.get);
app.use(upload.post);
*/

// 捕获404错误，并交由错误处理器处理
app.use(function(req, res, next) {  
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理器
app.use(function(err, req, res, next) {  
  // 只有在开发模式下才提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;