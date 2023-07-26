<template>
  <div class="carousel" @scroll="scrolling">
    <div class="inner" ref="innerEl" :style="innerStyles">
      <div class="card col-6 col-md-2 col-sm-1" v-for="card in cards" :key="card">
        <div style="width: 100%; height: 100%;">
          <list-card
            :entry="card"
          />
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" tabindex=0 @click="prev" @keydown="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" tabindex=0 @click="next" @keydown="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRef,
  watch,
} from 'vue';

import ListCard from './list/CListCard.vue';

export default defineComponent({
  props: ['list'],
  components: { ListCard },
  setup(props) {
    const innerEl = ref<HTMLElement | null>(null);
    const cards = toRef(props, 'list');
    const innerStyles = ref({});
    const step = ref('0px');
    const transitioning = ref<boolean>(false);

    const setStep = () => {
      const innerWidth = (innerEl.value as HTMLElement).scrollWidth;
      const totalCards = cards.value.length;
      step.value = `${innerWidth / totalCards}px`;
    };

    const moveLeft = () => {
      innerStyles.value = {
        transform: `translateX(-${step.value})
                    translateX(-${step.value})`,
      };
    };

    const moveRight = () => {
      innerStyles.value = {
        transform: `translateX(${step.value})
                    translateX(-${step.value})`,
      };
    };

    const afterTransition = (callback: any) => {
      const listener = () => {
        callback();
        (innerEl.value as HTMLElement).removeEventListener('transitionend', listener);
      };
      (innerEl.value as HTMLElement).addEventListener('transitionend', listener);
    };

    const resetTranslate = () => {
      innerStyles.value = {
        transition: 'none',
        transform: `translateX(-${step.value})`,
      };
    };

    const next = () => {
      if (transitioning.value) return;

      transitioning.value = true;

      moveLeft();

      afterTransition(() => {
        console.log(11);
        const card = cards.value.shift();
        cards.value.push(card!);
        resetTranslate();
        transitioning.value = false;
      });
    };

    const prev = () => {
      if (transitioning.value) return;

      transitioning.value = true;

      moveRight();

      afterTransition(() => {
        const card = cards.value.pop();
        cards.value.unshift(card!);
        resetTranslate();
        transitioning.value = false;
      });
    };

    const scrolling = (e: any) => {
      const { clientHeight, scrollHeight, scrollTop } = e.target;

      // if (scrollTop + clientHeight >= scrollHeight) {
      console.log('Yay!');
      // }
    };

    onMounted(() => {
      setStep();
      resetTranslate();
    });

    return {
      cards,
      innerEl,
      innerStyles,
      next,
      prev,
      scrolling,
    };
  },
});
</script>

<style scoped>
  .carousel {
    overflow: hidden;
  }
  .inner {
    white-space: nowrap;
    transition: transform 0.2s;
  }
  .card {
    /* width: 40px; */
    margin-right: 10px;
    display: inline-flex;

    /* optional */
    /* height: 40px; */
    background-color: #2c3e50;
    /* color: white; */
    border-radius: 4px;
    align-items: center;
    justify-content: center;
  }
  .carousel-control-next, .carousel-control-prev {
    width: 5%;
  }
</style>
