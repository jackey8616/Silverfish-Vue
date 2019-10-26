import Vue from "vue";
import Router from "vue-router";
// Vue-Meta
import VueMeta from 'vue-meta';

Vue.use(Router);

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

const router = new Router({
  //mode: 'history',
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
      path: "/admin",
      name: "admin",
      components: {
        default: () => import(/* webpackChunkName: "admin" */"@/views/auth/Admin"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      },
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
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
    {
      path: "*",
      name: "not_found",
      components: {
        default: () => import(/* webpackChunkName: "not_found" */"@/views/NotFound"),
        nav: () => import(/* webpackChunkName: "nav" */"@/components/Navigator"),
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Vue.prototype.$vuex.getters.isLogging() === false) {
      return next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      return await Vue.prototype.$api.authIsAdmin(Vue.prototype.$vuex.getters.getSession()).then(data => {
        if (data.isAdmin == true) {
          return next();
        } else {
          Vue.prototype.$toasted.error("安安你不是管理員ㄛ~")
          return next({ path: to.name != from.name ? from.path : "/" });
        }
      }).catch(() => {
        return next({ path: to.name != from.name ? from.path : "/" });
      });
    }
  }
  console.log(to);
  return next();
});

export default router;
