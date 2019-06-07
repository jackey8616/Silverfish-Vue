<template>
  <nav id="navigator" class="navbar navbar-expand-lg navbar-dark">
    <router-link to="/" class="navbar-brand">書蠹付梓 | 無縫閱讀</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="navbar-collapse collapse row">
      <ul id="left-nav" class="navbar-nav col-8">
        <li class="nav-item">
          <router-link to="/" class="nav-link">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list" class="nav-link">列表</router-link>
        </li>
      </ul>
      <ul id="right-nav" class="navbar-nav col-4">
        <li class="nav-item">
          <div class="fb-like" data-href="https://www.facebook.com/silverfish.compose/" data-width="" data-layout="button_count" data-action="recommend" data-size="large" data-show-faces="true" data-share="true"></div>
        </li>&nbsp;
        <li class="nav-item"><Omine /></li>
        <!--li class="nav-item">
          <router-link v-if="$vuex.getters.isLogging() === false" to="/login">{{ $vuex.getters.getAuth().account }}</router-link>
          <router-link v-else to="/">{{ $vuex.getters.getAuth().account }}</router-link>
        </li>
        <li class="nav-item">
          <a v-if="$vuex.getters.isLogging()" @click="logout()" class="nav-link">登出</a>
        </li-->
      </ul>
    </div>
  </nav>
</template>

<script>
import Omine from '@/components/Omine';

export default {
  name: 'navigator',
  components: { Omine },
  methods: {
    logout () {
      this.$vuex.commit('logout');
      this.$toasted.success('登出成功')
      this.$router.push({'path': '/'})
    }
  }
}
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
</style>
