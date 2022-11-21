const role = require('./role.seeder');
const user = require('./user.seeder');
const clinic = require('./clinic.seeder');

const init = () => {
  role();
  user();
  clinic();
};

module.exports = init;
