/**
 * types:
 * income
 * expense
 * transfer
 */

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  //type
  //value
  //date
  //paid
  //description
  //category
  //account
});
mongoose.model('Trasaction', UserSchema);

module.exports = mongoose.model('User');