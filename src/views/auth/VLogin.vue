<template>
  <div id="content" class="container" :style="{ 'min-height': `${withFootHeight}px` }">
    <div class="row">
      <div id="form" class="col-8 offset-2 col-md-4 offset-md-4">
        <form>
          <div class="input-group mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
            <input
              v-model="auth.account"
              class="form-control" type="text" placeholder="帳號" required
            />
            <div v-if="auth.account.length > 0" class="input-group-append">
              <button
                class="btn btn-light" type="button" tabindex="-1"
                @click="auth.account = ''"
              >
                <font-awesome-icon :icon="['far', 'times-circle']"/>
              </button>
            </div>
          </div>
          <div class="input-group mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
            <input
              v-model="auth.password"
              class="form-control" type="password" placeholder="密碼" required
            />
            <div v-if="auth.password.length > 0" class="input-group-append">
              <button
                class="btn btn-light" type="button" tabindex="-1"
                @click="auth.password = ''"
              >
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
            <div v-if="load === false">
              <div class="row justify-content-around">
                <div class="col-2" style="text-align: left;">
                  <input
                    class="btn-sm btn-color-2" type="button" value="登入"
                    @click="submitLogin()" :disabled="valid()"
                  />
                </div>
                <div class="col-8" title="保持連續一周的登入狀態">
                  <div class="form-check form-switch form-check-inline">
                    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                    <input
                      v-model="auth.keepLogin"
                      class="form-check-input" type="checkbox" id="keepLogin"
                    >
                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <small class="form-check-label" for="keepLogin">
                      保持登入?
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col align-self-end" style="text-align: right;">
                  <router-link :to="{ name: 'register' }" custom v-slot="{ navigate }">
                    <small @click="navigate" @keypress="navigate">註冊</small>
                  </router-link>
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, onMounted, reactive,
  ref,
} from 'vue';
import { VueRecaptcha } from 'vue-recaptcha';

import { useStore } from '@/store';

import authAPI from '@/api/auth';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default defineComponent({
  components: { VueRecaptcha },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { authLogin } = authAPI();
    const withFootHeight = inject('withFootHeight');
    const { redirect } = route.query;
    const session = store.getters['auth/getSession'];
    const load = ref(false);
    const auth = reactive({
      keepLogin: false,
      account: '',
      password: '',
    });
    const invisibleRecaptcha = ref<VueRecaptcha | null>(null);

    const valid = () => auth.account === '' || auth.password === '';
    const submitLogin = () => {
      load.value = true;
      (invisibleRecaptcha.value as VueRecaptcha).execute();
    };
    const onRecaptchaExpired = () => (invisibleRecaptcha.value as VueRecaptcha).reset();
    const onRecaptchaVerfiy = (recaptchaToken: string) => {
      authLogin(session, recaptchaToken, auth).then((data) => {
        store.dispatch('auth/login', data);
        toast('登入成功');
        router.push(redirect !== undefined
          ? { path: redirect as string } : { name: 'list' });
      }).catch((errData) => {
        if (errData.reason === 'Recaptcha verify failed') {
          toast.error('Google Recaptch 驗證失敗！');
        } else if (errData.reason === 'Account or Password wrong') {
          toast.error('帳號或密碼錯誤！');
        } else if (errData.reason === 'Account not exists') {
          toast.error('帳號不存在！');
        } else {
          toast.error('未知錯誤！');
          console.error(errData);
        }
        onRecaptchaExpired();
        load.value = false;
      });
    };

    onMounted(() => {
      if (process.env.NODE_ENV !== 'development' && window.location.protocol !== 'https:') {
        window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
      }
    });

    /* eslint-disable object-property-newline */
    return {
      withFootHeight, load, auth, invisibleRecaptcha,
      valid, submitLogin, onRecaptchaExpired, onRecaptchaVerfiy,
    };
    /* eslint-enable object-property-newline */
  },
});
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
