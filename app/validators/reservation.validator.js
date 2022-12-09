const { body } = require('express-validator');
const validationResultUtils = require('../utils/validationResult.utils');

const store = [
  body('userId').notEmpty().withMessage('ID pengguna tidak boleh kosong.'),
  body('clinicId').notEmpty().withMessage('ID klinik tidak boleh kosong.'),
  body('date').notEmpty().withMessage('Tanggal tidak boleh kosong.'),
  body('petName').notEmpty().withMessage('Nama hewan tidak boleh kosong.'),
  body('petType').notEmpty().withMessage('Jenis hewan tidak boleh kosong.'),
  body('services').notEmpty().withMessage('Layanan tidak boleh kosong.'),
  validationResultUtils,
];

const reservationValidator = {
  store,
};

module.exports = reservationValidator;
