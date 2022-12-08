const router = require('express').Router();
const { authJwt } = require('../middleware');
const { reservationValidator } = require('../validators');
const controller = require('../controllers/reservation.controller');
const { isClinic } = require('../middleware/authJwt');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.post(
    '/',
    [authJwt.verifyToken, authJwt.isUser],
    reservationValidator.store,
    controller.store,
  );

  router.get('/:id', [authJwt.verifyToken], controller.show);

  router.put(
    '/update_status/:id',
    [authJwt.verifyToken, isClinic],
    controller.update,
  );

  app.use('/api/reservations', router);
};
