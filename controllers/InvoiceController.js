const Controller = require('./Controller');
const { check } = require('express-validator/check');
const Invoice = require('../models/Invoice');

class InvoiceController extends Controller {
  constructor(req, res) {
    super(req, res, 'Invoice', Invoice.Model, [
      'account',
      'category',
      'description',
      'date',
      'value',
      'paid'
    ]);
  }
}

module.exports = {
  validate: [
    check('date').not().isEmpty().withMessage('Date is required'),
    check('account').not().isEmpty().withMessage('Account is required'),
    check('creditCard').not().isEmpty().withMessage('CreditCard is required'),
    check('total').not().isEmpty().withMessage('Value is required').isDecimal().withMessage('Value must be a decimal'),
    check('paid').isBoolean().withMessage('Value must be boolean')
  ],
  create (req, res)   { new InvoiceController(req, res).create() },
  read (req, res)     { new InvoiceController(req, res).read() },
  readById (req, res) { new InvoiceController(req, res).readById() },
  update (req, res)   { new InvoiceController(req, res).update() },
  delete (req, res)   { new InvoiceController(req, res).delete() },
}