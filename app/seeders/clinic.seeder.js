const fs = require('fs');
const path = require('path').resolve('./');
const db = require('../models');
const generateImage = require('../utils/generateImage.utils');

const imageOne = fs.readFileSync(`${path}/public/assets/images/pet-1.jpeg`);

const imageTwo = fs.readFileSync(`${path}/public/assets/images/pet-2.jpeg`);

if (!fs.existsSync(`${path}/storage/uploads/static/`)) {
  fs.mkdirSync(`${path}/storage/uploads/static/`, { recursive: true });
}

fs.readdirSync(`${path}/storage/uploads/static/`).forEach((file) => {
  fs.unlinkSync(`${path}/storage/uploads/static/${file}`);
});

const Clinic = db.clinic;

const init = async () => {
  Clinic.create({
    id: 1,
    name: 'Lilipoet Pet Clinic',
    address:
      'Jl. Bhayangkara No.30A, Ngupasan, Kec. Gondomanan, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageOne),
    phone: '087839281900',
  }).then((clinic) => {
    clinic.setUser([2]);
  });

  Clinic.create({
    id: 2,
    name: 'Sunshine Pet Vet',
    address:
      'Jl. Monjali No.25, Nandan, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageTwo),
    phone: '0817269116',
  }).then((clinic) => {
    clinic.setUser([3]);
  });

  Clinic.create({
    id: 3,
    name: 'Bravo Vet & Groom',
    address:
      'Jl. Tasura No.68, Krodan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageOne),
    phone: '08562811162',
  }).then((clinic) => {
    clinic.setUser([4]);
  });

  Clinic.create({
    id: 4,
    name: 'Omah Vets & Petshop',
    address:
      'Jl. Bung Tarjo No.7, Baciro, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageTwo),
    phone: '081999906419',
  }).then((clinic) => {
    clinic.setUser([5]);
  });

  Clinic.create({
    id: 5,
    name: "Dji'O Pet Care + Vet",
    address:
      'Gg. Menur No.15, Santren, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageOne),
    phone: '085640473600',
  }).then((clinic) => {
    clinic.setUser([6]);
  });

  Clinic.create({
    id: 6,
    name: 'Pet Shop & Clinic Ultima',
    address:
      'Jl. Wonosari KM.8, Potorono, Banguntapan, Bantul, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageTwo),
    phone: '08562895949',
  }).then((clinic) => {
    clinic.setUser([8]);
  });

  Clinic.create({
    id: 7,
    name: 'Klinik Hewan Bantul Pet Area',
    address:
      'Jl. Kh. Wahid Hasyim No. 107 A, Palbapang, Kec. Bantul, Bantul, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageOne),
    phone: '085743041957',
  }).then((clinic) => {
    clinic.setUser([9]);
  });

  Clinic.create({
    id: 8,
    name: 'Ocan Pet Shop',
    address:
      'Jl. Sonosewu Baru No.459, Ngestiharjo, Kasihan, Bantul, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageTwo),
    phone: '08112645845',
  }).then((clinic) => {
    clinic.setUser([10]);
  });

  Clinic.create({
    id: 9,
    name: 'Barokah Vet Service & Petshop',
    address:
      'Jl.Nusa Indah No 98B,Ngringin RT 04, RW.19, Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageOne),
    phone: '089618629151',
  }).then((clinic) => {
    clinic.setUser([11]);
  });

  Clinic.create({
    id: 10,
    name: 'Animal Clinic Cinnnamon',
    address:
      'Jl. Gambiran No.52, Pandeyan, Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
    posterPath: generateImage(imageTwo),
    phone: '0274414800',
  }).then((clinic) => {
    clinic.setUser([12]);
  });
};

module.exports = init;
