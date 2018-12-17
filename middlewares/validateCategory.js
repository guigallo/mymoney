const { check } = require('express-validator/check');

module.exports = [
  check('x-access-token').not().isEmpty(),
  check('name').not().isEmpty().withMessage('Name is required')
];