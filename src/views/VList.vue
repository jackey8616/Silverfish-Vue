<template>
  <div id="content" :style="{ 'min-height': `${height}px` }">
    <div class="container">
      <h1>Novels</h1>
      <!--div style="display: flex; justify-content: center;"><loading :size="150"/></div-->
      <div v-if="novels.length !== 0" class="row">
        <card-carousel :list="novels"></card-carousel>
      </div>
      <div v-else>
        <center><loading :size="150"/></center>
      </div>
      <hr>
      <h1>Comics</h1>
      <div v-if="comics.length !== 0" class="row">
        <card-carousel :list="comics"></card-carousel>
      </div>
      <div v-else>
        <center><loading :size="150"/></center>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  inject, onMounted, reactive, defineComponent, ComputedRef,
} from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '@/store';
import { Novel, Comic } from '@/api/type';
import fetchAPI from '@/api/fetch';

import CardCarousel from '@/components/CCardCarousel.vue';

export default defineComponent({
  components: { CardCarousel },
  setup() {
    const route = useRoute();
    const store = useStore();
    const height = inject('height');
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    const fetchBookmark = inject<Function>('fetchBookmark')!;
    const session = inject<ComputedRef<string>>('session')!;
    const { fetchComics, fetchNovels } = fetchAPI();
    const novels = reactive<Array<Novel>>([]);
    const comics = reactive<Array<Comic>>([]);

    const fetchList = () => {
      fetchNovels(session.value).then((fetchedNovels) => {
        Object.assign(novels, fetchedNovels);
        novels.forEach((each) => store.commit('book/upsertNovel', each));
      });
      fetchComics(session.value).then((fetchedComics) => {
        Object.assign(comics, fetchedComics);
        comics.forEach((each) => store.commit('book/upsertComic', each));
      });
    };

    onMounted(() => {
      fetchList();
      fetchBookmark();
    });

    return { height, novels, comics };
  },
});
</script>

<style scoped>
  img {
    height: 100%;
    width: 100%;
  }
</style>
