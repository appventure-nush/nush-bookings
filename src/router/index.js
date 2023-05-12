import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import SelectTiming from '@/views/SelectTiming.vue';
import NumberOfPeople from '@/views/NumberOfPeople.vue';
import InputName from '@/views/InputName.vue';
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
    path: '/num-people',
    component: NumberOfPeople,
  },
  {
    path: '/input-name',
    component: InputName,
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

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('bookingId') != null) {
    // already made booking
    if (to.path !== '/booking-pass') next('/booking-pass');
    else next();
  } else {
    if (to.path === '/booking-pass') next('/');
    else next();
  }
});

export default router;
