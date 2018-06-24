import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const Home = () =>
  import(/* webpackChunkName: "group_home" */ '../pages/home/home.vue');

const Demo = () =>
  import(/* webpackChunkName: "group_demo" */ '../pages/demo/demo.vue');

const WebSocket = () =>
  import(/* webpackChunkName: "group_webSocket" */ '../pages/demo/webSocket.vue');

const DemoList = () =>
  import(/* webpackChunkName: "group_component" */ '../pages/demo/list.vue');

const Component = () =>
  import(/* webpackChunkName: "group_component" */ '../pages/demo/component.vue');



const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/home',
  component: Home
}, {
  path: '/demo',
  component: Demo,
  children: [
    {
      path: '/',
      component: DemoList
    },
    {
      path: 'socket',
      component: WebSocket
    },
    {
      path: 'component',
      component: Component
    }
  ]
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
