const { check, body } = require('express-validator');
const validationResultUtils = require('../utils/validationResult.utils');

const store = [
  body('name')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong.')
    .isLength({ min: 3 })
    .withMessage('Nama minimal 3 karakter.'),
  body('address')
    .notEmpty()
    .withMessage('Alamat tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Alamat minimal 10 karakter.'),
  check('posterPath')
    .custom((value, { req }) => {
      if (!req.file) {
        return false;
      }
      return true;
    })
    .withMessage('Poster tidak boleh kosong.'),
  body('phone')
    .notEmpty()
    .withMessage('Nomor telepon tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Nomor telepon minimal 10 karakter.'),
  body('userId').notEmpty().withMessage('User ID tidak boleh kosong.'),
  validationResultUtils,
];

module.exports = {
  store,
};
