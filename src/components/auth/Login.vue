<template>
  <div class="row">
    <div id="form" class="col-8 offset-2 col-md-4 offset-md-4">
      <form>
        <div class="input-group mb-3">
          <input v-model="auth.account" class="form-control" type="text" placeholder="帳號" required/>
          <div v-if="auth.account.length > 0" class="input-group-append">
            <button @click="auth.account = ''" class="btn btn-sm btn-light" type="button" tabindex="-1">
              <font-awesome-icon :icon="['far', 'times-circle']"/>
            </button>
          </div>
        </div>
        <div class="input-group mb-3">
          <input v-model="auth.password" class="form-control" type="password" placeholder="密碼" required/>
          <div v-if="auth.password.length > 0" class="input-group-append">
            <button @click="auth.password = ''" class="btn btn-sm btn-light" type="button" tabindex="-1">
              <font-awesome-icon :icon="['far', 'times-circle']"/>
            </button>
          </div>
        </div>
        <div class="form-group row"  style="text-align: right;">
          <div class="col-6">
            <vue-recaptcha
              ref="invisibleRecaptcha"
              size="invisible"
              @verify="onRecaptchaVerfiy"
              @expired="onRecaptchaExpired"
              :loadRecaptchaScript="true"
              sitekey="6LdgzKYUAAAAAG8KH1AHc_Xjj7yVcAYXZFj7PsPH"></vue-recaptcha>
            <button @click="submitLogin()" :disabled="valid()" class="btn-sm btn-color-2" type="button">登入</button>
          </div>
          <div class="col-6">
            <router-link to="/register" tag="small">註冊</router-link>
            &nbsp;
            <small title="關我屁事">忘記密碼?</small>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import qs from 'qs';

export default {
  name: 'login',
  components: { VueRecaptcha },
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
    submitLogin: function () {
      this.$refs.invisibleRecaptcha.execute();
    },
    onRecaptchaExpired: function () {
      this.$refs.invisibleRecaptcha.reset();
    },
    onRecaptchaVerfiy: function (recaptchaToken) {
      (async () => {
        let res = await this.$axios({
          url: this.$backend + "/auth/login",
          method: "POST",
          data: qs.stringify({...{"recaptchaToken": recaptchaToken}, ...this.auth})
        });

        if (res.data.success === true) {
          this.$vuex.commit('login', res.data.data);
          this.$toasted.success('登入成功');
          this.$router.push({ name: 'list'});
        } else if (res.data.fail === true) {
          // Fail
          if (res.data.data.reason === 'Account or Password wrong.') {
            this.$toasted.error('帳號或密碼錯誤！');
          } else if (res.data.data.reason === 'Account not exists.') {
            this.$toasted.error('帳號不存在！');
          } else {
            this.$toasted.error('未知錯誤！');
            console.error(res.data);
          }
          this.onRecaptchaExpired();
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
