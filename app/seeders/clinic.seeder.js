const db = require('../models');

const Clinic = db.clinic;

const init = async () => {
  Clinic.create({
    name: 'Lilipoet Pet Clinic',
    address:
      'Jl. Bhayangkara No.30A, Ngupasan, Kec. Gondomanan, Kota Yogyakarta, Daerah Istimewa Yogyakarta ',
    posterPath: 'zh6z257skvggkw7sp8v5zm.jpeg',
    phone: '087839281900',
  }).then((clinic) => {
    clinic.setUser([2]);
  });
};

module.exports = init;
