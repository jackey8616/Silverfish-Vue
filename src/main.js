import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { ObserveVisibility } from 'vue-observe-visibility'
import "bootstrap/dist/css/bootstrap.css";
import "./registerServiceWorker";

import Store from './store';

axios.defaults.withCredentials = false;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//Vue.prototype.$backend = "http://127.0.0.1:8080"
Vue.prototype.$backend = "http://silverfish-backend.clo5de.info:8080"
Vue.prototype.$store = Store;

Vue.directive('observe-visibility', ObserveVisibility)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
