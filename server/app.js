const { route } = require('./routes/tours');

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

  await reinitialiseTours();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

async function reinitialiseTours(){
  const firebaseApp  = require("firebase/app");
  const firestore = require("firebase/firestore");
  // import { initializeApp } from "firebase/app";
  // import { collection, getFirestore } from "firebase/firestore";
  const firebaseConfig = {
      apiKey: "AIzaSyCzGf6_C5oxBu84nozg68tYD7mlwXbKUc4",
      authDomain: "nush-open-house-tours.firebaseapp.com",
      projectId: "nush-open-house-tours",
      storageBucket: "nush-open-house-tours.appspot.com",
      messagingSenderId: "573610856751",
      appId: "1:573610856751:web:f9f0170d121f9716c3d1da",
      measurementId: "G-DR3Y1SZP1L"
    };


    const app = firebaseApp.initializeApp(firebaseConfig);
    const db = firestore.getFirestore(app)

    const morningTimings = [900, 910, 920, 930, 940, 950, 1000, 1010, 1020, 1030, 1040, 1050, 1100, 1100];
    const count = morningTimings.length;
    
    const morningRoutes = ["A", "B1", "B2", "C1", "C2", "D1", "D2"];
    const routeCount = morningRoutes.length;
    
    for (let i = 0; i < count; i++){
      for (let j = 0; j < routeCount; j++){
        const tour_id = morningTimings[i] + "_" + morningRoutes[j];
        await firestore.setDoc(firestore.doc(db, "tours", tour_id), {
          time: morningTimings[i],
          tour_id: tour_id,
          route: morningRoutes[j],
          participants: [],
      });
      }
    }

    const afternoonTimings = [1120, 1130, 1140, 1150, 1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310, 1320, 1330, 1340, 1350, 1400, 1410, 1420, 1430, 1440, 1450,
    1500, 1510, 1520, 1530,];
    const afternoonCount = afternoonTimings.length;
    
    const afternoonRoutes= ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
    const aftRouteCount = afternoonRoutes.length;
    
    for (let i = 0; i < afternoonCount; i++){
      for (let j = 0; j < aftRouteCount; j++){
        const tour_id = afternoonTimings[i] + "_" + afternoonRoutes[j];
        await firestore.setDoc(firestore.doc(db, "tours", tour_id), {
          time: afternoonTimings[i],
          tour_id: tour_id,
          route: afternoonRoutes[j],
          participants: [],
      });
      }
    }

  
}