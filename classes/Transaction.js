const ObjectId = require('mongoose').Schema.Types.ObjectId;

const transactionSchema = [
  { name: 'date',        required: true,  type: Date},
  { name: 'value',       required: true,  type: Number},
  { name: 'type',        required: true,  type: { type: String, default: this.type }},
  { name: 'description', required: true,  type: String},
  { name: 'account',     required: true,  type: { type: ObjectId, ref: 'Account' }},
  { name: 'category',    required: true,  type: { type: ObjectId, ref: 'Category' }},
  { name: 'updated',     required: true,  type: { type: Date, default: Date.now } },
];

class Transaction {
  constructor(type, account, category, description, date, value) {
    if(! account.hasOwnProperty('_id'))
      throw new Error('Use a saved account as transaction param');

    if(! category.hasOwnProperty('_id'))
      throw new Error('Use a saved category as transaction param');
      
    this.account = account;
    this.category = category;

    this.type = type;
  
    this.description = description;
    this.date = date;
    this.value = value;
  }

  static _getSchema(values = []) {
    let schema = {}
    transactionSchema.forEach(value => schema[value.name] = value.type );
    values.forEach(value => schema[value.name] = value.type );
    return schema;
  }

  save() {
    throw new Error('Funcion not implemented in children class');
  }
}
module.exports = Transaction;