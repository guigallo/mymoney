const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const expenseSchema = [
  { name: 'accountOut', required: true,  type: { type: ObjectId, ref: 'Account' }},
  { name: 'accountIn',  required: true,  type: { type: ObjectId, ref: 'Account' }},
  { name: 'date',       required: true,  type: Date},
  { name: 'value',      required: true,  type: Number},
]

class Transfer {
  constructor(accountOut, accountIn, date, value) {
    if(! account.hasOwnProperty('_id'))
      throw new Error('Use a saved account as transaction param');

    if(! category.hasOwnProperty('_id'))
      throw new Error('Use a saved category as transaction param');

    this.accountOut = accountOut;
    this.accountIn = accountIn;
    this.date = date;
    this.value = value;
  }

  static _getSchema() {
    let schema = {}
    expenseSchema.forEach(value => schema[value.name] = value.type );
    return schema;
  }
}
module.exports = Transfer;

const model = mongoose.model('Transfer', Transfer._getSchema());
module.exports.Model = model;