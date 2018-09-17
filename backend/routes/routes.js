var express = require('express');
var router = express.Router();
var models = require('../models/models.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var path = require('path');
mongoose.Promise = global.Promise;

var checkToken = function(req,res,next){
  var token = req.body.token || re.query.token
  if (token){
    jwt.verify(token, 'destimetoken2018', function(err,decoded){
      if(err){
        console.log('failedd to match tokkenene',err)
        return res.status(401).json({success:false, message: 'Failed to authenticate token'})
      } else{

        req.decoded = decoded;

        next()
      }
    })
  } else {
    res.redirect('/')
    return res.status(403).json({success:false, message: "No token provided"})
  }
}

router.post('/profile/:profileId/', checkToken, function(req,res){
  models.Profile.update({_id:req.params.profileId},{ $set: {mainInfo:req.body.creds}})
  .then((profile)=>{

    res.status(200).json({success:true})
  })
  .catch(err=>{
    console.log('error updating the records',err)
    res.status(500).json({success:false, error:err})
  })
})


router.post('/uploadprofilepic', checkToken, function(req,res){
  models.Profile.updateOne({_id:req.params.profileId},{ $set: {profilepic:req.body.mainInfo}})
  .then((profile)=>{
    res.status(200).json({success:true})
  })
  .catch(err=>{
    console.log('error updating the records',err)
    res.status(500).json({success:false, error:err})
  })

})

router.post('/addexperience/:profileId/', checkToken, function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  models.Profile.findByIdAndUpdate(
    req.params.profileId,
    {$push: {"experience": req.body.entry}},
    {safe: true, upsert: true},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})

router.post('/editexperience/:profileId/', checkToken, function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  var entry = req.body.entry
  models.Profile.updateOne({_id: req.params.profileId, "experience.jobId": entry.jobId},
    {$set: {"experience.$": entry}},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})



router.post('/addeducation/:profileId/', checkToken, function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  models.Profile.findByIdAndUpdate(
    req.params.profileId,
    {$push: {"education": req.body.entry}},
    {safe: true, upsert: true},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})

router.post('/addskills/:profileId/', checkToken,function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  models.Profile.findByIdAndUpdate(
    req.params.profileId,
    {$push: {"skills": req.body.entry}},
    {safe: true, upsert: true},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})

router.post('/editeducation/:profileId/', checkToken,function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  var entry = req.body.entry
  models.Profile.updateOne({_id: req.params.profileId, "education.skulId": entry.skulId},
    {$set: {"education.$": entry}},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})

router.post('/deleteeducation/:profileId/', checkToken,function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  var entry = req.body.entry
  models.Profile.update({_id: req.params.profileId},
    {$pull: {education:{skulId: entry.skulId}}},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})



router.post('/deleteexperience/:profileId/', checkToken,function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)
  var entry = req.body.entry
  models.Profile.update({_id: req.params.profileId},
    {$pull: {experience:{jobId: entry.jobId}}},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})


router.post('/deleteskills/:profileId/', checkToken,function(req,res){
  console.log('getting to routes.js',req.params.profileId,req.body.entry)

  models.Profile.update(
    {_id:req.params.profileId},
    {$pull: {"skills": req.body.entry}},
    function(err, model) {
      if(err){
        console.log('error updating the records',err);
        res.status(500).json({success:false, error:err});
      }else{
        res.status(200).json({success:true});
      }

    }
);
})


module.exports = router;
