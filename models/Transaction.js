const typeFactory = require('../utils/typesFactory');

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  description: String,
  date: Date,
  updated: { type: Date, default: Date.now },
  value: Number,
  paid: Boolean,
  type: typeFactory.schemaTrasactionType(),
  //category  ***
  //account
});
module.exports = mongoose.model('Trasaction', UserSchema);