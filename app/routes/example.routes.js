const router = require('express').Router();
const examples = require('../controllers/example.controller');
const { store } = require('../validators/example.validator');

module.exports = (app) => {
  router.get('/', examples.index);
  router.post('/', store, examples.store);
  router.get('/:id', examples.show);
  router.put('/:id', examples.update);
  router.delete('/:id', examples.destroy);

  app.use('/api/examples', router);
};
