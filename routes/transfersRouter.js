const route = require('../services/RouteFactory');
const controller = require('../controllers/TransferController');

module.exports = app => 
  route(app, controller, {
    path: '/transfers',
    name: 'transfer'
  });