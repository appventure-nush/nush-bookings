import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCzGf6_C5oxBu84nozg68tYD7mlwXbKUc4',
  authDomain: 'nush-open-house-tours.firebaseapp.com',
  projectId: 'nush-open-house-tours',
  storageBucket: 'nush-open-house-tours.appspot.com',
  messagingSenderId: '573610856751',
  appId: '1:573610856751:web:f9f0170d121f9716c3d1da',
  measurementId: 'G-DR3Y1SZP1L',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  async getAllTours() {
    const querySnapshot = await getDocs(collection(db, 'tours'));
    var compliedData = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      compliedData = compliedData.concat(
        doc._document.data.value.mapValue.fields
      );
    });

    return compliedData;
  },

  async getTour(tour_id) {
    const docRef = doc(db, 'tours', tour_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  },

  async getTourByTime(time) {
    const docRef = collection(db, 'tours');
    const q = query(docRef, where('time', '==', time));
    const querySnapshot = await getDocs(q);

    var compliedData = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      compliedData = compliedData.concat(
        doc._document.data.value.mapValue.fields
      );
    });

    return compliedData;
  },

  async getTourbyParticipant(phone_no, pax) {
    const docRef = collection(db, 'tours');
    const q = query(
      docRef,
      where('participants', 'arrayContains', {
        phone_no: phone_no,
        pax: pax,
      })
    );
    const querySnapshot = await getDocs(q);

    var compliedData = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      compliedData = compliedData.concat(
        doc._document.data.value.mapValue.fields
      );
    });

    return compliedData;
  },

  async addParticipant(tour_id, phone_no, pax) {
    const docRef = doc(db, 'tours', tour_id);
    var newParticipant = {
      phone_no: phone_no,
      pax: pax,
    };

    await updateDoc(docRef, {
      participants: arrayUnion(newParticipant),
    });
  },

  async deleteParticipant(tour_id, phone_no, pax) {
    const docRef = doc(db, 'tours', tour_id);
    var participant = {
      phone_no: phone_no,
      pax: pax,
    };

    await updateDoc(docRef, {
      participants: arrayRemove(participant),
    });
  },

  async reinitialiseTours() {
    const morningTimings = [
      900, 910, 920, 930, 940, 950, 1000, 1010, 1020, 1030, 1040, 1050, 1100,
      1110,
    ];
    const count = morningTimings.length;

    const morningRoutes = ['A', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const routeCount = morningRoutes.length;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < routeCount; j++) {
        const tour_id = morningTimings[i] + '_' + morningRoutes[j];
        await setDoc(doc(db, 'tours', tour_id), {
          time: morningTimings[i],
          tour_id: tour_id,
          route: morningRoutes[j],
          participants: [],
        });
      }
    }

    const afternoonTimings = [
      1120, 1130, 1140, 1150, 1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310,
      1320, 1330, 1340, 1350, 1400, 1410, 1420, 1430, 1440, 1450, 1500, 1510,
      1520, 1530,
    ];
    const afternoonCount = afternoonTimings.length;

    const afternoonRoutes = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const aftRouteCount = afternoonRoutes.length;

    for (let i = 0; i < afternoonCount; i++) {
      for (let j = 0; j < aftRouteCount; j++) {
        const tour_id = afternoonTimings[i] + '_' + afternoonRoutes[j];
        await setDoc(doc(db, 'tours', tour_id), {
          time: afternoonTimings[i],
          tour_id: tour_id,
          route: afternoonRoutes[j],
          participants: [],
        });
      }
    }
  },
};
