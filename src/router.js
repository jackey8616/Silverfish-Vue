import Vue from "vue";
import Router from "vue-router";
import NovelList from '@/components/NovelList';
import Novel from "@/components/Novel";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: NovelList
    },
    {
      path: "/novel/:novelID",
      name: "novel",
      component: Novel,
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
