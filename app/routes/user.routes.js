const router = require('express').Router();
const { authJwt } = require('../middleware');
const { userValidator } = require('../validators');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.get('/:id', [authJwt.verifyToken], controller.show);
  router.put(
    '/:id',
    [authJwt.verifyToken],
    userValidator.update,
    controller.update,
  );

  app.use('/api/users', router);
};
