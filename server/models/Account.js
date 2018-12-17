var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  value: { type: Number, min: 0},
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Account', UserSchema);