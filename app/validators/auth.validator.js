const { body } = require('express-validator');
const validationResultUtils = require('../utils/validationResult.utils');

const signup = [
  body('name')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong.')
    .isLength({ min: 3 })
    .withMessage('Nama minimal 3 karakter.'),
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong.')
    .isEmail()
    .withMessage('Email tidak valid.'),
  body('password')
    .notEmpty()
    .withMessage('Password tidak boleh kosong.')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter.'),
  body('phone')
    .notEmpty()
    .withMessage('Nomor telepon tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Nomor telepon minimal 10 karakter.'),
  body('address')
    .notEmpty()
    .withMessage('Alamat tidak boleh kosong.')
    .isLength({ min: 10 })
    .withMessage('Alamat minimal 10 karakter.'),
  body('roles').notEmpty().withMessage('Role tidak boleh kosong.'),
  validationResultUtils,
];

const signin = [
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong.')
    .isEmail()
    .withMessage('Email tidak valid.'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong.'),
  validationResultUtils,
];

const authValidator = {
  signup,
  signin,
};

module.exports = authValidator;
