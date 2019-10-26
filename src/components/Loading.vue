<template>
  <div :style="{ width: size + 'px', height: size + 'px' }">
    <div
      style="width:100%;height:100%"
      :style="{
        width: size + 'px !important',
        height: size + 'px !important',
        '-webkit-transform':
          'translate(-' +
          size +
          'px, -' +
          size +
          'px) scale(1) translate(' +
          size +
          'px, ' +
          size +
          'px)',
        transform:
          'translate(-' +
          size +
          'px, -' +
          size +
          'px) scale(1) translate(' +
          size +
          'px, ' +
          size +
          'px)'
      }"
      class="lds-eclipse"
    >
      <div
        :style="{
          'box-shadow': '0 ' + 2 * scale + 'px 0 0 #0089d0',
          top: 10 * scale + 'px',
          left: 10 * scale + 'px',
          width: 80 * scale + 'px',
          height: 80 * scale + 'px',
          '-webkit-transform-origin': 40 * scale + 'px ' + 41 * scale + 'px',
          'transform-origin': 40 * scale + 'px ' + 41 * scale + 'px'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: ["size"],
  data() {
    return {
      scale: 1.0
    };
  },
  mounted() {
    this.scale = this.size / 100;
  }
};
</script>

<style scoped>
@keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.lds-eclipse {
  position: relative;
}
.lds-eclipse div {
  position: absolute;
  -webkit-animation: lds-eclipse 1s linear infinite;
  animation: lds-eclipse 1s linear infinite;
  width: 80px;
  height: 80px;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 0 0 #0089d0;
  -webkit-transform-origin: 40px 41px;
  transform-origin: 40px 41px;
}
.lds-eclipse {
  width: 100px;
  height: 100px;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
</style>
