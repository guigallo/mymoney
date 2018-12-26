const Transaction = require('./Transaction');

class Expense extends Transaction {
  paid;
}
module.exports = Expense;