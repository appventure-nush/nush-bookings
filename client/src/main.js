import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import AuthService from './api/AuthService';
import userStore from './store/user';

AuthService.getUser().then((user) => {
  if (user) {
    userStore.user = user;
  }
  createApp(App).use(router).mount('#app');
});
