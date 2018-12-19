const route = require('../services/RouteFactory');
const controller = require('../controllers/CategoryController');

module.exports = app => 
  route(app, controller, {
    path: '/categories',
    name: 'category'
  });