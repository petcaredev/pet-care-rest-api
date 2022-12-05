const db = require('../models');

const User = db.user;

exports.show = (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          message: 'Data pengguna ditemukan.',
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Data pengguna tidak ditemukan.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat mengambil data pengguna.',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({
          error: false,
          message: 'Data pengguna berhasil diperbarui.',
        });
      } else {
        res.status(404).send({
          error: true,
          message: 'Tidak dapat memperbarui data pengguna.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Terjadi kesalahan saat memperbarui data pengguna.',
      });
    });
};
