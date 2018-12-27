const Controller = require('./Controller');
const { check } = require('express-validator/check');
const CreditCard = require('../models/CreditCard');

class CreditCardController extends Controller {
  constructor(req, res) {
    super(req, res, 'CreditCard', CreditCard.Model, [
      'name',
      'limit',
      'closingDay',
      'dueDate',
      'account',
    ]);
  }
}

module.exports = {
  validate: [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('limit')
      .not().isEmpty().withMessage('Limit is required')
      .isDecimal().withMessage('Limit must be a decimal'),
    check('closingDay')
      .not().isEmpty().withMessage('ClosingDay is required')
      .isInt({ min: 1, max: 31 }).withMessage('ClosingDay must be between 1 and 31'),
    check('dueDate')
      .not().isEmpty().withMessage('DueDate is required')
      .isInt({ min: 1, max: 31 }).withMessage('ClosingDay must be between 1 and 31'),
    check('account').not().isEmpty().withMessage('Account is required'),
  ],
  create (req, res)   { new CreditCardController(req, res).create() },
  read (req, res)     { new CreditCardController(req, res).read() },
  readById (req, res) { new CreditCardController(req, res).readById() },
  update (req, res)   { new CreditCardController(req, res).update() },
  delete (req, res)   { new CreditCardController(req, res).delete() },
}