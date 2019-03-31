import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";

axios.defaults.withCredentials = false;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//Vue.prototype.$backend = "http://127.0.0.1:8080"
Vue.prototype.$backend = "http://silverfish-backend.clo5de.info:8080"

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
