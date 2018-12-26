const Transaction = require('./Transaction');

class ManualTransaction extends Transaction {
  balance;
}
module.exports = ManualTransaction;