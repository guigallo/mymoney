const logger = require('../services/logger');

const { check, validationResult } = require('express-validator/check');

function wrongRequest(req) {
  console.log(req.body);
  //req.assert('name', 'Name is required.').notEmpty();
  check(req.body.name).not().isEmpty();
  console.log(1111);
  //req.assert('value', 'Value is required.').notEmpty();
  check(req.body.value).not().isEmpty();
  console.log(2222);
  //req.assert('value', 'Value has to be at leat 0.01.').isAtLeast(0, '');
  console.log(3333);
  
  const errors = req.validationErrors();
  console.log(errors);
  if(errors) {
    //logger.info('Erro de validação: ' + errors);
    //res.status(400).send(errors);
    return errors;
  }

  return undefined;
}

module.exports = wrongRequest;