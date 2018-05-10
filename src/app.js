import Vue from 'vue';
import App from './App.vue';
import router from './routers';

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
