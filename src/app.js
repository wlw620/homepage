import Vue from 'vue';
import App from './app.vue';
import router from './routes';

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
