const ROTA = '/users';
const controller = require('../controllers/userController');
const VerifyToken = require('../middlewares/VerifyToken');
const guard = require('express-jwt-permissions')();

module.exports = function(app) {
  app.get(ROTA, VerifyToken, guard.check('user:read'), controller.getAllUsers);
  app.get(ROTA + '/:id', VerifyToken, guard.check('user:read'), controller.getUserById);
  app.post(ROTA, controller.createUser);
  app.put(ROTA + '/:id', VerifyToken, guard.check('user:write'), controller.updateUser);
  app.delete(ROTA + '/:id', VerifyToken, guard.check('user:write'), controller.deleteUser);
}