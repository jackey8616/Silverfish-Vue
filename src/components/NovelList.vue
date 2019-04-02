<template>
  <div class="container">
    <div v-if="novels !== {}" class="row">
      <div v-for="(novel, novelID) in novels" :key="novelID" class="col-6 col-md-2">
        <router-link :to="{ path: '/novel/' + novelID, params: { 'novelObj': novel }}">
          <img :src="novel.cover_url"/><br />
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
      urls: [
        "http://www.77xsw.la/book/389/",
        "http://www.77xsw.la/book/11072/",
        "http://www.77xsw.la/book/11198/",
        "http://www.77xsw.la/book/13192/"
      ]
    }
  },
  computed: {
    novels() {
      return this.$vuex.state.Novels;
    }
  },
  mounted() {
    let vuxNovels = this.$vuex.state.Novels
    if (Object.keys(vuxNovels).length !== this.urls.length) {
      for (let each of this.urls) {
        this.fetchNovel(each);
      }
    } else {
      for(let novel in Object.values(vuxNovels)) {
        let delta = (new Date() - new Date(novel.lastCrawlTime)) / (1000 * 60 * 60 * 24);
        if (delta >= 1) {
          this.fetchNovel(novel.url);
        }
      };
    }
  },
  methods: {
    fetchNovel(targetURL) {
      return this.$axios({
        url: this.$backend + "/fetch_novel",
        method: "POST",
        data: {
          'novel_url': targetURL
        }
      }).then(res => {
        const novel = res.data.Rtn;
        return {
          novelID: novel.novelID,
          author: novel.author,
          description: novel.description,
          dns: novel.dns,
          url: novel.url,
          title: novel.title,
          cover_url: novel.coverUrl,
          articles: novel.chapters,
          lastCrawlTime: novel.lastCrawlTime
        };
      }).then(novel => {
        this.$vuex.commit('upsertNovel', {novelID: novel.novelID, novel: novel});
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>

<style>
  img {
    height: 100%;
    width: 100%;
  }
</style>
