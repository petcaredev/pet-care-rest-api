const { body, validationResult } = require('express-validator');

module.exports = {
  store: [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .isLength({ min: 5 })
      .withMessage('Title must be at least 5 characters long.'),
    body('description')
      .notEmpty()
      .withMessage('Description is required.')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: true,
          errors: errors.array(),
        });
      }
      next();
    },
  ],
};
