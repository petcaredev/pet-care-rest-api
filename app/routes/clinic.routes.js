const router = require('express').Router();
const { authJwt, checkUserHasClinic, uploadFile } = require('../middleware');
const controller = require('../controllers/clinic.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/', [authJwt.verifyToken, authJwt.isUser], controller.index);
  router.post(
    '/',
    [authJwt.verifyToken, authJwt.isClinic, checkUserHasClinic],
    uploadFile.single('posterPath'),
    controller.store,
  );
  router.get('/:id', [authJwt.verifyToken], controller.show);
  // router.put(
  //   '/:id',
  //   [authJwt.verifyToken, authJwt.isClinic],
  //   controller.update,
  // );
  router.get(
    '/search/:q',
    [authJwt.verifyToken, authJwt.isUser],
    controller.search,
  );

  app.use('/api/clinics', router);
};
