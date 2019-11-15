<template>
  <div id="reader-nav" class="col-2 animated faster" :class="{'fadeIn': visible, 'fadeOut': !visible}" @mouseenter="enter" @mouseleave="leave">
    <div class="reader-nav-buttons">
      <button @click="$router.go(-1)" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
        <font-awesome-icon icon="home"/>
      </button><br/>
      <router-link :to="{ path: ('/info/' + type + '/' + id) }" tag="button" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
        <font-awesome-icon icon="info"/>
      </router-link><br/>
      <div v-if="type == 'novel'">
        <button @click="changeSimplified()" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
          {{ isTW ? "TW" : "CH" }}
        </button><br/>
        <button @click="changeLight()" class="sticky-bar-el btn-circle btn btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
          <font-awesome-icon v-if="lightOn" :icon="['fa', 'lightbulb']"/>
          <font-awesome-icon v-if="!lightOn" :icon="['far', 'lightbulb']"/>
        </button><br />
        <button @click="changeFontSize()" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
          {{ ['Sm', 'Md', 'Lg', 'Xl'][fontSize - 1] }}
        </button><br />
      </div>
      <div>
        <input v-model="index" class="sticky-bar-el chapter-text form-control form-control-sm" :class="{'bg-white': lightOn, 'text-dark': lightOn, 'bg-dark': !lightOn, 'text-white': !lightOn}" maxlength="5" />
        <button @click="changeIndex()" :disabled="chapterLength === 0" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
          <font-awesome-icon icon="arrow-right"/>
        </button><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reader-nav',
  props: [ "type", "id", 'isTW', 'lightOn', 'fontSize', 'currentIndex', 'chapterLength' ],
  data: () => ({
    visible: false,
    index: 0,
  }),
  mounted () {
    this.index = this.currentIndex;
  },
  watch: {
    'currentIndex'(val) {
      this.index = val;
    }
  },
  methods: {
    enter() {
      this.visible = true;
    },
    leave() {
      this.visible = false;
    },
    changeSimplified() {
      this.$emit('changeSimplified', !this.isTW);
    },
    changeLight() {
      this.$emit('changeLight', !this.lightOn);
    },
    changeFontSize() {
      this.$emit('changeFontSize', this.fontSize === 4 ? 1 : this.fontSize + 1);
    },
    changeIndex() {
      this.$emit('changeIndex', this.index);
    }
  },
}
</script>

<style scoped>
  #reader-nav {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    z-index: 1;
    text-align: right;
  }
  .reader-nav-buttons {
    margin: 0 0 0 auto;
    position: relative;
    top: 5vh;
    text-align: right;
    width: 60px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 10px;
  }
  .sticky-bar-el {
    margin-left: 0px;
    margin-top: 5px;
    width: 40px;
    height: 31px;
  }
  .sticky-bar-el.chapter-text {
    font-size: 10px;
    padding: 3px;
  }
  input.sticky-bar-el {
    text-align: center;
    line-height: 31px;
    height: 40px;
    border-radius: 20px;
  }
  .btn-circle {
    width: 40px;
    height: 40px;
    padding: 6px 0px;
    border-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    text-align: center;
    line-height: 1.42857;
  }
</style>
