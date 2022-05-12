(async () => {
  require('dotenv').config();

  const createError = require('http-errors');
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const cors = require('cors');
  


  const app = express();

  /* Get Environment for later use */
  let env = process.env.NODE_ENV || 'DEVELOPMENT';
  env = env.toUpperCase();
  const toursRoute = require('./routes/tours');

  app.disable('x-powered-by');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use('/api/tours', toursRoute);

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