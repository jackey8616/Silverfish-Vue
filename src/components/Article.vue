<template>
  <div class="container">
    <button @click="fetchArticles">Fetch</button>
    <button @click="get">First</button>
    <div class="row">
      <div class="col-2">Current</div>
      <div v-html="current" class="col-10"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article",
  mounted() {
    this.fetchArticles();
    window.addEventListener('scroll', this.scrollEvent);
  },
  data() {
    return {
      targetURL: "http://www.77xsw.la/book/13192/",
      selected: {},
      articles: [],
      currentIndex: 0,
      current: "",
      loading: false
    };
  },
  methods: {
    get() {
      this.fetchArticle(this.currentIndex).then(data => this.current += data);
      this.fetchArticle(this.currentIndex++).then(data => this.current += data);
      this.fetchArticle(this.currentIndex++).then(data => this.current += data);
      this.fetchArticle(this.currentIndex++).then(data => this.current += data);
      this.fetchArticle(this.currentIndex++).then(data => this.current += data);
    },
    fetchArticles() {
      this.articles = []
      this.$axios({
        url: "http://127.0.0.1:8081/proxy",
        method: "POST",
        data: {
          'proxy_url': this.targetURL
        }
      }).then(res => {
        let rawHTML = res.data.Rtn;
        let matches = rawHTML.match(/<dd class="col-md-3"><a href=("|').*?.html("|') title=".*?">.*?<\/a><\/dd>/gm);
        let url = null, title = null;
        matches.forEach((each, index) => {
          url = each.substring(each.indexOf("href=") + 6, each.indexOf(" title=") - 1)
          title = each.substring(each.indexOf("title=") + 7, each.lastIndexOf("\">"))
          this.articles.push({
            "url": url,
            "title": title
          });
        })
        console.log("DONE");
      }).catch(err => {
        console.error(err);
      });
    },
    fetchArticle(index) {
      return this.$axios.all([
        this.$axios({method: "POST", url: "http://127.0.0.1:8081/proxy", data: {'proxy_url': 'http://www.77xsw.la/book/13192/' + this.articles[index].url}}),
        this.$axios({method: "POST", url: "http://127.0.0.1:8081/proxy", data: {'proxy_url': 'http://www.77xsw.la/book/13192/' + this.articles[index].url.replace(".html", "_2.html")}}),
      ]).then(res => {
        let article = "";
        res.forEach(each => {
          let rawHTML = each.data.Rtn;
          let rawNovel = rawHTML.match(/<div class="panel-body" id="htmlContent">[\s\S]*?<\/div>/g)[0]
          let novel = rawNovel.substring(41, rawNovel.lastIndexOf("</div>"))
          article += novel;  
        })
        return article
      })
    },
    scrollEvent(e) {
      if(this.loading) return;
      const D = document
      const docheight = Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
      )
      const winheight= window.innerHeight || (D.documentElement || D.body).clientHeight
      const scrollTop = window.pageYOffset || (D.documentElement || D.body.parentNode || D.body).scrollTop
      const trackLength = docheight - winheight
      const pctScrolled = Math.floor(scrollTop/trackLength * 100)
      
      if (pctScrolled >= 80) {
        this.loading = true;
        this.fetchArticle(this.currentIndex++).then(data => this.current += data);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    }
  }
};
</script>
