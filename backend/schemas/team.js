var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var teamSchema = mongoose.Schema({
  productProject: {
    type: String,
    required: true
  },
  user_set:[{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      required: true
    },
    Owns: {
      type: String,
      required: true
    },
    isMasterOrNot: {
      type: Boolean,
      required: true
    }
  }],
  Description:{
    type: String,
    required: true
  },
  Team_review: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

module.exports = mongoose.model("Team", teamSchema);
