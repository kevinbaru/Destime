var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var skillSchema = mongoose.Schema({
  skillName: {
    type: String,
    required: true
  },
  experienceTime: {
    type: String,
    required: true
  },
  degree: { // better use enum, come later
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Skill", skillSchema);
