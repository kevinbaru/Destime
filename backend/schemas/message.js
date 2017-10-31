var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var messageSchema = mongoose.Schema({
  created: Date,
  content: String,
  user: String,
  contact: String,
  channel: String,
  status: String,
  from: String
});

module.exports = mongoose.model("Message", messageSchema);
