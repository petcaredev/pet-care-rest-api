const dotenv = require('dotenv').config();

const env = (key, defaultValue = null) => {
  let value = dotenv.parsed[key];

  if (defaultValue !== null) {
    value = defaultValue;
  }

  return value;
};

module.exports = env;
