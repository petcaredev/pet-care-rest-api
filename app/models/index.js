const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.clinic = require('./clinic.model')(sequelize, Sequelize);
db.service = require('./service.model')(sequelize, Sequelize);
db.reservation = require('./reservation.model')(sequelize, Sequelize);

// pivot table between user and role
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});
db.ROLES = ['user', 'clinic'];

// relation between clinic and user
db.user.hasOne(db.clinic);
db.clinic.belongsTo(db.user);

// relation between service and clinic
db.clinic.hasMany(db.service);
db.service.belongsTo(db.clinic);

// relation between reservation and user
db.user.hasMany(db.reservation);
db.reservation.belongsTo(db.user);

// relation between reservation and clinic
db.clinic.hasMany(db.reservation);
db.reservation.belongsTo(db.clinic);

// pivot table between reservation and service
db.reservation.belongsToMany(db.service, {
  through: 'reservation_details',
  foreignKey: 'reservationId',
  otherKey: 'serviceId',
});
db.service.belongsToMany(db.reservation, {
  through: 'reservation_details',
  foreignKey: 'serviceId',
  otherKey: 'reservationId',
});

module.exports = db;
