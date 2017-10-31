var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var skillSchema = mongoose.Schema({
  skillId: Number,
  skillName: String,
  experienceTime: String,
  degree: String
});

module.exports = mongoose.model("Skill", skillSchema);
