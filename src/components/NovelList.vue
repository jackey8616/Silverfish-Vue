<template>
  <div class="container">
    <div v-if="novels.length !== 0" class="row">
      <div v-for="novel in novels" :key="novel.novelID" class="col-6 col-md-2">
        <router-link :to="{ path: '/novel/' + novel.novelID }">
          <img :src="novel.coverUrl"/><br />
          {{ novel.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { JSDOM } from 'jsdom';

export default {
  name: 'novel-list',
  data() {
    return {
      novels: []
    }
  },
  mounted() {
    this.$fetchNovels().then(novels => this.novels = novels)
  }
}
</script>

<style>
  img {
    height: 100%;
    width: 100%;
  }
</style>
