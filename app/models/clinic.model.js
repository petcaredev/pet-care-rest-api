module.exports = (sequelize, Sequelize) => {
  const Clinic = sequelize.define('clinics', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    posterPath: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Clinic;
};
