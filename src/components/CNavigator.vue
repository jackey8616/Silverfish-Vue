<template>
  <nav id="navigator" class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <a class="navbar-brand">書蠹付梓 | 無縫閱讀</a>
      </router-link>
      <button
        class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="navbar-collapse collapse row">
        <ul id="left-nav" class="navbar-nav col-8">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }">
              <a class="nav-link">
                <font-awesome-icon icon="home"/>  首頁
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'list' }">
              <a class="nav-link">
                <font-awesome-icon icon="book-open"/> 列表
              </a>
            </router-link>
          </li>
          <li v-if="user.account === 'admin'" class="nav-item">
            <router-link :to="{ name: 'admin' }">
              <a class="nav-link">
                <font-awesome-icon icon="columns"/> 後台
              </a>
            </router-link>
          </li>
        </ul>
        <ul id="right-nav" class="navbar-nav col-4">
          <li class="nav-item dropdown">
            <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
            <a
              id="navbarDropdown" class="nav-link dropdown-toggle" href="#"
              role="button" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"
            >
              <font-awesome-icon icon="user" />
            </a>
            <div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
              <div v-if="isLogin === true">
                <a class="dropdown-item" href="#">{{ user.account }}</a>
                <router-link :to="{ name: 'userinfo' }" class="dropdown-item">資訊</router-link>
                <div class="dropdown-divider"></div>
                <a @click="logout()" class="dropdown-item" href="#">登出</a>
              </div>
              <div v-else>
                <li><a class="dropdown-item" href="#">{{ user.account }}</a></li>
                <li>
                  <router-link :to="{ name: 'register' }">
                    <a class="dropdown-item">註冊</a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'login' }">
                    <a class="dropdown-item">登入</a>
                  </router-link>
                </li>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { watch, defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useStore } from '@/store';

import authAPI from '@/api/auth';
import { useToast } from 'vue-toastification';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const toast = useToast();
    const { authLogout, authStatus } = authAPI();
    const session = computed(() => store.getters['auth/getSession']);

    const logout = async () => {
      await authLogout(session.value);
      store.dispatch('auth/logout');
      toast('登出成功');
      router.push({ path: '/' });
    };

    watch(() => route.path, async () => {
      if (store.getters['user/isLogin'] === false || session.value === '') {
        return;
      }

      const statusData = await authStatus(session.value);
      if (statusData === false) {
        store.dispatch('auth/logout');
        toast.error('Session過期，請重新登入');
      }
    });

    return {
      store,
      isLogin: computed(() => store.getters['user/isLogin']),
      user: computed(() => store.getters['user/getUser']),
      logout,
    };
  },
});
</script>

<style scoped>
  #navigator {
    background-color: #222426;
    box-sizing: border-box;
    position: relative;
  }
  #navbarNav {
    padding-left: 10px;
  }
  #right-nav {
    display: inline;
    text-align: right;
  }
  #right-nav .nav-item,.nav-link {
    display: inline;
  }
  div.dropdown-menu {
    background-color: #222426;
  }
  .dropdown-item {
    color: rgba(255, 255, 255, 0.5);
  }
  .dropdown-item:hover,.dropdown-item:focus {
    color: rgba(255, 255, 255, 0.75);
    background-color: #222426;
  }
</style>
