import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import App from '../views/App.vue';
import Home from '../views/Home.vue';
import MyWaste from '../views/MyWaste.vue';
import Favorites from '../views/Favorites.vue';
import Settings from '../views/Settings.vue';
import Waste from '../views/Waste.vue';
import AddWaste from '../views/AddWaste.vue';
import EditWaste from '../views/EditWaste.vue';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/app',
    component: App,
    redirect: '/app/home',
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'my-waste',
        component: MyWaste,
      },
      {
        path: 'favorites',
        component: Favorites,
      },
      {
        path: 'settings',
        component: Settings,
      },
    ],
  },
  {
    path: '/waste/:id',
    component: Waste,
    props: true,
  },
  {
    path: '/add-waste',
    component: AddWaste,
  },
  {
    path: '/edit-waste/:id',
    component: EditWaste,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

import userStore from '../store/user';

router.beforeEach((to, from, next) => {
  if (userStore.user == null && to.path !== '/') next({ path: '/' });
  else if (userStore.user != null && to.path === '/')
    next({ path: '/app/home' });
  else next();
});

export default router;
