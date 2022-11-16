const router = require('express').Router();
const { verifySignUp } = require('../middleware');
const { authValidator } = require('../validators');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  router.post(
    '/signup',
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    authValidator.signup,
    controller.signup,
  );
  router.post('/signin', authValidator.signin, controller.signin);

  app.use('/api/auth', router);
};
