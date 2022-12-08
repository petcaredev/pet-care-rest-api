const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;

const init = async () => {
  User.create({
    id: 1,
    name: 'Faza Iman Imron',
    email: 'fazaimanimron@gmail.com',
    password: bcrypt.hashSync('fazaimanimron', 8),
    phone: '081234973494',
    address:
      'Gg. Sadewo No.39b, Dero, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
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

  User.create({
    id: 7,
    name: "Ma'mur Zaky Nurrokhman",
    email: 'mamurzakynurrokhman@gmail.com',
    password: bcrypt.hashSync('mamurzakynurrokhman', 8),
    phone: '089630460450',
    address:
      'Jl. Gorongan 6 30, Ngropoh, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([1]);
  });

  User.create({
    id: 8,
    name: 'Pet Shop & Clinic Ultima',
    email: 'petshopclinicultima@mail.com',
    password: bcrypt.hashSync('petshopclinicultima', 8),
    phone: '08562895949',
    address:
      'Jl. Wonosari KM.8, Potorono, Banguntapan, Bantul, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 9,
    name: 'Klinik Hewan Bantul Pet Area',
    email: 'klinikhewanbantulpetarea@mail.com',
    password: bcrypt.hashSync('klinikhewanbantulpetarea', 8),
    phone: '085743041957',
    address:
      'Jl. Kh. Wahid Hasyim No. 107 A, Palbapang, Kec. Bantul, Bantul, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 10,
    name: 'Ocan Pet Shop',
    email: 'ocanpetshop@mail.com',
    password: bcrypt.hashSync('ocanpetshop', 8),
    phone: '08112645845',
    address:
      'Jl. Sonosewu Baru No.459, Ngestiharjo, Kasihan, Bantul, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 11,
    name: 'Barokah Vet Service & Petshop',
    email: 'barokahvetservicepetshop@mail.com',
    password: bcrypt.hashSync('barokahvetservicepetshop', 8),
    phone: '089618629151',
    address:
      'Jl.Nusa Indah No 98B,Ngringin RT 04, RW.19, Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });

  User.create({
    id: 12,
    name: 'Animal Clinic Cinnnamon',
    email: 'animalcliniccinnnamon@mail.com',
    password: bcrypt.hashSync('animalcliniccinnnamon', 8),
    phone: '0274414800',
    address:
      'Jl. Gambiran No.52, Pandeyan, Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
  }).then((user) => {
    user.setRoles([2]);
  });
};

module.exports = init;
