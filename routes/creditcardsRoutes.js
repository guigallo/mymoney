const route = require('../services/RouteFactory');
const controller = require('../controllers/CreditCardController');

module.exports = app => 
  route(app, controller, {
    path: '/creditcards',
    name: 'creditcard'
  });