const { response } = require('express');
const express = require('express');
const router = express.Router();

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


// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firestore.getFirestore(app);



/* GET list of tours */
router.get('/', async function (req, res) {
    const querySnapshot = await firestore.getDocs(firestore.collection(db, "tours"));
    var compliedData = [{}]
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        compliedData = compliedData.concat(doc._document.data.value.mapValue.fields)
      });
      
    res.send(compliedData.slice(start=1))

  });


/* GET a specific tour */
router.get('/:id', async function (req, res) {
    const docRef = firestore.doc(db, "tours", req.params.id);
    console.log(req.params.id)
    const docSnap = await firestore.getDoc(docRef);
    
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        res.send(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
        console.log("No such document!");
        res.send("No such tour!");
    }

  });

  



module.exports = router;
