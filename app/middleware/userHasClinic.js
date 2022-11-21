const db = require('../models');

const User = db.user;
const Clinic = db.clinic;

const checkUserHasClinic = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const clinic = await Clinic.findOne({
    where: {
      userId: user.id,
    },
  });

  if (clinic) {
    return res.status(403).send({
      message: 'Anda sudah memiliki klinik!',
    });
  }

  next();
};

module.exports = checkUserHasClinic;
