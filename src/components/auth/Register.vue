<template>
  <div class="row">
    <div id="form" class="col-8 offset-2 col-md-4 offset-md-4">
      <p>
        為什麼需要註冊？<br>
        壹、保持多裝置間閱讀書籤的紀錄可以同步。<br>
        貳、針對每隻書蟲的閱讀習慣推薦相似的書籍。（未來功能）<br>
        <del>參、大家都有註冊，好像我們沒有也不行。</del>
      </p>
      <form>
        <div class="input-group mb-3">
          <input v-model="auth.account" class="form-control" type="text" placeholder="帳號"/>
          <div v-if="auth.account.length > 0" class="input-group-append">
            <button @click="auth.account = ''" class="btn btn-sm btn-light" type="button" tabindex="-1">
              <font-awesome-icon :icon="['far', 'times-circle']"/>
            </button>
          </div>
        </div>
        <div class="input-group mb-3">
          <input v-model="auth.password" class="form-control" type="password" placeholder="密碼"/>
          <div v-if="auth.password.length > 0" class="input-group-append">
            <button @click="auth.password = ''" class="btn btn-sm btn-light" type="button" tabindex="-1">
              <font-awesome-icon :icon="['far', 'times-circle']"/>
            </button>
          </div>
        </div>
        <div class="form-group row"  style="text-align: right;">
          <div class="col-6">
            <button @click="register()" :disabled="valid()" class="btn-sm btn-color-2" type="button">註冊</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

export default {
  name: 'register',
  data () {
    return {
      auth: {
        account: '',
        password: ''
      }
    }
  },
  mounted () {
    if (process.env.NODE_ENV !== 'development' && location.protocol != 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
  },
  methods: {
    valid: function () {
      return this.auth.account === "" || this.auth.password === "";
    },
    register: function () {
      (async () => {
        let res = await this.$axios({
          url: this.$backend + "/auth/register",
          method: "POST",
          data: qs.stringify(this.auth)
        });

        if (res.data.success === true) {
          this.$vuex.commit('login', res.data.data);
          this.$toasted.success('註冊成功');
          this.$router.push({ name: 'list'});
        } else if (res.data.fail === true) {
          // Fail
          if (res.data.data.reason === "account exists.") {
            this.$toasted.error('帳號已存在！');
          } else {
            this.$toasted.error('未知錯誤！');
            console.error(res.data)
          }
        }
      }) ();
    }
  }
}
</script>

<style scoped>
  #form {
    padding: 20px 20px 20px 20px;
    border-radius: .5em;
    background-color: rgba(255, 255, 255, 0.212);
  }
</style>