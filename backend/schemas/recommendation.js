var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var recommendationSchema = mongoose.Schema({
  software_To_Use: [String],
  database: [String],
  skills_needed:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  Languages:[String],
  hosting: String,
  view: String
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
