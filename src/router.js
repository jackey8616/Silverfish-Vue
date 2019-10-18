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
        import(/* webpackChunkName: "list" */"@/components/List"),
    },
    {
      path: "/list",
      name: "list",
      component: () => 
        import(/* webpackChunkName: "list" */"@/components/List"),
    },
    {
      path: "/login",
      name: "login",
      component: () => 
        import(/* webpackChunkName: "login" */"@/components/auth/Login"),
    },
    {
      path: "/register",
      name: "register",
      component: () => 
        import(/* webpackChunkName: "register" */"@/components/auth/Register"),
    },
    {
      path: "/userinfo",
      name: "userinfo",
      component: () =>
        import(/* webpackChunkName: "userinfo" */"@/components/auth/UserInfo"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/novel/:novelID",
      name: "novel",
      component: () => 
        import(/* webpackChunkName: "novel" */"@/components/Novel"),
      props: true
    },
    {
      path: "/novel_intro/:novelID",
      name: "novel_intro",
      component: () => 
        import(/* webpackChunkName: "info" */"@/components/Info"),
      props: true
    },
    {
      path: "/comic/:comicID",
      name: "comic",
      component: () =>
        import(/* webpackChunkName: "comic" */"@/components/Comic"),
      props: true
    },
    {
      path: "/comic_intro/:comicID",
      name: "comic_intro",
      component: () => 
        import(/* webpackChunkName: "info" */"@/components/Info"),
      props: true
    }
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
