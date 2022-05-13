import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import SelectTiming from '@/views/SelectTiming.vue';

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/select-timing',
    component: SelectTiming,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
