import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () =>
  import ('../pages/home/home.vue');

const Demo = () =>
  import ('../pages/demo/demo.vue');

const WebSocket = () =>
  import ('../pages/demo/webSocket.vue');

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/home',
  component: Home
}, {
  path: '/demo',
  component: Demo,
  children: [{
    path: 'socket',
    component: WebSocket
  }]
}];

const router = new Router({
  mode: 'history',
  routes
});

// 初始化滚动条高度
router.afterEach(function (e) {
  window.scrollTo(0, 0)
});

export default router;
