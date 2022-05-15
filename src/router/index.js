import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import SelectTiming from '@/views/SelectTiming.vue';
import SelectRoute from '@/views/SelectRoute.vue';
import NumberOfPeople from '@/views/NumberOfPeople.vue';
import PhoneNumber from '@/views/PhoneNumber.vue';
import SlotsTaken from '@/views/SlotsTaken.vue';
import BookingPass from '@/views/BookingPass.vue';

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/select-timing',
    component: SelectTiming,
  },
  {
    path: '/select-route',
    component: SelectRoute,
  },
  {
    path: '/num-people',
    component: NumberOfPeople,
  },
  {
    path: '/phone-number',
    component: PhoneNumber,
  },
  {
    path: '/slots-taken',
    component: SlotsTaken,
  },
  {
    path: '/booking-pass',
    component: BookingPass,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
