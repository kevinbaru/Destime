var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
//var connect = process.env.MONGODB_URI || require('./connect');
var connect = "mongodb://destime:destime@ds235775.mlab.com:35775/destime"

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!
var contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  owner: String
});

var userSchema = mongoose.Schema({
  name:String,
  firstname:String,
  lastname:String,
  username: String,
  password: String,
  phone: String,
  facebookID: String,
  facebookToken: String,
  fbrefreshToken:String,
  pictureURL: String,
  friends: Object,
  twitterID: String,
  twitterToken: String,
  twitterTokenSecret: String,
  followers: Object,
  googleID: String,
  pictureURL: String,
  gGtoken:String,
  gGrefreshToken:String,
  linkedinID: String,
  lntoken:String,
  lnrefreshtoken:String,
});
userSchema.plugin(findOrCreate);

var messageSchema = mongoose.Schema({
  created: Date,
  content: String,
  user: String,
  contact: String,
  channel: String,
  status: String,
  from: String
});

// Step 2: Create all of your models here, as properties.
var models = {
  Contact: mongoose.model('Contact', contactSchema),
  User: mongoose.model('User', userSchema),
  Message: mongoose.model('Message', messageSchema)
};

// Step 3: Export your models object
module.exports = models;
