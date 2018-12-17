const Account = require('../models/Account');
const { validationResult } = require('express-validator/check');
const logger = require('../services/logger');

function validateResult(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }
  return true;
}

module.exports = {
  create(req, res) {
    if(! validateResult(req, res)) return;

    Account.create({
      name: req.body.name,
      value: req.body.value
    }, (errors, account) => {
      if(errors) return res.status(500).json({ errors });

      logger.info(`Account created by ${req.user.id}`);
      res.status(201).json({ account });
    });
  },

  read(req, res) {
    Account.find({}, (err, accounts) => {
      if(err) return res.status(500).json({ errors: 'Error to get accounts' });
      if(! accounts) return res.status(404).json({ errors: 'Accounts not found'});

      logger.info(`Accounts read by ${req.user.id}`);
      res.status(200).json({ accounts });
    });
  },

  readById(req, res) {
    Account.findById(req.params.id, (err, account) => {
      if(err) return res.status(500).json({ errors: 'Error to get account' });
      if(! account) return res.status(404).json({ errors: 'Account not found' });

      logger.info(`Account ${req.param.id} read by ${req.user.id}`);
      res.status(200).json({ account });
    })
  },

  update(req, res) {
    if(req.body.value)
      return res.status(400).json({ errors: 'Not implemented to change value' });  //TODO

    Account.findByIdAndUpdate(req.params.id, req.body, err => {
      if (err) return res.status(500).json({ errors: 'Error to update account' });

      logger.info(`Account ${req.param.id} updated by ${req.user.id}`);
      res.status(201).json({ message: 'Account update successfully' });
    });
  },

  delete(req, res) {
    Account.findByIdAndDelete(req.params.id, err => {
      if(err) return res.status(500).json({ errors: 'Error to delete account' });

      logger.info(`Account ${req.param.id} deleted by ${req.user.id}`);
      res.status(201).json({ message: 'Account deleted successfully' });
    })
  }
}