const role = require('./role.seeder');
const user = require('./user.seeder');

const init = () => {
  role();
  user();
};

module.exports = init;
