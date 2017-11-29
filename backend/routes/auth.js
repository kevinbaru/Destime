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

  //endpoints for using passport
  router.get('/auth/google',
  passport.authenticate('google', { display: 'popup', scope: ['profile', 'email'] }));

  router.get('/user/signin/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });

  // Endpoint for react-google-auth. If a user enters a valid google account,
  // check the database for a user associated with the google id of the verified
  // user. If it succeeds, return success: true and the and associated user 
  router.post('/signin/google', function (req, res) {

    User.findOne({googleID: req.body.profileObj.googleId}, function(err, user) {
      if(err) {
        res.json({success: false, error: err});
      } else if(!user) {
        res.json({success: false, error: "No user with that google account"});
      } else{
        res.json({success: true, user: user});
      }
    });
  });

  // Endpoint for react-facebook-auth. If a user enters a valid facebook account,
  // check the database for a user associated with the facebook id of the verified
  // user. If it succeeds, return success: true and the and associated user 
  router.post('/signin/fb', function (req, res) {

<<<<<<< HEAD
    User.findOne({facebookID: req.body.id}, function(err, user) {
=======
    User.findOne({facebookID: req.body.profileObj.facebookId}, function(err, user) {
>>>>>>> 7c07ae3e1b462bbe4c32ffb72e01d433e80bd711
      if(err) {
        res.json({success: false, error: err});
      } else if(!user) {
        res.json({success: false, error: "No user with that facebook account"});
      } else{
        res.json({success: true, user: user});
      }
    });
  });
  return router;
}
