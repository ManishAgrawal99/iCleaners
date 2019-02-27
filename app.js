var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serviceRouter = require('./routes/serviceRouter');
var uploadRouter = require('./routes/uploadRouter');
var cartRouter = require('./routes/cartRouter');
var homeRouter = require('./routes/homeRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Services = require('./models/services');
const User = require('./models/user');

//Connecting to the MongoDB server with DB named iCleaners
//The URL is extracted from the config file
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  //useMongoClient: true
});

connect.then((db) => {
  console.log('connected correctly to the server');
}, (err) =>{
  console.log('err');
});



var app = express();

//Now if we receive any request on port http we need to redirect it to https
app.all('*', (req, res, next) =>{
  if(req.secure){
    //If the incoming request is already secure, it will carry a flag req.secure wehich will be set to true
    return next();
  }
  else{
    //it will take the entire url and then convert the http to https port 3443
    //Status code will be sent as 307 stating that the request lies in another url
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//We will be using signed cookie with the secret key as 12345-67890-09876-54321
//app.use(cookieParser('12345-67890-09876-54321'));
//Setting up the session


app.use(passport.initialize());

//Both are files present inside the routes
//users is to handle login sign up and logout 
//app.use(express.static(path.join(__dirname, 'public')));  

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));    

app.use('/home',homeRouter)
app.use('/services', serviceRouter);
app.use('/cart',cartRouter);
app.use('/imageUpload', uploadRouter);

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
