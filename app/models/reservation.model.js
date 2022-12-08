module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define('reservations', {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    petName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    petType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return Reservation;
};
