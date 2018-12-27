const Trasaction = require('../classes/Transaction');
const mongoose = require('mongoose');

const expenseSchema = [
  { name: 'paid', type: Boolean }
]

class Income extends Trasaction {
  constructor(account, category, description, date, value, paid = false) {
    super('out', account, category, description, date, value);
    
    this.paid = paid;
  }

  static _getSchema() {
    return super._getSchema(expenseSchema);
  }
}
module.exports = Income;

const model = mongoose.model('Income', Income._getSchema());
module.exports.Model = model;