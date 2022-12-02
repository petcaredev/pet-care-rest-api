const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    address: req.body.address,
  })
    .then((user) => {
      Role.findAll({
        where: {
          name: req.body.role,
        },
      }).then((roles) => {
        user.setRoles(roles).then(() => {
          res
            .status(200)
            .send({ error: false, message: 'Pengguna berhasil didaftarkan!' });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ error: true, message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ error: true, message: 'Pengguna tidak ditemukan.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          error: true,
          message: 'Password salah!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 604800, // 7 days
      });

      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i += 1) {
          authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
        }
        res.status(200).send({
          error: false,
          message: 'Berhasil login!',
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            roles: authorities,
            accessToken: token,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ error: true, message: err.message });
    });
};
