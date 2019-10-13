<template>
  <div class="row">
    <div id="form" class="col-8 offset-2 col-md-4 offset-md-4">
      <b><big>為什麼需要註冊？</big></b>
      <p>
        壹、保持多裝置間閱讀書籤的紀錄可以同步。<br>
        貳、針對每隻書蟲的閱讀習慣推薦相似的書籍。<small>（未來功能）</small><br>
        <del>參、大家都有註冊，好像我們沒有也不行。</del>
      </p>
      <b><big>我的資料安全嗎？</big></b>
      <p>
        　　每個帳號的使用過程中，我們只會紀錄該帳號的註冊時間, 上次登錄時間及閱讀紀錄。<br>
        　　註冊時並不會收集除帳號密碼外的任何額外資料，未來規劃也只會使用閱讀紀錄來做分析使用者習慣。<br>
        　　如果您仍然有安全上的疑慮，可以使用簡單好記的帳號密碼申請即可。<br>
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
        <div class="form-group"  style="text-align: right;">
          <vue-recaptcha
            ref="invisibleRecaptcha"
            size="invisible"
            @verify="onRecaptchaVerfiy"
            @expired="onRecaptchaExpired"
            :loadRecaptchaScript="true"
            sitekey="6LdgzKYUAAAAAG8KH1AHc_Xjj7yVcAYXZFj7PsPH"></vue-recaptcha>
            <div class="row">
              <div class="col-10 offset-1">
                <div v-if="load == false" style="text-align: left;">
                  <input @click="submitRegister()" :disabled="valid()" class="btn-sm btn-color-2" type="button" value="註冊"/>
                </div>
                <div v-else>
                  <br>
                  <center><loading :size="80"/></center>
                </div>
              </div>
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
  name: 'register',
  components: { VueRecaptcha },
  data () {
    return {
      load: false,
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
    submitRegister: function () {
      this.load = true;
      this.$refs.invisibleRecaptcha.execute();
    },
    onRecaptchaExpired: function () {
      this.$refs.invisibleRecaptcha.reset();
    },
    onRecaptchaVerfiy: function (recaptchaToken) {
      (async () => {
        let res = await this.$axios({
          url: this.$backend + "/auth/register",
          method: "POST",
          data: qs.stringify({...{"recaptchaToken": recaptchaToken}, ...this.auth})
        });

        if (res.data.success === true) {
          this.$vuex.commit('login', res.data.data);
          this.$toasted.success('註冊成功');
          this.$router.push({ name: 'list'});
        } else if (res.data.fail === true) {
          // Fail
          if (res.data.data.reason === 'Recaptcha verify failed') {
            this.$toasted.error('Google Recaptch 驗證失敗！')
          } else if (res.data.data.reason === "account exists") {
            this.$toasted.error('帳號已存在！');
          } else {
            this.$toasted.error('未知錯誤！');
            console.error(res.data)
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
  p {
    font-size: 14px;
    text-align: left;
  }
</style>