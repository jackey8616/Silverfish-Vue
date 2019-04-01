<template>
  <div>
    <div v-for="novel in novels" :key="novel.title">
      <router-link :to="{ name: 'article', params: { 'targetURL': novel.url, 'articles': novel.articles}}">
        <img :src="novel.cover_url"/><br />
        {{ novel.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { JSDOM } from 'jsdom';

export default {
  name: 'article-list',
  data() {
    return {
      urls: [
        "http://www.77xsw.la/book/13192/"
      ],
      novels: []
    }
  },
  mounted() {
    this.fetchArticles(this.urls[0]);
    for (let each of this.urls) {}
  },
  methods: {
    fetchArticles(targetURL) {
      let novel = {
        title: "",
        cover_url: "",
        url: "",
        articles: []
      };
      return this.$axios({
        url: this.$backend + "/proxy",
        method: "POST",
        data: {
          'proxy_url': targetURL
        }
      }).then(res => {
        const doc = new JSDOM(res.data.Rtn).window.document;
        let rawHTML = res.data.Rtn;
        novel['url'] = targetURL,
        novel['title'] = doc.querySelector("meta[property='og:title']").getAttribute("content");
        novel['cover_url'] = doc.querySelector("meta[property='og:image']").getAttribute("content");
        let chapters = doc.querySelectorAll("div#list-chapterAll > dl > dd > a");
        chapters.forEach(each => {
            novel['articles'].push({
              "title": each.getAttribute("title"),
              "url": each.getAttribute("href")
            });
        })
        this.novels.push(novel);
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>
