<template>
  <nav id="navigator" class="navbar navbar-expand-lg navbar-dark">
    <router-link :to="{ name: 'home' }" class="navbar-brand">
      {{ brand == "false" ? "|" : "書蠹付梓 | 無縫閱讀" }}
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="navbar-collapse collapse row">
      <ul id="left-nav" class="navbar-nav col-8">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link">
            <font-awesome-icon icon="home" />首頁
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'list' }" class="nav-link">
            <font-awesome-icon icon="book-open" />列表
          </router-link>
        </li>
      </ul>
      <ul id="right-nav" class="navbar-nav col-4">
        <li class="nav-item">
          <div
            class="fb-like"
            data-href="https://www.facebook.com/silverfish.compose/"
            data-width
            data-layout="button_count"
            data-action="recommend"
            data-size="small"
            data-show-faces="false"
            data-share="true"
          ></div>
        </li>
        &nbsp;
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <font-awesome-icon icon="user" />
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <div v-if="$vuex.getters.isLogging() === true">
              <a class="dropdown-item" href="#">
                {{ $vuex.getters.getAuth().account }}
              </a>
              <router-link :to="{ name: 'userinfo' }" class="dropdown-item"
                >資訊</router-link
              >
              <div class="dropdown-divider"></div>
              <a @click="logout()" class="dropdown-item" href="#">登出</a>
            </div>
            <div v-else>
              <a class="dropdown-item" href="#">
                {{ $vuex.getters.getAuth().account }}
              </a>
              <router-link :to="{ name: 'register' }" class="dropdown-item"
                >註冊</router-link
              >
              <router-link :to="{ name: 'login' }" class="dropdown-item"
                >登入</router-link
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navigator",
  props: ["brand"],
  watch: {
    $route() {
      this.status(this.$vuex.getters.getSession());
    }
  },
  methods: {
    async status(sessionToken) {
      if (sessionToken === "") {
        return;
      }

      let statusData = await this.$api.authStatus(sessionToken);
      if (statusData == false) {
        this.$vuex.commit("logout");
        this.$toasted.show("Session過期，請重新登入");
      }
    },
    async logout() {
      await this.$api.authLogout(this.$vuex.getters.getSession());
      this.$vuex.commit("logout");
      this.$toasted.success("登出成功");
      this.$router.push({ path: "/" });
    }
  }
};
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
#right-nav .nav-item,
.nav-link {
  display: inline;
}
div.dropdown-menu {
  background-color: #222426;
}
.dropdown-item {
  color: rgba(255, 255, 255, 0.5);
}
.dropdown-item:hover,
.dropdown-item:focus {
  color: rgba(255, 255, 255, 0.75);
  background-color: #222426;
}
</style>
