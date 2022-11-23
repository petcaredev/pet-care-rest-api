const fs = require('fs');
const path = require('path').resolve('./');
const db = require('../models');
const generateImage = require('../utils/generateImage.utils');

if (!fs.existsSync(`${path}/storage/uploads/static/`)) {
  fs.mkdirSync(`${path}/storage/uploads/static/`, { recursive: true });
  fs.readdirSync(`${path}/storage/uploads/static/`).forEach((file) => {
    fs.unlinkSync(`${path}/storage/uploads/static/${file}`);
  });
}

const Clinic = db.clinic;

const init = async () => {
  Clinic.create({
    id: 1,
    name: 'Lilipoet Pet Clinic',
    address:
      'Jl. Bhayangkara No.30A, Ngupasan, Kec. Gondomanan, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(),
    phone: '087839281900',
  }).then((clinic) => {
    clinic.setUser([2]);
  });

  Clinic.create({
    id: 2,
    name: 'Sunshine Pet Vet',
    address:
      'Jl. Monjali No.25, Nandan, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(),
    phone: '0817269116',
  }).then((clinic) => {
    clinic.setUser([3]);
  });

  Clinic.create({
    id: 3,
    name: 'Bravo Vet & Groom',
    address:
      'Jl. Tasura No.68, Krodan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(),
    phone: '08562811162',
  }).then((clinic) => {
    clinic.setUser([4]);
  });

  Clinic.create({
    id: 4,
    name: 'Omah Vets & Petshop',
    address:
      'Jl. Bung Tarjo No.7, Baciro, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(),
    phone: '081999906419',
  }).then((clinic) => {
    clinic.setUser([5]);
  });

  Clinic.create({
    id: 5,
    name: "Dji'O Pet Care + Vet",
    address:
      'Gg. Menur No.15, Santren, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(),
    phone: '085640473600',
  }).then((clinic) => {
    clinic.setUser([6]);
  });
};

module.exports = init;
