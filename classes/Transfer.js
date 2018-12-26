const Transaction = require('./Transaction');

class Transfer extends Transaction {
  balance;
}
module.exports = Transfer;