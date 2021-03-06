const route = require('../services/RouteFactory');
const controller = require('../controllers/AccountController');

module.exports = app => 
  route(app, controller, {
    path: '/accounts',
    name: 'account'
  });