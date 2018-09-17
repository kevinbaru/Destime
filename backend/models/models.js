var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
//var connect = process.env.MONGODB_URI || require('./connect');
var connect = "mongodb://destime:destime@ds235775.mlab.com:35775/destime"

mongoose.connect(connect);

const ObjectId = mongoose.Schema.Types.ObjectId

var contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  owner: String
});

var userSchema = mongoose.Schema({
  name:String,
  username: {
    type :String,
    required:true,
    unique:true
  },
  password: {
    type :String,
    required:true,
  },
  facebookID: String,
  facebookToken: String,
  fbrefreshToken:String,
  friends: Object,
  twitterID: String,
  twitterToken: String,
  twitterTokenSecret: String,
  followers: Object,
  googleID: String,
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
var profileSchema = mongoose.Schema({
  userId:[{
     type: ObjectId,
     ref: 'User'
   }],
  mainInfo:{
    name: String,
    gender:{
      type: String,
      enum:["male","female","other"]
    },
    phone: String,
    dob: Date,
    blurb:String,
    telephone:String,
    profilepic: { data: Buffer, contentType: String },
    firstname: String,
    lastname: String,
    website: String,
    currLocation: String,
    profession: String,
    country:String,
    state:String,
    city:String,
  },
  experience: [{
    jobId:Number,
    title:String,
    company:String,
    location:String,
    start:Date,
    end:Date,
    desc:String
  }],
  education: [{
    skulId:Number,
    name:String,
    degree:String,
    major:String,
    minor:String,
    graduation:Date,
    location:String
  }],
  skills: [String],
  social:{
    facebook:String,
    linkedin: String,
    github: String,
    twitter: String,
    googleplus: String,
  }

});
// Step 2: Create all of your models here, as properties.
var models = {
  Contact: mongoose.model('Contact', contactSchema),
  User: mongoose.model('User', userSchema),
  Message: mongoose.model('Message', messageSchema),
  Profile: mongoose.model('Profile', profileSchema)
};

// Step 3: Export your models object
module.exports = models;
