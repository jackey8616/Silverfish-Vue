<template>
  <div id="content" :style="{ 'min-height': $root.$data.height + 'px' }">
    <div class="container">
      <h1>Novels</h1>
      <div v-if="novels.length !== 0" class="row">
        <div class="col-6 col-md-3">
          <list-card v-for="novel in novels.filter((item, index) => index % 4 == 0)" :key="novel.novelID" :entry="novel"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="novel in novels.filter((item, index) => index % 4 == 1)" :key="novel.novelID" :entry="novel"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="novel in novels.filter((item, index) => index % 4 == 2)" :key="novel.novelID" :entry="novel"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="novel in novels.filter((item, index) => index % 4 == 3)" :key="novel.novelID" :entry="novel"></list-card>
        </div>
      </div>
      <div v-else>
        <center><loading :size="150"/></center>
      </div>
      <hr>
      <h1>Comics</h1>
      <div v-if="comics.length !== 0" class="row">
        <div class="col-6 col-md-3">
          <list-card v-for="comic in comics.filter((item, index) => index % 4 == 0)" :key="comic.comicID" :entry="comic"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="comic in comics.filter((item, index) => index % 4 == 1)" :key="comic.comicID" :entry="comic"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="comic in comics.filter((item, index) => index % 4 == 2)" :key="comic.comicID" :entry="comic"></list-card>
        </div>
        <div class="col-6 col-md-3">
          <list-card v-for="comic in comics.filter((item, index) => index % 4 == 3)" :key="comic.comicID" :entry="comic"></list-card>
        </div>
      </div>
      <div v-else>
        <center><loading :size="150"/></center>
      </div>
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
  mounted () {
    this.fetchList();
    this.$root.fetchBookmark();
  },
  watch: {
    '$route' (to, from) {
      if (["home", "list"].includes(to.name) == false) {
        return;
      }
      this.fetchList();
      this.$root.fetchBookmark();
    }
  },
  methods: {
    fetchList () {
      this.$api.fetchNovels().then(novels => {
        this.novels = novels;
        this.novels.forEach((val, index, arr) => {
          this.$vuex.commit("upsertNovel", val);
        })
      });
      this.$api.fetchComics().then(comics => {
        this.comics = comics;
        this.comics.forEach((val, index, arr) => {
          this.$vuex.commit("upsertComic", val);
        })
      });
    },
  }
}
</script>

<style scoped>
  img {
    height: 100%;
    width: 100%;
  }
</style>
