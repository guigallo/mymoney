const ROTA = '/categories';
const validateCategory = require('../middlewares/validateCategory');
const guard = require('express-jwt-permissions')();
const handlPermissionDenied = require('../middlewares/handlePermissionDenied');
const VerifyToken = require('../middlewares/VerifyToken');
const controller = require('../controllers/categoryController');

module.exports = (app) =>
  app
    .post( 
      ROTA,
      validateCategory,
      VerifyToken,
      guard.check(['category:create']),
      handlPermissionDenied,
      controller.create)

    .get(
      ROTA,
      validateCategory,
      VerifyToken,
      guard.check(['category:read']),
      handlPermissionDenied,
      controller.read)

    .get(
      `${ROTA}/:id`,
      validateCategory,
      VerifyToken,
      guard.check(['category:read']),
      handlPermissionDenied,
      controller.readById)

    .put(
      `${ROTA}/:id`,
      validateCategory,
      VerifyToken,
      guard.check(['category:update']),
      handlPermissionDenied,
      controller.update)

    .delete(
      `${ROTA}/:id`,
      validateCategory,
      VerifyToken,
      guard.check(['category:delete']),
      handlPermissionDenied,
      controller.delete);