<template>
  <div>
    <navigator brand="false" />
    <div id="top">
      <div class="top-bg" />
      <div class="title-zone">
        <h1 class="title">書蠹付梓 | 無縫閱讀</h1>
        <div class="hr" />
        <div class="description">提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。</div>
      </div>
      <router-link :to="{ name: 'list' }" tag="button" class="scroll-zone">
      <!--button class="scroll-zone" v-scroll-to="'#intro'"-->
        開始閱讀<br>
        <!--font-awesome-icon icon="chevron-down" size="2x"/>
      </button-->
      </router-link>
    </div>
    <!--div id="intro" class="page">
      <div>
        <h3>書蠹</h3>
        <div>每個人都熱愛閱讀，就像蠹魚一般對待每一本書。</div>
      </div>
      <div>
        <h3>付梓</h3>
        <div>
          <p>古時雕版刻書以梓木為上，后因稱書籍刊印為「付梓」。</p>
          <p>為了更加美好的閱讀體驗，我們將每一本書籍進行無縫拼接，實現另外一種型式的「付梓」。</p>
        </div>
      </div>
    </div-->
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";

export default {
  name: 'index'
}
</script>

<style scoped>
  #top {
    height: 94.1vh;
  }
  .top-bg {
    background-image: url(/bg.jpg);
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
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), 60%, rgba(255, 255, 255, 0));
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
