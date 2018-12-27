const Controller = require('./Controller');
const { check } = require('express-validator/check');
const Income = require('../models/Income');

class IncomeController extends Controller {
  constructor(req, res) {
    super(req, res, 'Income', Income.Model, [
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
    check('account').not().isEmpty().withMessage('Account is required'),
    check('category').not().isEmpty().withMessage('Category is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('date').not().isEmpty().withMessage('Date is required'),
    check('value').not().isEmpty().withMessage('Value is required').isDecimal().withMessage('Value must be a decimal'),
    check('paid').isBoolean().withMessage('Value must be boolean'),
  ],
  create (req, res)   { new IncomeController(req, res).create() },
  read (req, res)     { new IncomeController(req, res).read() },
  readById (req, res) { new IncomeController(req, res).readById() },
  update (req, res)   { new IncomeController(req, res).update() },
  delete (req, res)   { new IncomeController(req, res).delete() },
}