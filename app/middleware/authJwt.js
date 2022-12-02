const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authType = authHeader && authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1];

  if (authType !== 'Bearer') {
    return res.status(403).send({
      error: true,
      message: 'Token tidak valid!',
    });
  }

  if (!token) {
    return res.status(403).send({
      error: true,
      message: 'Tidak ada token!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: true,
        message: 'Tidak memiliki akses!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i += 1) {
        if (roles[i].name === 'user') {
          next();
          return;
        }
      }

      res.status(403).send({
        error: true,
        message: 'Memerlukan hak akses pengguna!',
      });
    });
  });
};

const isClinic = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i += 1) {
        if (roles[i].name === 'clinic') {
          next();
          return;
        }
      }

      res.status(403).send({
        error: true,
        message: 'Memerlukan hak akses klinik!',
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isUser,
  isClinic,
};
module.exports = authJwt;
