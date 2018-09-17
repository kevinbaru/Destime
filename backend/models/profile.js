var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
//var connect = process.env.MONGODB_URI || require('./connect');
var connect = "mongodb://destime:destime@ds235775.mlab.com:35775/destime"
var Schema = mongoose.Schema

mongoose.connect(connect);

const ObjectId = Schema.Types.ObjectId

var profileSchema = Schema({
  userId:[{
     type: ObjectId,
     ref: 'User'
   }],
  name: String,
  gender:{
    type: String,
    enum:["male","female","other"]
  },
  phone: String,
  pictureURL: String,
  firstname: String,
  lastname: String,
  website: String,
  currLocation: String,
  experience: [Object],
  education: [Object],
  skills: [String],
  title: String,
  facebook:String,
  linkedin: String,
  github: String,
  twitter: String,
  googleplus: String,
});

Profile = mongoose.model('Profile', profileSchema

module.exports = Profile
