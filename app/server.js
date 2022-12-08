const express = require('express');
const cors = require('cors');
const env = require('./utils/env.utils');

const app = express();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://hoppscotch.io'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage/uploads/static', express.static('storage/uploads/static'));

const db = require('./models');
const seed = require('./seeders');

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and re-sync db.');
    seed();
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the pet care restful api.' });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/clinic.routes')(app);
require('./routes/service.routes')(app);
require('./routes/reservation.routes')(app);

app.all('*', (req, res) => {
  res.status(404).send({
    error: true,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

const PORT =
  env('APP_MODE') === 'production' ? env('APP_PORT', 80) : env('APP_PORT');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
