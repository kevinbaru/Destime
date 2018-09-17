var express = require('express');
//var helmet = require('helmet');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');
var expressJWT = require('express-jwt');
//var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var routes = require('./routes/routes')
var cors = require('cors')
var models = require('./models/models');
var User = models.User;
var auth = require('./routes/auth');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var mongoose = require('mongoose');
var connect = "mongodb://destime:destime@ds235775.mlab.com:35775/destime";
mongoose.connect(connect);

//Set the csp protocol for Security purposes

// app.use(helmet.contentSecurityPolicy({
//   directives:{
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", 'apis.google.com'],
//     styleSrc: ["'self'",'maxcdn.bootstrapcdn.com'],
//     imgSrc: ["'self'",'*'],
//     connectSrc: ["'self'",'http://localhost:8080'],
//     fontSrc: ["'self' data:https://fonts.googleapis.com/"],
//     objectSrc: ["'none'"],
//     mediaSrc: ["'self'"],
//     frameSrc: ["'none'"],
//   }
// }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// Passport stuff here
// app.use(session({
//   secret: "mimm",
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


//app.use(expressJWT({secret:'destimetoken2018'}).unless({path:['/login','/signup','/']}))

//app.use(cors())
// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  console.log('serializing userrrrrrrr',user)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize user is being called')
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


//require('./config/passport')(passport);
passport.use(new LocalStrategy(function(username, password, done) {

  // Find the user with the given username
    User.findOne({ username: username }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {

        return done(err);
      }
      // if no user present, auth failed
      if (!user) {

        return done(null, false, {message:'Incorrect username'});
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {

        return done(null, false,{message: 'Incorrect password.'});
      }
      // auth has has succeeded
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json( {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json( {
    message: err.message,
    error: {}
  });
});


module.exports = app;
