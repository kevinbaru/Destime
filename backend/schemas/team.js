var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var teamSchema = mongoose.Schema({
  productProject: String,
  user_set:[{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: String,
    Owns: String,
    isMasterOrNot: Boolean
  }],
  Description:[String],
  Team_review: Number
});

module.exports = mongoose.model("Team", teamSchema);
