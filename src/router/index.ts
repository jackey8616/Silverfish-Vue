import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useToast } from 'vue-toastification';

import store from '@/store';

const toast = useToast();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */'@/views/VHome.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: 'list' */'@/views/VList.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/auth/VLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */'@/views/auth/VRegister.vue'),
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import(/* webpackChunkName: 'userinfo' */'@/views/auth/VUserInfo.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: 'admin' */'@/views/auth/VAdmin.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/info/:type/:id',
    name: 'info',
    component: () => import(/* webpackChunkName: 'info' */'@/views/book/VInfo.vue'),
    props: true,
  },
  {
    path: '/novel/:novelID',
    name: 'novel',
    component: () => import(/* webpackChunkName: 'novel' */'@/views/book/VNovel.vue'),
    props: true,
  },
  {
    path: '/comic/:comicID',
    name: 'comic',
    component: () => import(/* webpackChunkName: 'comic' */'@/views/book/VComic.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/* eslint-disable no-else-return, no-return-await */
router.beforeEach(async (to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['user/isLogin'] === false) {
      toast.error('請先登入!');
      return {
        path: '/login',
        query: { redirect: to.path },
      };
    } else if (store.getters['auth/isSessionExpired'] === true) {
      toast.error('閒置過長，請重新登入！');
      return {
        path: '/login',
        query: { redirect: to.path },
      };
    } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
      if (store.getters['user/isAdmin'] === true) {
        return true;
      } else {
        toast.error('安安你不是管理員ㄛ~');
        return false;
      }
    }
  }
  return true;
});

export default router;
