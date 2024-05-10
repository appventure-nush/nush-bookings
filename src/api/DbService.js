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
  serverTimestamp,
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
    await updateDoc(doc(db, 'slotsLeft', 'slotsLeft'), {
      [tourId]: increment(-pax),
    });
    const bookingDoc = await addDoc(
      collection(db, 'tourGroups', tourId, 'bookings'),
      {
        name,
        pax,
        timestamp: serverTimestamp(),
      }
    );
    return bookingDoc.id;
  },

  async cancelBooking(tourId, bookingId) {
    const bookingDoc = await getDoc(
      doc(db, 'tourGroups', tourId, 'bookings', bookingId)
    );
    if (!bookingDoc.exists()) return;
    const { pax } = bookingDoc.data();
    await updateDoc(doc(db, 'slotsLeft', 'slotsLeft'), {
      [tourId]: increment(pax),
    });
    await deleteDoc(bookingDoc.ref);
  },

  async reinitialiseTours() {
    console.log('resetting!');
    const timings = [
      900, 915, 930, 945, 1000, 1015, 1030, 1045, 1100, 1115, 1130, 1145,
      //
      1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310, 1320, 1330, 1340, 1350,
      1400, 1410, 1420, 1430,
    ];
    const groupsBefore1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const groupsAfter1200 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const slotsLeftData = {};
    for (const timing of timings) {
      for (const group of timing < 1200 ? groupsBefore1200 : groupsAfter1200) {
        const slot = timing + '_' + group;
        slotsLeftData[slot] = 12;
        const emptyData = {};
        console.log(slot);
        await setDoc(doc(db, 'tourGroups', slot), emptyData);
      }
    }
    await setDoc(doc(db, 'slotsLeft', 'slotsLeft'), slotsLeftData);
    console.log('done!');
  },
};
