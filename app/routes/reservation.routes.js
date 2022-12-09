const router = require('express').Router();
const { authJwt } = require('../middleware');
const { reservationValidator } = require('../validators');
const controller = require('../controllers/reservation.controller');

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
    [authJwt.verifyToken, authJwt.isClinic],
    controller.update,
  );

  router.get(
    '/user/:id',
    [authJwt.verifyToken, authJwt.isUser],
    controller.getAllReservationByUser,
  );
  router.get(
    '/clinic/:id',
    [authJwt.verifyToken, authJwt.isClinic],
    controller.getAllReservationByClinic,
  );

  app.use('/api/reservations', router);
};
