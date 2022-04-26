import { createApp } from 'vue';
import '@/registerServiceWorker';

// Vue-Observe-Visibility
import { ObserveVisibility } from 'vue-observe-visibility';
// FontAwesome
import '@/plugins/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// vue-toastification@next
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from '@/App.vue';
import router from '@/router';
import store, { key } from '@/store';

import Loading from '@/components/CLoading.vue';

const app = createApp(App);

app.config.globalProperties.$endpoint = 'https://silverfish-backend.clo5de.info:2087';
// app.config.globalProperties.$endpoint = 'http://localhost:8080';
app.config.globalProperties.$apiVersionRoute = '/api/v1';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */
app.directive('observe-visibility', {
  beforeMount: (el, binding, vnode) => {
    (vnode as any).context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  updated: (el, binding, vnode) => {
    (vnode as any).context = binding.instance;
    ObserveVisibility.update(el, binding, vnode);
  },
  unmounted: ObserveVisibility.unbind,
});
/* eslint-enable no-param-reassign, @typescript-eslint/no-explicit-any */
app.component('font-awesome-icon', FontAwesomeIcon);
/* eslint-disable vue/multi-word-component-names */
app.component('loading', Loading);
/* eslint-enable vue/multi-word-component-names */

app
  .use(store, key)
  .use(router)
  .use(Toast)
  .mount('#app');
