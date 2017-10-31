var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var productSchema = mongoose.Schema({
  projectID: Number,
  industry: String,
  description: String,
  Product_Phase: Number,
  LevelDifficulty: String,
  estimated_duration: String,
  actual_duration: String,
  estimated_cost: String,
  actual_cost: String,
  investor:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  skills_set:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  Technical_Recommendation:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recommendation'
  }],
  product_Team:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  Description: [String],
  Product_review: Number
});

module.exports = mongoose.model("Product", productSchema);
