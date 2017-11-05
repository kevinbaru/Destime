var express = require('express');
var router = express.Router();
var models = require('../models.js');
var validator = require('validator');
var cors = require('cors')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var models = require('../models');
var User = models.User;
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if(!payload) {
    errors.payload ='request not read properly';
  }

  if (!payload || typeof payload.username !== 'string' || !validator.isEmail(payload.username)) {
    isFormValid = false;
    errors.username = 'Please provide a correct username.';
  }

  if (!payload || !payload.password) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || !payload.name) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }
  if (!payload || payload.passwordRepeat !== payload.password) {
    isFormValid = false;
    errors.passwordRepeat = "Passwords don't match.";
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


module.exports = function(passport) {
  router.use(cors())

  router.post('/signup', function(req, res) {

    // validation step
    const validationResult = validateSignupForm(req.body);

    if (!validationResult.success) {
      return  res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    var u  = new models.User({
      name:req.body.name,
      username: req.body.username,
      password: req.body.password,
    });

    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({success:false,message:'Check the form for error',errors:{name: err}});
        return;
      }else{
        res.status(200).json({success:true});

      }

    });
  });

// POST Login page


  router.post('/login', passport.authenticate('local',{'failureRedirect':'/failure'}), function(req,res) {
    console.log("User login succeeded");
   res.status(200).json({success: true});
 });

  router.get('/failure', function(req, res) {
    console.log("User login failed");
    res.json({
      success: false,
      error: "Invalid login credentials"
    })
  });

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({success:true});
  });

  // router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends'] }));
  //
  // router.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   }
  // );

 //  router.get('/signin/facebook', passport.authenticate('facebook', { scope : 'email' }));
 //
 //  router.get('/signin/facebook/callback', passport.authenticate('facebook', {failureRedirect : '/failure'}), function(req,res) {
 //   res.status(200).json({success: true, token:returnToken});
 // });
 //



  //
  // router.get('/auth/twitter', passport.authenticate('twitter'));
  //
  // router.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   }
  // );
  router.get('/auth/google',
  passport.authenticate('google', { display: 'popup', scope: ['profile', 'email'] }));

  router.get('/user/signin/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

    router.post('/signin/google', function (req, res) {

      User.findOne({googleID: req.body.profileObj.googleId}, function(err, user) {
        if(!user) {
          res.json({success: false, error: "No user with that google account"});
        } else{
          res.json({success: true, user: user});
        }
      });
    })
 
  return router;
}
