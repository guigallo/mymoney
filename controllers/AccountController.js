const Controller = require('./Controller');
const { check } = require('express-validator/check');
const Model = require('../models/Account');

class AccountController extends Controller {
  constructor(req, res) {
    super(req, res, 'Account', Model, ['name', 'value']);
  }

  update() {
    if(this.request.body.value)
      return this.response.status(400).json({ errors: 'Not implemented to change value' });  //TODO

    super.update();
  }
}

module.exports = {
  validate: [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('value')
      .not().isEmpty().withMessage('Value is required')
      .isNumeric(true).withMessage('Value must be numeric')
      .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/).withMessage('Value must be positive')
  ],
  create (req, res)   { new AccountController(req, res).create() },
  read (req, res)     { new AccountController(req, res).read() },
  readById (req, res) { new AccountController(req, res).readById() },
  update (req, res)   { new AccountController(req, res).update() },
  delete (req, res)   { new AccountController(req, res).delete() },
}