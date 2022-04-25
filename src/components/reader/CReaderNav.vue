<template>
  <div id="reader-nav" class="col-2 animated faster"
    :class="{'fadeIn': visible, 'fadeOut': !visible}"
    @mouseenter="enter" @focusin="enter" @mouseleave="leave" @focusout="leave"
  >
    <div class="reader-nav-buttons">
      <button class="sticky-bar-el btn btn-circle btn-sm"
        :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}" @click="go(-1)"
      >
        <font-awesome-icon icon="home"/>
      </button><br/>
      <router-link :to="{ path: `/info/${type}/${id}` }">
        <button class="sticky-bar-el btn btn-circle btn-sm"
          :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}"
        >
          <font-awesome-icon icon="info"/>
        </button>
      </router-link><br/>
      <div v-if="type == 'novel'">
        <button class="sticky-bar-el btn btn-circle btn-sm"
          :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}" @click="changeSimplified()"
        >
          {{ isTW ? "TW" : "CH" }}
        </button><br/>
        <button  class="sticky-bar-el btn-circle btn btn-sm"
          :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}" @click="changeLight()"
        >
          <font-awesome-icon v-if="lightOn" :icon="['fa', 'lightbulb']"/>
          <font-awesome-icon v-if="!lightOn" :icon="['far', 'lightbulb']"/>
        </button><br />
        <button class="sticky-bar-el btn btn-circle btn-sm"
         :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}" @click="changeFontSize()"
        >
          {{ ['Sm', 'Md', 'Lg', 'Xl'][fontSize - 1] }}
        </button><br />
      </div>
      <div>
        <input class="sticky-bar-el chapter-text form-control form-control-sm" maxlength="5"
          v-model="index" :class="{
            'bg-white': lightOn,
            'text-dark': lightOn,
            'bg-dark': !lightOn,
            'text-white': !lightOn,
          }"
        />
        <button class="sticky-bar-el btn btn-circle btn-sm"
          :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}"
          @click="changeIndex()" :disabled="chapterLength === 0"
        >
          <font-awesome-icon icon="arrow-right"/>
        </button><br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref, onMounted, watch, defineComponent,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: ['type', 'id', 'isTW', 'lightOn', 'fontSize', 'currentIndex', 'chapterLength'],
  setup(props, { emit }) {
    const router = useRouter();
    const visible = ref(false);
    const index = ref(0);

    onMounted(() => { index.value = props.currentIndex; });
    watch(() => props.currentIndex, (newValue) => { index.value = newValue; });
    const { go } = router;
    const enter = () => { visible.value = true; };
    const leave = () => { visible.value = false; };
    const changeSimplified = () => { emit('changeSimplified', !props.isTW); };
    const changeLight = () => { emit('changeLight', !props.lightOn); };
    const changeFontSize = () => { emit('changeFontSize', props.fontSize === 4 ? 1 : props.fontSize + 1); };
    const changeIndex = () => { emit('changeIndex', index.value); };

    /* eslint-disable object-property-newline */
    return {
      visible, index,
      go, enter, leave,
      changeSimplified, changeLight, changeFontSize, changeIndex,
    };
    /* eslint-enable object-property-newline */
  },
});
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
