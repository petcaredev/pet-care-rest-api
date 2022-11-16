const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://hoppscotch.io'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.json({ message: 'Welcome to the restful api.' });
});

require('./routes/example.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.all('*', (req, res) => {
  res.status(404).send({
    error: true,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
