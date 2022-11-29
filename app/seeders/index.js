const role = require('./role.seeder');
const user = require('./user.seeder');
const clinic = require('./clinic.seeder');
const service = require('./service.seeder');

const init = () => {
  role();
  user();
  clinic();
  service();
};

module.exports = init;
