const router = require('express').Router();
const { authJwt } = require('../middleware');
const { serviceValidator } = require('../validators');
const controller = require('../controllers/service.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get(
    '/clinic/:clinicId',
    [authJwt.verifyToken, authJwt.isClinic],
    controller.index,
  );
  router.post(
    '/',
    [authJwt.verifyToken, authJwt.isClinic],
    serviceValidator.store,
    controller.store,
  );
  router.get('/:id', [authJwt.verifyToken], controller.show);
  router.put(
    '/:id',
    [authJwt.verifyToken, authJwt.isClinic],
    serviceValidator.update,
    controller.update,
  );
  router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isClinic],
    controller.destroy,
  );

  app.use('/api/services', router);
};
