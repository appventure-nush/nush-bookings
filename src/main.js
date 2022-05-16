import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

document.body.requestFullscreen();
createApp(App).use(router).mount('#app');
