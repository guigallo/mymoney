var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Category', UserSchema);

//module.exports = mongoose.model('Category');