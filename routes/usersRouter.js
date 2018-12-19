const route = require('../services/RouteFactory');
const controller = require('../controllers/UserController');

module.exports = app => 
  route(app, controller, {
    path: '/users',
    name: 'user'
  });