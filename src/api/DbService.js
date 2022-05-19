import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  increment,
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
  data: {
    cachedTours: null,
  },

  async getAllTours() {
    const toursDoc = await getDoc(doc(db, 'slotsLeft', 'slotsLeft'));
    this.data.cachedTours = toursDoc.data();
    return this.data.cachedTours;
  },

  async getAllToursCached() {
    return this.data.cachedTours ?? this.getAllTours();
  },

  async getUserTour(phoneNumber) {
    const tourDoc = await getDoc(doc(db, 'bookings', phoneNumber));
    return tourDoc.data();
  },

  async submitBooking(tourId, phoneNumber, pax) {
    const [timing, route] = tourId.split('_');
    await setDoc(doc(db, 'bookings', phoneNumber), {
      tourId,
      route,
      timing: parseInt(timing),
      pax,
    });
    await updateDoc(doc(db, 'slotsLeft', 'slotsLeft'), {
      [tourId]: increment(-pax),
    });
  },

  async cancelBooking(phoneNumber) {
    const bookingDoc = await getDoc(doc(db, 'bookings', phoneNumber));
    if (!bookingDoc.exists()) return;
    const { tourId, pax } = bookingDoc.data();
    await updateDoc(doc(db, 'slotsLeft', 'slotsLeft'), {
      [tourId]: increment(pax),
    });
    await deleteDoc(doc(db, 'bookings', phoneNumber));
  },

  async reinitialiseTours() {
    const timings = [
      900, 910, 920, 930, 940, 950, 1000, 1010, 1020, 1030, 1040, 1050, 1100,
      1110,
      //
      1120, 1130, 1140, 1150, 1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310,
      1320, 1330, 1340, 1350, 1400, 1410, 1420, 1430, 1440, 1450, 1500, 1510,
      1520, 1530,
    ];
    const routesBefore1110 = ['A', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const routesAfter1110 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];

    const slotsLeftData = {};
    for (const timing of timings) {
      for (const route of timing <= 1110 ? routesBefore1110 : routesAfter1110) {
        slotsLeftData[timing + '_' + route] = 12;
      }
    }
    await setDoc(doc(db, 'slotsLeft', 'slotsLeft'), slotsLeftData);
  },
};
