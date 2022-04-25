<template>
  <div id="content" class="container" :style="{ 'min-height': `${withFootHeight}px` }">
    <div class="row">
      <div id="form" class="col-8 offset-2 col-md-6 offset-md-3">
        <b><big>為什麼需要註冊？</big></b>
        <ul>
          <li>壹、保持多裝置間閱讀書籤的紀錄可以同步。</li>
          <li>貳、針對每隻書蟲的閱讀習慣推薦相似的書籍。<small>（未來功能）</small></li>
          <li><del>參、大家都有註冊，好像我們沒有也不行。</del></li>
        </ul>
        <b><big>我的資料安全嗎？</big></b>
        <p>每個帳號的使用過程中，我們只會紀錄該帳號的註冊時間, 上次登錄時間及閱讀紀錄。</p>
        <p>註冊時並不會收集除帳號密碼外的任何額外資料，未來規劃也只會使用閱讀紀錄來做分析使用者習慣。</p>
        <p>如果您仍然有安全上的疑慮，可以使用簡單好記的帳號密碼申請即可。</p>
        <form>
          <div class="input-group mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
            <input v-model="auth.account" class="form-control" type="text" placeholder="帳號"/>
            <div v-if="auth.account.length > 0" class="input-group-append">
              <button
                @click="auth.account = ''"
                class="btn btn-sm btn-light" type="button" tabindex="-1"
              >
                <font-awesome-icon :icon="['far', 'times-circle']"/>
              </button>
            </div>
          </div>
          <div class="input-group mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
            <input
              v-model="auth.password"
              class="form-control" type="password" placeholder="密碼"
            />
            <div v-if="auth.password.length > 0" class="input-group-append">
              <button
                @click="auth.password = ''"
                class="btn btn-sm btn-light" type="button" tabindex="-1"
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
              sitekey="6LdgzKYUAAAAAG8KH1AHc_Xjj7yVcAYXZFj7PsPH"></vue-recaptcha>
              <div class="row">
                <div class="col-10 offset-1">
                  <div v-if="load == false" style="text-align: left;">
                    <input
                      @click="submitRegister()" :disabled="valid()"
                      class="btn-sm btn-color-2" type="button" value="註冊"
                    />
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, onMounted, reactive,
  ref,
} from 'vue';
import { VueRecaptcha } from 'vue-recaptcha';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';

import authAPI from '@/api/auth';
import { useToast } from 'vue-toastification';

export default defineComponent({
  components: { VueRecaptcha },
  setup() {
    const router = useRouter();
    const store = useStore();
    const toast = useToast();
    const { authRegister } = authAPI();
    const withFootHeight = inject('withFootHeight');
    const load = ref(false);
    const auth = reactive({
      account: '',
      password: '',
    });
    const invisibleRecaptcha = ref<VueRecaptcha | null>(null);

    const valid = () => auth.account === '' || auth.password === '';
    const submitRegister = () => {
      load.value = true;
      (invisibleRecaptcha.value as VueRecaptcha).execute();
    };
    const onRecaptchaExpired = () => (invisibleRecaptcha.value as VueRecaptcha).reset();
    const onRecaptchaVerfiy = (recaptchaToken: string) => {
      authRegister(recaptchaToken, auth).then((data) => {
        store.dispatch('auth/login', data);
        toast('註冊成功');
        router.push({ name: 'list' });
      }).catch((errData) => {
        if (errData.reason === 'Recaptcha verify failed') {
          toast.error('Google Recaptch 驗證失敗！');
        } else if (errData.reason === 'account exists') {
          toast.error('帳號已存在！');
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
      withFootHeight, load, auth,
      valid, submitRegister, onRecaptchaExpired, onRecaptchaVerfiy,
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
  ul {
    padding: 0;
    list-style-type: none;
    text-align: left;
    font-size: 14px;
  }
  p {
    font-size: 14px;
    text-align: left;
    text-indent: 10px;
  }
</style>
