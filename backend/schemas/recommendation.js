var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var recommendationSchema = mongoose.Schema({
  software_To_Use: {
    type: [String],
    required: true
  },
  database: {
    type: [String],
    required: true
  },
  skills_needed: {
    type: [String],
    required: true
  },
  Languages:{
    type: [String],
    required: true
  },
  hosting: {
    type: String,
    required: true
  },
  view: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
