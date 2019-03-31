<template>
  <div class="container">
    <div class="form-group">
      <label>URL</label>
      <input v-model="targetURL" class="form-control" />
    </div>
    <button @click="fetchArticles()" class="btn btn-md btn-primary">
      Fetch
    </button>
    <div>
      <table v-if="articles.length !== 0">
        <tbody>
          <tr v-for="(i, index) in parseInt(articles.length / 4)" :key="i">
            <td><a :href="articles[index * 4].url">{{ articles[index * 4].title }}</a></td>
            <td><a :href="articles[index * 4 + 1].url">{{ articles[index * 4 + 1].title }}</a></td>
            <td><a :href="articles[index * 4 + 2].url">{{ articles[index * 4 + 2].title }}</a></td>
            <td><a :href="articles[index * 4 + 3].url">{{ articles[index * 4 + 3].title }}</a></td>
          </tr>
          <tr>
            <td v-for="i in reverseList(articles.length % 4)" :key="i">
              <a :href="articles[articles.length - i - 1].url">
                {{ articles[articles.length - i - 1].title }}
              </a>
            </td>
          </tr>
        </tbody>
       </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "chapter",
  data() {
    return {
      targetURL: "",
      articles: []
    };
  },
  methods: {
    fetchArticles() {
      this.articles = []
      this.$axios({
        url: this.$backend + "/proxy",
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
      }).catch(err => {
        console.error(err);
      });
    },
    reverseList(value) {
      return [...Array(value).keys()].reverse()
    }
  }
};
</script>
