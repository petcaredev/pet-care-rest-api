const fs = require('fs');
const path = require('path').resolve('./');
const db = require('../models');

const Clinic = db.clinic;
const { Op } = db.Sequelize;

exports.index = (req, res) => {
  Clinic.findAll()
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'Data klinik.',
        data: data.map((clinic) => ({
          id: clinic.id,
          name: clinic.name,
          address: clinic.address,
          posterPath: `${req.protocol}://${req.get(
            'host',
          )}/storage/uploads/static/${clinic.posterPath}`,
          phone: clinic.phone,
          createdAt: clinic.createdAt,
          updatedAt: clinic.updatedAt,
        })),
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Terjadi kesalahan saat mengambil data klinik',
      });
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
      res.status(200).send({
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

exports.show = (req, res) => {
  const { id } = req.params;

  Clinic.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          message: 'Data klinik ditemukan.',
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
        message: err.message || 'Terjadi kesalahan saat mengambil data klinik',
      });
    });
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
        message: err.message || 'Terjadi kesalahan saat mengubah data klinik',
      });
    });
};

exports.search = (req, res) => {
  const { q } = req.params;

  Clinic.findAll({
    where: {
      name: {
        [Op.like]: `%${q}%`,
      },
    },
  })
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'Data klinik.',
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Terjadi kesalahan saat mengambil data klinik',
      });
    });
};
