<template>
  <div class="container">
    <h1>Novels</h1>
    <div v-if="novels.length !== 0" class="row">
      <div v-for="novel in novels" :key="novel.novelID" class="col-6 col-md-2">
        <router-link :to="{ path: '/novel/' + novel.novelID }">
          <img :src="novel.coverUrl"/><br />
          {{ novel.title }}
        </router-link>
      </div>
    </div>
    <hr>
    <h1>Comics</h1>
    <div v-if="comics.length !== 0" class="row">
      <div v-for="comic in comics" :key="comic.comicID" class="col-6, col-md-2">
        <router-link :to="{ path: '/comic/' + comic.comicID }">
          <img :src="comic.coverUrl"/><br />
          {{ comic.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'novel-list',
  data() {
    return {
      novels: [],
      comics: []
    }
  },
  mounted() {
    this.$fetchNovels().then(novels => this.novels = novels)
    this.$fetchComics().then(comics => this.comics = comics)
  }
}
</script>

<style>
  img {
    height: 100%;
    width: 100%;
  }
</style>
