var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var messageSchema = mongoose.Schema({
  created: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
