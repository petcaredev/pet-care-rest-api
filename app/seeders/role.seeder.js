const db = require('../models');

const Role = db.role;

const init = () => {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'clinic',
  });
};

module.exports = init;
