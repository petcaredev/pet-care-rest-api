const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;

const init = async () => {
  User.create({
    id: 1,
    name: 'Pet Care User',
    email: 'petcareuser@mail.com',
    password: bcrypt.hashSync('petcareuser', 8),
    phone: '1234567890',
    address: 'Jl. Pengguna',
  }).then((user) => {
    user.setRoles([1]);
  });

  User.create({
    id: 2,
    name: 'Lilipoet Pet Clinic',
    email: 'lilipoetpet@mail.com',
    password: bcrypt.hashSync('lilipoetpet', 8),
    phone: '087839281900',
    address:
      'Jl. Bhayangkara No.30A, Ngupasan, Kec. Gondomanan, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 3,
    name: 'Sunshine Pet Vet',
    email: 'sunshinepetvet@mail.com',
    password: bcrypt.hashSync('sunshinepetvet', 8),
    phone: '0817269116',
    address:
      'Jl. Monjali No.25, Nandan, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 4,
    name: 'Bravo Vet & Groom',
    email: 'bravovetgroom@mail.com',
    password: bcrypt.hashSync('bravovetgroom', 8),
    phone: '08562811162',
    address:
      'Jl. Tasura No.68, Krodan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 5,
    name: 'Omah Vets & Petshop',
    email: 'omahvetspetshop@mail.com',
    password: bcrypt.hashSync('omahvetspetshop', 8),
    phone: '081999906419',
    address:
      'Jl. Bung Tarjo No.7, Baciro, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 6,
    name: "Dji'O Pet Care + Vet",
    email: 'djiopetcare@mail.com',
    password: bcrypt.hashSync('djiopetcare', 8),
    phone: '085640473600',
    address:
      'Gg. Menur No.15, Santren, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });
};

module.exports = init;
