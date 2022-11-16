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
        message: 'Tidak memiliki akses!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isClinic = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i += 1) {
        if (roles[i].name === 'clinic') {
          next();
        }
      }

      res.status(403).send({
        message: 'Memerlukan hak akses klinik!',
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isClinic,
};
module.exports = authJwt;
