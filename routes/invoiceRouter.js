const route = require('../services/RouteFactory');
const controller = require('../controllers/InvoiceController');

module.exports = app => 
  route(app, controller, {
    path: '/invoices',
    name: 'invoice'
  });