const db = require('../models');

const Service = db.service;

const init = () => {
  const data = [
    {
      name: 'Grooming Sehat',
      description:
        'Grooming ini khusus untuk hewan yang sehat. Syarat bisa digrooming adalah tidak hamil, tidak demam, dan berumur diatas 2 bulan.',
      price: 35000,
    },
    {
      name: 'Grooming Kering',
      description:
        'Grooming ini grooming yang tidak menggunakan air. Grooming kering menggunakan bedak khusus untuk mengatasi kutuan atau jamuran.',
      price: 25000,
    },
    {
      name: 'Trimming',
      description:
        'Trimming adalah potong kuku. Kuku hewan harus rutin dipotong untuk mencegah cakar melukai hewan lainya atau kita sendiri.',
      price: 15000,
    },
  ];

  const clinicId = [1, 2, 3, 4, 5];

  for (let j = 0; j < clinicId.length; j += 1) {
    for (let k = 0; k < 3; k += 1) {
      Service.create({
        name: data[k].name,
        description: data[k].description,
        price: data[k].price,
      }).then((service) => {
        service.setClinic(clinicId[j]);
      });
    }
  }
};

module.exports = init;
