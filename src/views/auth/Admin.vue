<template>
  <div id="content" class="container" :style="{ 'min-height': $root.$data.withFootHeight + 'px' }">
    <div class="row">
      <div class="col-8 offset-2 col-md-8 offset-md-2">
        <h5>Novels</h5>
        <div class="row">
          <div class="col col-4">
            <div v-for="each in fetchers.novels" :key="each">
              <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input v-model="addNovelUrl" class="form-control"/>
              <button @click="addNovel" :disabled="addNovelUrl == ''" class="btn-sm btn-color-1" type="button">
                <font-awesome-icon icon="arrow-circle-right"/> Add
              </button>
            </div>
            <div class="input-group mb-3">
              <select class="form-control" v-model="deleteNovelID">
                <option v-for="novel in novels" :key="novel.novelID" :value="novel.novelID">
                  {{ `${novel.novelID} / ${novel.title} / ${novel.author}` }}
                </option>
              </select>
              <button @click="deleteNovel" :disabled="deleteNovelID == ''" class="btn-sm btn-color-1" type="button">
                <font-awesome-icon icon="arrow-circle-right"/> Delete
              </button>
            </div>
          </div>
        </div>
        <h5>Comics</h5>
        <div class="row">
          <div class="col col-4">
            <div v-for="each in fetchers.comics" :key="each">
              <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input v-model="addComicUrl" class="form-control"/>
              <button @click="addComic" :disabled="addComicUrl == ''" class="btn-sm btn-color-1" type="button">
                <font-awesome-icon icon="arrow-circle-right"/> Add
              </button>
            </div>
            <div class="input-group mb-3">
              <select class="form-control" v-model="deleteComicID">
                <option v-for="comic in comics" :key="comic.comicID" :value="comic.comicID">
                  {{ `${comic.comicID} / ${comic.title} / ${comic.author}` }}
                </option>
              </select>
              <button @click="deleteComic" :disabled="deleteComicID == ''" class="btn-sm btn-color-1" type="button">
                <font-awesome-icon icon="arrow-circle-right"/> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'admin',
  data () {
    return {
      fetchers: {},
      comics: [],
      novels: [],
      addNovelUrl: "",
      deleteNovelID: "",
      addComicUrl: "",
      deleteComicID: "",
    }
  },
  mounted () {
    this.fetcherList();
  },
  methods: {
    async fetcherList () {
      this.$api.adminFetcherList(this.$vuex.getters.getSession()).then(data => {
        this.fetchers = data.fetchers;
      });
      this.novels = await this.$api.fetchNovels(this.$vuex.getters.getSession());
      this.comics = await this.$api.fetchComics(this.$vuex.getters.getSession());
    },
    addNovel () {
      if (this.addNovelUrl == "") {
        this.$toasted.error("Novel URL不得為空.")
        return;
      }
      this.$api.addNewNovel(this.$vuex.getters.getSession(), this.addNovelUrl).then(data => {
        this.$toasted.info("添加成功！");
        this.fetcherList();
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("添加失敗!");
        console.error(errData)
      });
    },
    deleteNovel () {
      if (this.deleteNovelID == "") {
        this.$toasted.error("Novel ID.")
        return;
      }
      this.$api.deleteNovelByID(this.$vuex.getters.getSession(), this.deleteNovelID).then(data => {
        this.$toasted.info("刪除成功！");
        this.fetcherList();
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("刪除失敗!");
        console.error(errData)
      });
    },
    addComic () {
      if (this.addComicUrl == "") {
        this.$toasted.error("Comic URL不得為空.")
        return;
      }
      this.$api.addNewComic(this.$vuex.getters.getSession(), this.addComicUrl).then(data => {
        this.$toasted.info("添加成功！");
        this.fetcherList();
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("添加失敗!");
        console.error(errData)
      });
    },
    deleteComic () {
      if (this.deleteComicID == "") {
        this.$toasted.error("Comic ID.")
        return;
      }
      this.$api.deleteComicByID(this.$vuex.getters.getSession(), this.deleteComicID).then(data => {
        this.$toasted.info("刪除成功！");
        this.fetcherList();
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("刪除失敗!");
        console.error(errData)
      });
    },
  }
}
</script>
