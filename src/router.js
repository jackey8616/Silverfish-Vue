import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Info from "@/components/Info";
import List from '@/components/List';
import Novel from "@/components/Novel";
import Comic from "@/components/Comic";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: List
    },
    {
      path: "/list",
      name: "list",
      component: List
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/novel/:novelID",
      name: "novel",
      component: Novel,
      props: true
    },
    {
      path: "/novel_intro/:novelID",
      name: "novel_intro",
      component: Info,
      props: true
    },
    {
      path: "/comic/:comicID",
      name: "comic",
      component: Comic,
      props: true
    },
    {
      path: "/comic_intro/:comicID",
      name: "comic_intro",
      component: Info,
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
        import(/* webpackChunkName: "about" "./views/About.vue")
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
