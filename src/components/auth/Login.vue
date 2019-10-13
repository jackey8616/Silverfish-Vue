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
        <div class="form-group"  style="text-align: right;">
          <vue-recaptcha
              ref="invisibleRecaptcha"
              size="invisible"
              @verify="onRecaptchaVerfiy"
              @expired="onRecaptchaExpired"
              :loadRecaptchaScript="true"
              sitekey="6LdgzKYUAAAAAG8KH1AHc_Xjj7yVcAYXZFj7PsPH"/>
          <div v-if="load == false">
            <div class="row justify-content-around">
              <div class="col-2" style="text-align: left;">
                <input @click="submitLogin()" :disabled="valid()" class="btn-sm btn-color-2" type="button" value="登入"/>
              </div>
              <div class="col-8" title="保持連續一周的登入狀態">
                <small>保持登入?</small>
                <toggle-button v-model="auth.keepLogin" :width="38" :height="19" :marge="0"/>
              </div>
            </div>
            <div class="row">
              <div class="col align-self-end" style="text-align: right;">
                <router-link to="/register" tag="small">註冊</router-link>
                &nbsp;
                <small title="關我屁事">忘記密碼?</small>
              </div>
            </div>
          </div>
          <div v-else>
            <br>
            <center><loading :size="80"/></center>
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
      load: false,
      auth: {
        keepLogin: false,
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
      this.load = true;
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
          headers: {
            Authorization: this.$vuex.getters.getSession()
          },
          data: qs.stringify({...{"recaptchaToken": recaptchaToken}, ...this.auth})
        });

        if (res.data.success === true) {
          this.$vuex.commit('login', res.data.data);
          this.$toasted.success('登入成功');
          this.$router.push({ name: 'list'});
        } else if (res.data.fail === true) {
          // Fail
          if (res.data.data.reason === 'Recaptcha verify failed') {
            this.$toasted.error('Google Recaptch 驗證失敗！')
          } else if (res.data.data.reason === 'Account or Password wrong') {
            this.$toasted.error('帳號或密碼錯誤！');
          } else if (res.data.data.reason === 'Account not exists') {
            this.$toasted.error('帳號不存在！');
          } else {
            this.$toasted.error('未知錯誤！');
            console.error(res.data);
          }
          this.onRecaptchaExpired();
          this.load = false;
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
  label.vue-js-switch {
    margin-bottom: 0px;
  }
</style>
