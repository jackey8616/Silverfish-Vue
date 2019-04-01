<template>
  <div id="article" class="container" :class="{'light-on': lightOn,'light-off': !lightOn}">
    <div class="row">
      <aside class="col-2 col-md-1">
        <affix class="sidebar-menu" relative-element-selector="#novel" align="left">
          <button @click="isTW = !isTW" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            {{ isTW ? "TW" : "CH" }}
          </button><br/>
          <button @click="lightOn = !lightOn" class="sticky-bar-el btn-circle btn btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            <i class="fa-lightbulb" :class="{'fa': lightOn, 'far': !lightOn}"></i>
          </button><br />
          <button @click="fontSize = fontSize === 4 ? 1 : fontSize + 1" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            {{ ['Sm', 'Md', 'Lg', 'Xl'][fontSize - 1] }}
          </button><br />
          <input v-model="currentIndex" class="sticky-bar-el chapter-text form-control form-control-sm" :class="{'bg-white': lightOn, 'text-dark': lightOn, 'bg-dark': !lightOn, 'text-white': !lightOn}" maxlength="5" />
          <button @click="get" :disabled="articles.length === 0" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            <i class="fas fa-arrow-right"></i>
          </button><br />
        </affix>
      </aside>
      <div class="col-10 col-md-10">
        <div id="novel" :class="{'novel-font-sm': fontSize === 1, 'novel-font-md': fontSize === 2, 'novel-font-lg': fontSize === 3, 'novel-font-xl': fontSize === 4}">
          <chapter-section v-for="each in sections" :key="each.index" :isTW="isTW" :single="each" v-observe-visibility="{
            callback: (isVisible, entry) => observe(isVisible, entry, each),
            throttle: 300,
            }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Affix } from 'vue-affix';
import ChapterSection from '@/components/ChapterSection';

export default {
  name: "article",
  components: { Affix, ChapterSection },
  mounted() {
    (async() => {
      await this.fetchArticles();
      this.store = this.$store.read();
      this.currentIndex = this.store.lastReadIndex || this.currentIndex;
      this.fetchIndex = this.currentIndex === 0 ? 0 : this.currentIndex - 1;
      await this.fetchArticle(this.fetchIndex++).then(data => this.sections.push(data));
      await this.fetchArticle(this.fetchIndex++).then(data => this.sections.push(data));
    })();
  },
  data() {
    return {
      store: {},
      isTW: true,
      lightOn: false,
      fontSize: 1,
      loading: false,
      targetURL: "http://www.77xsw.la/book/13192/",
      sections: [],
      articles: [],
      fetchIndex: 0,
      currentIndex: 0,
      transitIndex: 0
    };
  },
  methods: {
    get() {
      (async() => {
        this.sections = [];
        this.fetchIndex = this.currentIndex - 1;
        this.transitIndex = this.currentIndex - 1;
        await this.fetchArticle(this.fetchIndex++).then(data => this.sections.push(data));
        await this.fetchArticle(this.fetchIndex++).then(data => this.sections.push(data));
      })();
    },
    fetchArticles() {
      this.articles = []
      return this.$axios({
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
    fetchArticle(index) {
      return this.$axios.all([
        this.$axios({method: "POST", url: this.$backend + "/proxy", data: {'proxy_url': this.targetURL + this.articles[index].url}}),
        this.$axios({method: "POST", url: this.$backend + "/proxy", data: {'proxy_url': this.targetURL + this.articles[index].url.replace(".html", "_2.html")}}),
      ]).then(res => {
        let section = {
          index: index,
          title: this.articles[index].title,
          content: ""
        };
        let novel = "";
        res.forEach(each => {
          let rawHTML = each.data.Rtn
          rawHTML = rawHTML.replace("一秒记住【千千小说网 www.77xsw.la】，更新快，无弹窗，免费读！<br><br>", "");
          rawHTML = rawHTML.replace("-->><p class=\"text-danger text-center mg0\">本章未完，点击下一页继续阅读</p>", "")
          let rawNovel = rawHTML.match(/<div class="panel-body" id="htmlContent">[\s\S]*?<\/div>/g)[0]
          novel += rawNovel.substring(41, rawNovel.lastIndexOf("</div>"))

        })
        section.content = novel + "<br><br>";
        return section;
      })
    },
    observe(isVisible, entry, section) {
      if (isVisible) {
        if (this.transitIndex < section.index) {
          this.currentIndex = section.index + 1;
          this.transitIndex = section.index;
          this.store.lastReadIndex = this.currentIndex;
          this.$store.save(this.store);
          if (!this.loading && this.fetchIndex - this.currentIndex < 1) {
            this.loading = true;
            this.fetchArticle(this.fetchIndex++).then(data => this.sections.push(data));
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
  .container.light-on {
    background-color: white;
    color:  #2c3e50;
  }
  .container.light-off {
    color: #d3d3d3;
  }
  .sticky-bar-el {
    margin-left: 0px;
    margin-top: 5px;
    width: 40px;
    height: 31px;
  }
  .sticky-bar-el.chapter-text {
    font-size: 10px;
    padding: 3px;
  }
  input.sticky-bar-el {
    text-align: center;
    line-height: 31px;
    height: 40px;
    border-radius: 20px;
  }
  .novel-font-sm {
    font-size: 1rem;
  }
  .novel-font-md {
    font-size: 1.125rem;
  }
  .novel-font-lg {
    font-size: 1.25rem;
  }
  .novel-font-xl {
    font-size: 1.5rem;
  }
  .btn-circle {
    width: 40px;
    height: 40px;
    padding: 6px 0px;
    border-radius: 20px;
    text-align: center;
    line-height: 1.42857;
  }
</style>
