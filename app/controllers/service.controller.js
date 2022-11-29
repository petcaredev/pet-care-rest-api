const db = require('../models');

const Service = db.service;

exports.index = (req, res) => {
  const { clinicId } = req.params;
  Service.findAll({
    where: { clinicId },
  })
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'Data layanan berdasarkan klinik.',
        count: data.length,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat mengambil data layanan.',
      });
    });
};

exports.store = (req, res) => {
  const { name, description, price, clinicId } = req.body;

  const service = {
    name,
    description,
    price,
    clinicId,
  };

  Service.create(service)
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'Data layanan berhasil ditambahkan.',
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat menambahkan data layanan.',
      });
    });
};

exports.show = (req, res) => {
  const { id } = req.params;

  Service.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          message: 'Data layanan ditemukan.',
          data: {
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Data layanan tidak ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Terjadi kesalahan saat mengambil data layanan',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  Service.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({
          error: false,
          message: 'Data layanan berhasil diperbarui.',
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Tidak dapat memperbarui data layanan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat memperbarui data layanan.',
      });
    });
};

exports.destroy = (req, res) => {
  const { id } = req.params;

  Service.destroy({
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({
          error: false,
          message: 'Data layanan berhasil dihapus.',
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Tidak dapat menghapus data layanan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat menghapus data layanan.',
      });
    });
};
