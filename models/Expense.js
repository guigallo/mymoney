const Transaction = require('../classes/Transaction');
const mongoose = require('mongoose');

const expenseSchema = [
  { name: 'paid', type: Boolean }
]

class Expense extends Transaction {
  constructor(account, category, description, date, value, paid = false) {
    super('out', account, category, description, date, value);

    this.paid = paid;
  }

  static _getSchema() {
    return super._getSchema(expenseSchema);
  }

  create() {
    return new Promise((resolve, reject) => model
      .create({
        account: this.account,
        category: this.category,
        description: this.description,
        date: this.date,
        value: this.value,
        paid: this.paid,
        type: this.type
      }, (err, saved) => {
        if(err) reject('Error to create expense');
        this.id = saved._id;
        resolve(saved);
      })
    );
  }

  /*
  update() {
    return new Promise((resolve, reject) => model
      .findByIdAndUpdate
    );
  }
  */
}
module.exports = Expense;

const model = mongoose.model('Expense', Expense._getSchema())
module.exports.Model = model