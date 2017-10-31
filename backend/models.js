var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var contactSchema = require('./schemas/contact.js');
require('./schemas/user.js');
require('./schemas/message.js');
require('./schemas/product.js');
require('./schemas/team.js');
require('./schemas/skill.js');
require('./schemas/recommendation.js');

var contact = require('mongoose').model('Contact');
var user = require('mongoose').model('User');
var message = require('mongoose').model('Message');
var product = require('mongoose').model('Product');
var team = require('mongoose').model('Team');
var skill = require('mongoose').model('Skill');
var recommendation = require('mongoose').model('Recommendation');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
//var connect = process.env.MONGODB_URI || require('./connect');
var connect = "mongodb://localhost:27017/Destime"

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);


var models = {
  Contact: contact,
  User: user,
  Message: message,
  Product: product,
  Team: team,
  Skill: skill,
  Recommendation: recommendation
};

// Step 3: Export your models object
module.exports = models;
