const Controller = require('./Controller');
const { check } = require('express-validator/check');
const Model = require('../models/Expense');

class ExpenseController extends Controller {
  constructor(req, res) {
    super(req, res, 'Category', Model, ['name']);
  }
}

module.exports = {
  validate: [
    check('name').not().isEmpty().withMessage('Name is required')
  ],
  create (req, res)   { new ExpenseController(req, res).create() },
  read (req, res)     { new ExpenseController(req, res).read() },
  readById (req, res) { new ExpenseController(req, res).readById() },
  update (req, res)   { new ExpenseController(req, res).update() },
  delete (req, res)   { new ExpenseController(req, res).delete() },
}