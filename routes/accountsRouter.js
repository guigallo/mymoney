const ROTA = '/accounts';
const validateAccount = require('../middlewares/validateAccount');
const guard = require('express-jwt-permissions')();
const handlPermissionDenied = require('../middlewares/handlePermissionDenied');
const VerifyToken = require('../middlewares/VerifyToken');
const controller = require('../controllers/accountsController');

module.exports = (app) =>
  app
    .post( 
      ROTA,
      validateAccount,
      VerifyToken,
      guard.check(['account:create']),
      handlPermissionDenied,
      controller.create)

    .get(
      ROTA,
      validateAccount,
      VerifyToken,
      guard.check(['account:read']),
      handlPermissionDenied,
      controller.read)

    .get(
      `${ROTA}/:id`,
      validateAccount,
      VerifyToken,
      guard.check(['account:read']),
      handlPermissionDenied,
      controller.readById)

    .put(
      `${ROTA}/:id`,
      validateAccount,
      VerifyToken,
      guard.check(['account:update']),
      handlPermissionDenied,
      controller.update)

    .delete(
      `${ROTA}/:id`,
      validateAccount,
      VerifyToken,
      guard.check(['account:delete']),
      handlPermissionDenied,
      controller.delete);