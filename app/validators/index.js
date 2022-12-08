const authValidator = require('./auth.validator');
const userValidator = require('./user.validator');
const clinicValidator = require('./clinic.validator');
const serviceValidator = require('./service.validator');
const reservationValidator = require('./reservation.validator');

module.exports = {
  authValidator,
  userValidator,
  clinicValidator,
  serviceValidator,
  reservationValidator,
};
