var express = require('express');
var authapi = express.Router();
var models = require('../models/models.js');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var path  = require("path");
var expressJWT = require('express-jwt');

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || !validator.isEmail(payload.username)) {
    isFormValid = false;
    errors.username = 'Please provide a valid email address.';
  }

  if (!payload || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
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

  authapi.post('/signup', function(req, res) {

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

   u.save()
   .then((user)=>{
     var p = new models.Profile({
       userId:user._id,
       mainInfo:{
                firstname:req.body.firstname,
                lastname:req.body.lastname,

              }
     })
     return p.save()
   })
   .then(function(p){
     res.status(200).json({success:true});
   })
   .catch(function(err){
       res.status(500).json({success:false, message:'Database error',errors:{summary: err}});
   })
  });

// POST Login page

  authapi.post('/login', passport.authenticate('local',{'failureRedirect':'/failure'}), function(req,res) {

   models.Profile.findOne({userId:req.user._id},function(err,profile){
     if(err){
       res.status(500).json({success:false, message: 'Database Error',errors:{summary:err}})
     }else{
       var token =  jwt.sign({data: req.user._id},'destimetoken2018')

       res.status(200).json({success: true,profile:profile,token:token});
     }
   })


 });

  authapi.get('/failure', function(req, res) {

    res.json({
      success:false,
      error:'Incorrect Password/username'
    })
  });

authapi.get('/login', function(req,res){

  if(req.user){


    res.json({success:true, user:req.user})
  }

})
  authapi.get('/signin/google', passport.authenticate('google', { scope: ['email profile'] }));


  // authapi.get('/signin/google', function(req,res) {
  //   res.status(200).json({success:true, message:'baccc'})
  // });

  authapi.get('/user/signin/google/callback', passport.authenticate('google', {failureRedirect : '/failure'}),
  function(req,res){
    console.log('Its bacckkk',req.user)
    res.redirect('/login')
  });



  return authapi;
}
