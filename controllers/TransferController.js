const Controller = require('./Controller');
const { check } = require('express-validator/check');
const Transfer = require('../models/Transfer');

class TransferController extends Controller {
  constructor(req, res) {
    super(req, res, 'Transfer', Transfer.Model, [
      'accountOut',
      'accountIn',
      'date',
      'value',
    ]);
  }
}

module.exports = {
  validate: [
    check('accountOut').not().isEmpty().withMessage('AccountOut is required'),
    check('accountIn').not().isEmpty().withMessage('AccountIn is required'),
    check('date').not().isEmpty().withMessage('Date is required'),
    check('value').not().isEmpty().withMessage('Value is required').isDecimal().withMessage('Value must be a decimal'),
  ],
  create (req, res)   { new TransferController(req, res).create() },
  read (req, res)     { new TransferController(req, res).read() },
  readById (req, res) { new TransferController(req, res).readById() },
  update (req, res)   { new TransferController(req, res).update() },
  delete (req, res)   { new TransferController(req, res).delete() },
}