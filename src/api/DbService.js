import { SlotFlags } from '@vue/shared';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  increment,
  collection,
  addDoc,
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
    cachedTourID: null,
    cachedBooking: null,
  },

  async getAllTours() {
    const toursDoc = await getDoc(doc(db, 'tourGroups', 'slotsLeft'));
    this.data.cachedTours = toursDoc.data();
    return this.data.cachedTours;
  },

  async getAllToursCached() {
    return this.data.cachedTours ?? this.getAllTours();
  },

  async getUserTour() {
    const tourDoc = await getDoc(
      doc(
        db,
        'tourGroups',
        this.data.cachedTourID,
        'bookings',
        this.data.cachedBooking
      )
    );
    return tourDoc.data();
  },

  async submitBooking(tourId, name, pax) {
    const [timing, route] = tourId.split('_');
    const docRef = await addDoc(
      collection(db, 'tourGroups', tourId, 'bookings'),
      {
        name,
        pax,
      }
    );
    await updateDoc(doc(db, 'tourGroups', 'slotsLeft'), {
      [tourId]: increment(-pax),
    });
    this.data.cachedTourID = tourId;
    this.data.cachedBooking = docRef.id;
  },

  async cancelBooking() {
    const bookingDoc = await getDoc(
      doc(
        db,
        'tourGroups',
        this.data.cachedTourID,
        'bookings',
        this.data.cachedBooking
      )
    );
    if (!bookingDoc.exists()) return;
    const { tourId, pax } = bookingDoc.data();
    await updateDoc(doc(db, 'tourGroups', 'slotsLeft'), {
      [tourId]: increment(pax),
    });
    await deleteDoc(
      doc(
        db,
        'tourGroups',
        this.data.cachedTourID,
        'bookings',
        this.data.cachedBooking
      )
    );
    this.data.cachedTourID = null;
    this.data.cachedBooking = null;
  },

  async reinitialiseTours() {
    const timings = [
      900, 915, 930, 945, 1000, 1015, 1030, 1045, 1100, 1115, 1130, 1145,
      //
      1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310, 1320, 1330, 1340, 1350,
      1400, 1410, 1420, 1430, 1440, 1450, 1500, 1510, 1520, 1530,
    ];
    const routesBefore1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const routesAfter1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const slotsLeftData = {};
    for (const timing of timings) {
      for (const route of timing < 1200 ? routesBefore1200 : routesAfter1200) {
        const slot = timing + '_' + route;
        slotsLeftData[slot] = 12;
        const emptyData = {};
        await setDoc(doc(db, 'tourGroups', slot), emptyData);
      }
    }
    await setDoc(doc(db, 'tourGroups', 'slotsLeft'), slotsLeftData);
    this.addBookingCollection();
  },

  async addBookingCollection() {
    const timings = [
      900, 915, 930, 945, 1000, 1015, 1030, 1045, 1100, 1115, 1130, 1145,
      //
      1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310, 1320, 1330, 1340, 1350,
      1400, 1410, 1420, 1430, 1440, 1450, 1500, 1510, 1520, 1530,
    ];
    const routesBefore1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const routesAfter1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const slotsLeftData = {};
    for (const timing of timings) {
      for (const route of timing < 1200 ? routesBefore1200 : routesAfter1200) {
        const slot = timing + '_' + route;
        const docRef = doc(db, 'tourGroups', slot);
        const colRef = collection(docRef, 'bookings');
        addDoc(colRef, {});
      }
    }
  },
};
