var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  owner: String
});

module.exports = mongoose.model("Contact", contactSchema);
