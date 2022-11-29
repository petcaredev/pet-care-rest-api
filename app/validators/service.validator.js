const { body } = require('express-validator');
const validationResultUtils = require('../utils/validationResult.utils');

const store = [
  body('name')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong.')
    .isLength({ min: 3 })
    .withMessage('Nama minimal 3 karakter.'),
  body('description')
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Deskripsi minimal 10 karakter.'),
  body('price').notEmpty().withMessage('Harga tidak boleh kosong.'),
  validationResultUtils,
];

const update = [
  body('name')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong.')
    .isLength({ min: 3 })
    .withMessage('Nama minimal 3 karakter.'),
  body('description')
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Deskripsi minimal 10 karakter.'),
  body('price').notEmpty().withMessage('Harga tidak boleh kosong.'),
  validationResultUtils,
];

const serviceValidator = {
  store,
  update,
};

module.exports = serviceValidator;
