import Vue from 'vue';
import App from './app.vue';
import router from './routes';

import pluginManager from './utils/plugins';

Vue.use(pluginManager);

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
