(async () => {
  const createError = require('http-errors');
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const cors = require('cors');
  const mongoose = require('mongoose');
  

  require('dotenv').config();

  const app = express();

  /* Get Environment for later use */
  let env = process.env.NODE_ENV || 'DEVELOPMENT';
  env = env.toUpperCase();

  await mongoose
    .connect(process.env.MONGOOSE_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));

  const authRoute = require('./routes/auth');
  const usersRoute = require('./routes/users');
  const wastesRoute = require('./routes/waste');
  const mapRoute = require('./routes/map');
  const predictRoute = require("./routes/predict")

  app.disable('x-powered-by');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', authRoute);
  app.use('/api/user', usersRoute);
  app.use('/api/waste', wastesRoute);
  app.use('/api/map', mapRoute);
  app.use('/api/predict', predictRoute);
  app.use(express.static(path.join(__dirname, '/static')));

  // const clientDirectory = path.join(__dirname, '../client/dist/');

  //  Forward All Routes By Default to Vue Build if In Production Mode and vue build exist
  // if (fs.existsSync(clientDirectory) && env == 'PRODUCTION') {
  //   app.use(express.static(clientDirectory));
  //   app.get('/*', (req, res) => {
  //     res.sendFile(path.join(clientDirectory, 'index.html'));
  //   });
  // }

  const PORT = process.env.PORT || 8081;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();