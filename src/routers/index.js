import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
const routes = [];

const router = new Router({
  mode: 'history',
  routes
});

router.afterEach(function (e) {
  window.scrollTo(0, 0)
});

export default router;
