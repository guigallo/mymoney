const Transaction = require('./Transaction');

class Credit extends Transaction {
  paid;
}
module.exports = Credit;