var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";

mongoose.connect(connect);

var productSchema = mongoose.Schema({
  industry: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Product_Phase: {  // there should be enum, come later
    type: Number,
    required: true
  },
  LevelDifficulty: {
    type: String,
    required: true
  },
  estimated_duration: {
    type: String,
    required: true
  },
  actual_duration: {
    type: String,
    required: true
  },
  estimated_cost: {
    type: String,
    required: true
  },
  actual_cost: {
    type: String,
    required: true
  },
  investor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  skills_set: {
    type: [String],
    reuired: true
  },
  Technical_Recommendation: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recommendation'
    }],
    reuired: true
  },
  product_Team: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }],
    required: true
  },
  Product_review: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);
