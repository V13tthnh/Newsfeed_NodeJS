var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');
var contactRouter = require('./routes/contact');
var page404Router = require('./routes/404');
var accountRouter = require('./routes/account');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var categoryRouter = require('./routes/category');
var postRouter = require('./routes/post');
var addCategoryRouter = require('./routes/add_category');
var deleteCategoryRouter = require('./routes/delete_category');
var updateCategoryRouter = require('./routes/update_category');
var addAccountRouter = require('./routes/add_acccount');
var deleteAccountRouter = require('./routes/delete_account');
var updateAccountRouter = require('./routes/update_account');
var addPostRouter = require('./routes/add_post');
var deletePostRouter = require('./routes/delete_post');
var updatePostRouter = require('./routes/update_post');
var recoverAccountRouter = require('./routes/recover_account');
const { updatePost } = require('./modules_server');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// client pages
app.use('/', indexRouter);
app.use('/detail', detailRouter);
app.use('/contact', contactRouter);
app.use('/404', page404Router);
// admin pages
//Đăng nhập, đăng xuất, đăng ký
app.use('/admin', loginRouter);
app.use('/admin', logoutRouter);
app.use('/admin', registerRouter);
//Trang quản lý
app.use('/admin', accountRouter);
app.use('/admin', categoryRouter);
app.use('/admin', postRouter);
//Thêm xóa sửa danh mục
app.use('/admin', addCategoryRouter);
app.use('/admin', deleteCategoryRouter);
app.use('/admin', updateCategoryRouter);
//Thêm xóa sửa tài khoản
app.use('/admin', addAccountRouter);
app.use('/admin', deleteAccountRouter);
app.use('/admin', updateAccountRouter);
app.use('/admin', recoverAccountRouter);
//Thêm xóa sửa bài viết
app.use('/admin', addPostRouter);
app.use('/admin', deletePostRouter);
app.use('/admin', updatePostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
