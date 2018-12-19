const route = require('../services/RouteFactory');
const controller = require('../controllers/AccountsController');

module.exports = app => 
  route(app, controller, {
    path: '/accounts',
    name: 'account'
  });