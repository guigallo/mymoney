const { check } = require('express-validator/check');

module.exports = [
  check('x-access-token').not().isEmpty(),
  check('name').not().isEmpty().withMessage('Name is required'),
  check('value')
    .not().isEmpty().withMessage('Value is required')
    .isNumeric(true).withMessage('Value must be numeric')
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/).withMessage('Value must be positive')
];