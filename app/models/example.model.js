module.exports = (sequelize, Sequelize) => {
  const Example = sequelize.define('examples', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Example;
};
