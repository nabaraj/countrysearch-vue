import Vue from "vue";
import Router from 'vue-router';
// import Home from './view/Home'
Vue.use(Router);
const router = new Router({
  base: '/',
  mode: 'history',
  routes: [
    // dynamic segments start with a colon
    { path: '/', component: () => import('./view/Home.vue') },
    { path: '/details/:name', component: () => import('./view/Country.vue') },
    { path: '*', component: () => import('./view/NotFound.vue') }
  ]
})
export default router;