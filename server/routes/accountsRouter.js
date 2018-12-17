const controller = require('../controllers/accountsController');

const ROTA = '/accounts';
module.exports = (app) => {
  app.post(ROTA, controller.createAccount);
}