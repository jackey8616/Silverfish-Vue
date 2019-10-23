import Vue from "vue";
import Router from "vue-router";
// Vue-Meta
import VueMeta from 'vue-meta';

Vue.use(Router);

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => 
        import(/* webpackChunkName: "index" */"@/views/Index"),
    },
    {
      path: "/list",
      name: "list",
      components: {
        default: () => import(/* webpackChunkName: "list" */"@/views/List"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: () => import(/* webpackChunkName: "login" */"@/views/auth/Login"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: () => import(/* webpackChunkName: "register" */"@/views/auth/Register"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
    },
    {
      path: "/userinfo",
      name: "userinfo",
      components: {
        default: () => import(/* webpackChunkName: "userinfo" */"@/views/auth/UserInfo"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/info/:type/:id",
      name: "info",
      components: {
        default: () => import(/* webpackChunkName: "info" */"@/views/books/Info"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
      props: true
    },
    {
      path: "/novel/:novelID",
      name: "novel",
      components: {
        default: () => import(/* webpackChunkName: "novel" */"@/views/books/Novel"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
      props: true
    },
    {
      path: "/comic/:comicID",
      name: "comic",
      components: {
        default: () => import(/* webpackChunkName: "comic" */"@/views/books/Comic"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
      props: true
    },
    /*
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/*webpackChunkName: "about""./views/About.vue")
    }
    */
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Vue.prototype.$vuex.getters.isLogging() === false) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  }
  next();
});

export default router;
