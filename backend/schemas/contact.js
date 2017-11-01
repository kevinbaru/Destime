var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var connect = "mongodb://localhost:27017/Destime";
mongoose.connect(connect);

var contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Contact", contactSchema);
