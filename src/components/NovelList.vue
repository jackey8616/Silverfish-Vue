<template>
  <div class="container">
    <div class="row">
      <div v-for="novel in novels" :key="novel.title" class="col-6 col-md-2">
        <router-link :to="{ name: 'novel', params: { 'novelObj': novel }}">
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
      ],
      novels: []
    }
  },
  mounted() {
    for (let each of this.urls) {
      this.fetchArticles(each);
    }
  },
  methods: {
    fetchArticles(targetURL) {
      return this.$axios({
        url: this.$backend + "/proxy",
        method: "POST",
        data: {
          'proxy_url': targetURL
        }
      }).then(res => {
        const novel = res.data.Rtn;
        this.novels.push({
          url: novel.url,
          title: novel.title,
          cover_url: novel.coverUrl,
          articles: novel.chapters
        });
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
