import Vue from "vue";
import Router from "vue-router";
import ArticleList from '@/components/ArticleList';
import Article from "@/components/Article";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ArticleList
    },
    {
      path: "/article",
      name: "article",
      component: Article,
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
