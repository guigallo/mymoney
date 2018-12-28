const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const invoiceSchema = [
  { name: 'date',       required: true, type: Date},
  { name: 'account',    required: true, type: { type: ObjectId, ref: 'Account' }},
  { name: 'creditCard', required: true, type: { type: ObjectId, ref: 'CreditCard' }},
  { name: 'total',      required: true, type: Number},
  { name: 'paid',       required: true, type: Boolean}
];

class Invoice {
  constructor(date, account, creditCard, paid) {
    if(! account.hasOwnProperty('_id'))
      throw new Error('Use a saved account as transaction param');
      
    this.date = date;
    this.account = account;
    this.creditCard = creditCard;
    this.paid = paid;
  }

  static _getSchema() {
    let schema = {}
    invoiceSchema.forEach(value => schema[value.name] = value.type );
    return schema;
  }
}
module.exports = Invoice;

const model = mongoose.model('Invoice', Invoice._getSchema());
module.exports.Model = model;