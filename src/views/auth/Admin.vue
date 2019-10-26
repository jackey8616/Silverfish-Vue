<template>
  <div id="content" class="container" :style="{ 'min-height': $root.$data.withFootHeight + 'px' }">
    <div class="row">
      <div class="col-8 offset-2 col-md-8 offset-md-2">
        <h5>Novels</h5>
        <div>
          <div v-for="each in fetchers.novels" :key="each">
            <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
          </div>
        </div>
        <form>
          <div class="input-group mb-3">
            <input v-model="addNovelUrl" class="form-control"/>
            <button @click="addNovel" :disabled="addNovelUrl == ''" class="btn-sm btn-color-1" type="button">
              <font-awesome-icon icon="arrow-circle-right"/>
            </button>
          </div>
        </form>
        <h5>Comics</h5>
        <div>
          <div v-for="each in fetchers.comics" :key="each">
            <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
          </div>
        </div>
        <form>
          <div class="input-group mb-3">
            <input v-model="addComicUrl" class="form-control"/>
            <button @click="addComic" :disabled="addComicUrl == ''" class="btn-sm btn-color-1" type="button">
              <font-awesome-icon icon="arrow-circle-right"/>
            </button>
          </div>
        </form>
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
      addNovelUrl: "",
      addComicUrl: "",
    }
  },
  mounted () {
    this.fetcherList();
  },
  methods: {
    fetcherList () {
      this.$api.adminFetcherList(this.$vuex.getters.getSession()).then(data => {
        console.log(data);
        this.fetchers = data.fetchers;
      });
    },
    addNovel () {
      if (this.addNovelUrl == "") {
        this.$toasted.error("Novel URL不得為空.")
        return;
      }
      this.$api.addNewNovel(this.$vuex.getters.getSession(), this.addNovelUrl).then(data => {
        this.$toasted.info("添加成功！");
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("添加失敗!");
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
        console.log(data);
      }).catch(errData => {
        this.$toasted.error("添加失敗!");
        console.error(errData)
      });
    },
  }
}
</script>
