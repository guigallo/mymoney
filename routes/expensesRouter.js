const route = require('../services/RouteFactory');
const controller = require('../controllers/ExpenseController');

module.exports = app => 
  route(app, controller, {
    path: '/expenses',
    name: 'expense'
  });