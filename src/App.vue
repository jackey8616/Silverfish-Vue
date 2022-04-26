<template>
  <div id="app">
    <navigator />
    <router-view />
    <foot />
  </div>
</template>

<script lang="ts">
/* eslint-disable lines-between-class-members, class-methods-use-this */
import {
  nextTick, onMounted, provide, ref,
  defineComponent,
} from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { useToast } from 'vue-toastification';

import { useStore } from '@/store';
import UserAPI from '@/api/user';

import Navigator from '@/components/CNavigator.vue';
import Foot from '@/components/CFoot.vue';

export default defineComponent({
  components: { Navigator, Foot },
  setup() {
    const toast = useToast();
    const { latestBookmark } = UserAPI();
    const store = useStore();

    const height = ref(0);
    const withFootHeight = ref(0);
    const fetchBookmark = () => {
      if (store.getters['user/isLogin'] === true) {
        latestBookmark(store.getters['auth/getSession']).then((data) => {
          store.commit('user/updateBookmark', data);
        }).catch((err) => {
          if (err.reason === 'SessionToken not exists') {
            store.dispatch('auth/logout');
            toast.error('不存在的Session，無法獲取書籤，請重新登入！');
          } else {
            console.error(err);
          }
        });
      }
    };

    provide('height', height);
    provide('withFootHeight', withFootHeight);
    provide('fetchBookmark', fetchBookmark);

    onMounted(() => {
      nextTick(() => {
        const ro = new ResizeObserver(() => {
          nextTick(() => {
            const el = document.getElementById('navigator');
            const footEl = document.getElementById('foot');
            if (el !== null) {
              height.value = window.innerHeight - el.clientHeight;
              withFootHeight.value = window.innerHeight - el.clientHeight - footEl!.clientHeight;
            }
          });
        });
        const el = document.getElementById('navigator');
        ro.observe(document.body);
        if (el !== null) {
          ro.observe(el);
        }
      });
    });
    return {};
  },
});
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #D4D8DB;
    background-color: #2c3e50;
  }
  #content {
    min-height: 85.1vh;
    padding: 60px 0;
  }
  .btn-color-1 {
    color: #ffffff;
    background-color: #5c9291;
    border-color: #5c9291;
  }
  .btn-color-2 {
    color: #ffffff;
    background-color: #9079ad;
    border-color: #9079ad;
  }
  .btn-color-3 {
    color: #ffffff;
    background-color: #9d5b8b;
    border-color: #9d5b8b;
  }

  input.form-control {
    background-color: #8b968d;
    border-color: #8b968d;
  }
  input.form-control::placeholder {
    color: #203744;
  }
  a {
    text-decoration: none;
  }
  /* Need to remove after Home component not use as List. */
  img {
    width: 100%;
    height: 100%;
  }
</style>
