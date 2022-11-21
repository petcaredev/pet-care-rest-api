const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const checkUserHasClinic = require('./userHasClinic');
const uploadFile = require('./uploadFile');

module.exports = {
  authJwt,
  verifySignUp,
  checkUserHasClinic,
  uploadFile,
};
