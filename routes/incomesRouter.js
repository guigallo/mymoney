const route = require('../services/RouteFactory');
const controller = require('../controllers/IncomeController');

module.exports = app => 
  route(app, controller, {
    path: '/incomes',
    name: 'income'
  });