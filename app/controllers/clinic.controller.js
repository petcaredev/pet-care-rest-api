const fs = require('fs');
const path = require('path').resolve('./');
const db = require('../models');
const {
  getDistance,
  convertToKilometers,
} = require('../utils/getDistance.utils');

const Clinic = db.clinic;
const { Op } = db.Sequelize;

exports.index = async (req, res) => {
  const { origin } = req.query;

  const clinics = await Clinic.findAll();

  const result = clinics.map(async (clinic) => ({
    id: clinic.id,
    name: clinic.name,
    address: clinic.address,
    posterPath: `${req.protocol}://${req.get('host')}/storage/uploads/static/${
      clinic.posterPath
    }`,
    phone: clinic.phone,
    distance: await getDistance(origin, clinic.address),
    createdAt: clinic.createdAt,
    updatedAt: clinic.updatedAt,
  }));

  const sorted = await Promise.all(result).then((data) =>
    data.sort((a, b) => a.distance - b.distance),
  );

  const converted = sorted.map((clinic) => ({
    ...clinic,
    distance: convertToKilometers(clinic.distance) ?? NaN,
  }));

  res.status(200).send({
    error: false,
    message: 'Data klinik.',
    count: converted.length,
    data: converted,
  });
};

exports.store = (req, res) => {
  const { name, address, phone, userId } = req.body;
  const { filename: posterPath } = req.file;

  const clinic = {
    name,
    address,
    posterPath,
    phone,
  };

  Clinic.create(clinic)
    .then((data) => {
      data.setUser([userId]);
      res.status(201).send({
        error: false,
        message: 'Klinik berhasil dibuat.',
        data: {
          id: data.id,
          name: data.name,
          address: data.address,
          posterPath: `${req.protocol}://${req.get(
            'host',
          )}/storage/uploads/static/${data.posterPath}`,
          phone: data.phone,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Terjadi kesalahan saat membuat klinik',
      });
    });
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.query;

  const clinic = await Clinic.findByPk(id);

  if (clinic) {
    const services = await clinic.getServices();

    const distance = await getDistance(origin, clinic.address);

    res.status(200).send({
      error: false,
      message: 'Data klinik ditemukan.',
      data: {
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        posterPath: `${req.protocol}://${req.get(
          'host',
        )}/storage/uploads/static/${clinic.posterPath}`,
        phone: clinic.phone,
        distance: convertToKilometers(distance) ?? NaN,
        createdAt: clinic.createdAt,
        updatedAt: clinic.updatedAt,
        services: services.map((service) => ({
          id: service.id,
          name: service.name,
          price: service.price,
          description: service.description,
        })),
      },
    });
  }
};

exports.update = (req, res) => {
  const { id } = req.params;
  Clinic.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        if (req.file) {
          const { filename: posterPath } = req.file;
          Clinic.update({ posterPath }, { where: { id } });

          Clinic.findByPk(id).then((data) => {
            fs.unlinkSync(`${path}/storage/uploads/static/${data.posterPath}`);
          });
        }

        res.status(200).send({
          error: false,
          message: 'Data klinik berhasil diubah.',
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Data klinik tidak ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Terjadi kesalahan saat mengubah data klinik.',
      });
    });
};

exports.search = async (req, res) => {
  const { q } = req.params;
  const { origin } = req.query;

  const clinics = await Clinic.findAll({
    where: {
      name: {
        [Op.like]: `%${q}%`,
      },
    },
  });

  const result = clinics.map(async (clinic) => ({
    id: clinic.id,
    name: clinic.name,
    address: clinic.address,
    posterPath: `${req.protocol}://${req.get('host')}/storage/uploads/static/${
      clinic.posterPath
    }`,
    phone: clinic.phone,
    distance: await getDistance(origin, clinic.address),
    createdAt: clinic.createdAt,
    updatedAt: clinic.updatedAt,
  }));

  const sorted = await Promise.all(result).then((data) =>
    data.sort((a, b) => a.distance - b.distance),
  );

  const converted = sorted.map((clinic) => ({
    ...clinic,
    distance: convertToKilometers(clinic.distance) ?? NaN,
  }));

  res.status(200).send({
    error: false,
    message: 'Data klinik.',
    count: converted.length,
    data: converted,
  });
};
