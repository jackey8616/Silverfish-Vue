<template>
  <div id="top" :style="{ height: `${height}px` }">
    <div class="top-bg" />
    <div class="title-zone">
      <h1 class="title">書蠹付梓 | 無縫閱讀</h1>
      <div class="hr" />
      <div class="description">提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。</div>
    </div>
    <router-link :to="{ name: 'list' }" custom v-slot="{ navigate }">
      <button class="scroll-zone" @click="navigate">
        開始閱讀<br>
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const height = inject('height');

    return { height };
  },
});
</script>

<style scoped>
  #top > div.top-bg {
    background-image: url(@/assets/bg.jpg);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;

    filter: blur(0.8px) brightness(0.5);
    -webkit-filter: blur(0.8px) brightness(0.5);
  }
  #top > *:not(.top-bg) {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
  }
  #top > div.title-zone {
    width: 60%;
    text-align: left;
    left: 10%;
    top: 55%;
  }
  #top > div.title-zone > h1.title {
    font-weight: 600;
  }
  #top > div.title-zone > div.hr {
    height: 2px;
    width: 100%;
    background-image: linear-gradient(
      to right, rgba(255, 255, 255, 1), 60%, rgba(255, 255, 255, 0));
  }
  #top > div.title-zone > div.description {
    text-align: right;
  }
  #top > button.scroll-zone {
    height: 10vh;
    top: 90vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #FFFFFF;
    border: 0;
  }
  #top > button.scroll-zone > svg {
    margin-top: 15px;
  }
  /*
  .page {
    height: 100vh;
  }
  #intro > div {
    text-align: left;
  }
  */
</style>
