const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;

const init = async () => {
  User.create({
    id: 1,
    name: 'Pengguna',
    email: 'pengguna@mail.com',
    password: bcrypt.hashSync('pengguna', 8),
    phone: '1234567890',
    address: 'Jl. Pengguna',
  }).then((user) => {
    user.setRoles([1]);
  });

  User.create({
    id: 2,
    name: 'Klinik',
    email: 'klinik@mail.com',
    password: bcrypt.hashSync('klinik', 8),
    phone: '1234567890',
    address: 'Jl. Klinik',
  }).then((user) => {
    user.setRoles([2]);
  });
};

module.exports = init;
