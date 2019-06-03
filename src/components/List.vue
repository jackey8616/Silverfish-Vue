<template>
  <div class="container">
    <h1>Novels</h1>
    <div v-if="novels.length !== 0" class="row">
      <list-card v-for="novel in novels" :key="novel.novelID" :entry="novel"></list-card>
    </div>
    <hr>
    <h1>Comics</h1>
    <div v-if="comics.length !== 0" class="row">
      <list-card v-for="comic in comics" :key="comic.comicID" :entry="comic"></list-card>
    </div>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'

export default {
  name: 'novel-list',
  components: { ListCard },
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
