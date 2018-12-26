const Transaction = require('../classes/Transaction');
const mongoose = require('mongoose');

class Expense extends Transaction {
  constructor(account, category, description, date, value, paid) {
    super('out', account, category, description, date, value);
    this.paid = paid;
  }

  _getSchema() {
    return super._getSchema([
      { name: 'paid', type: Boolean }
    ]);
  }

  save() {
    //let Model = 
    return new Promise(resolve => {
      mongoose.model('Expense', this._getSchema())
        .create({
          account: this.account,
          category: this.category,
          description: this.description,
          date: this.date,
          value: this.value,
          paid: this.paid,
          type: this.type
        }, (err, saved) => {
          if(err) throw new Error('Error to create expense');
  
          resolve(saved);
        });
    });
  }
}

module.exports = Expense;
//module.exports.Model = mongoose.model('Expense', new Expense()._getSchema());