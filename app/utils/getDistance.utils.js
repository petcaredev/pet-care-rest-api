const axios = require('axios');
const env = require('./env.utils');

const getDistance = async (origin, destination) => {
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${env(
      'GOOGLE_MAPS_API_KEY',
    )}`,
  };

  const response = await axios(config);
  const data = await response.data;

  return data.rows[0].elements[0].distance.value;
};

const convertToKilometers = (value) => {
  const kilometers = value / 1000;
  if (kilometers < 1) {
    return `${value} m`;
  }
  return `${kilometers.toFixed(1)} km`;
};

module.exports = { getDistance, convertToKilometers };
