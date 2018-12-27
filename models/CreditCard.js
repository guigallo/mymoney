const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const creditCardSchema = [
  { name: 'name',       required: true,  type: String},
  { name: 'limit',      required: true,  type: Number},
  { name: 'closingDay', required: true,  type: { type: Number, min: 1, max: 31 }},
  { name: 'dueDate',    required: true,  type: { type: Number, min: 1, max: 31 }},
  { name: 'account',    required: true,  type: { type: ObjectId, ref: 'Account' }},
];

class CreditCard {
  constructor(name, limit, closingDay, dueDate, account) {
    if(! account.hasOwnProperty('_id'))
      throw new Error('Use a saved account as transaction param');
      
    this.name = name;
    this.limit = limit;
    this.closingDay = closingDay;
    this.dueDate = dueDate;
    this.account = account;
  }

  static _getSchema() {
    let schema = {}
    creditCardSchema.forEach(value => schema[value.name] = value.type );
    return schema;
  }
}
module.exports = CreditCard;

const model = mongoose.model('CreditCard', CreditCard._getSchema());
module.exports.Model = model;