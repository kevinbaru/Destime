var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var favoriteSchema = mongoose.Schema({
  travel: String,
  film: [String],
  tv: [String],
  music: [String],
  theatre: [String],
  books: [String],
  mags: [String],
  brands: [String],
  celebs: [String],
  apps: [String]
});

var professionalsSchema = mongoose.Schema({
  companyWorked: [{
    companyName: String,
    title: String
  }],
  schooling: [{
    schoolName: String,
    major: String,
    degree: String
  }],
  influencers: [String],
  groups: [String],
  connections_amount: String
});

var useSurveySchema = mongoose.Schema({
  selflessness_rate: Number,
  personality_rate: Number,
  work_ethic_rate: Number,
  creativity_rate: Number,
  bravery_rate: Number,
  socially_rate: Number,
  hobbies_rate: Number,
  decision_rate: Number
});

var userSchema = mongoose.Schema({
  name: String,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  phone: String,
  facebookID: String,
  facebookToken: String,
  fbrefreshToken: String,
  pictureURL: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  twitterID: String,
  twitterToken: String,
  twitterTokenSecret: String,
  followers: Object,
  googleID: String,
  pictureURL: String,
  gGtoken: String,
  gGrefreshToken: String,
  linkedinID: String,
  lntoken: String,
  lnrefreshtoken: String,
  email: String,
  role: String,
  industry: String,
  location: String,
  universityOrCompany: Boolean,
  capital: String,
  website: String,
  blog: String,
  github: String,
  favorite: [favoriteSchema],
  professionals: [professionalsSchema],
  user_survey: [useSurveySchema],
  skill_set: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  product_team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  product_set: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  destime: [{
    destime_name: String,
    goals: String,
    sameIndustryOrNot: Boolean
  }],
  essence: [String],
  userReview: Number
});


userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
