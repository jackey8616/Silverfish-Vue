<template>
  <div id="content" class="container" :style="{ 'min-height': $root.$data.height + 'px' }">
    <div class="row">
      <div class="col-10 offset-1 col-md-6 offset-md-3">
        <div class="row">
          帳號<br>
          <div class="col-12 right">&nbsp;{{ account }}</div>
        </div>
        <div class="row">
          註冊時間<br>
          <div class="col-12 right">&nbsp;{{ $root.formatDate(registerDatetime) }}</div>
        </div>
        <div class="row">
          上次登入時間<br>
          <div class="col-12 right">
          &nbsp;{{ $root.formatDate(lastLoginDatetime)}}
          </div>
        </div>
        <div class="row">
          <label>書籤</label>&nbsp;
          <div class="col-12">
            <div class="row">
              <div class="col left">書名 / 作者</div>
              <div class="col-5 right">上次章節</div>
            </div>
            <div v-for="(val, key) in bookmark.novel" :key="key" class="row">
              <div class="col left">
                <div class="d-none d-md-block">
                  {{ val.info.title }}&nbsp;/&nbsp;{{ val.info.author }}
                </div>
                <div class="d-md-none">
                  <small>
                    {{ val.info.title }}<br>
                    <div class="right">{{ val.info.author }}&nbsp;/&nbsp;著</div>
                  </small>
                </div>
              </div>
              <div class="col-4 col-md-3 right center">
                <small>
                  {{ val.lastReadIndex }}&nbsp;
                  <router-link :to="{ path: ('/novel/' + val.info.novelID) }">
                    <font-awesome-icon icon="book-open"/>
                  </router-link>
                </small>
              </div>
            </div>
            <div v-for="(val, key) in bookmark.comic" :key="key" class="row">
              <div class="col left">
                <div class="d-none d-md-block">
                  {{ val.info.title }}&nbsp;/&nbsp;{{ val.info.author }}
                </div>
                <div class="d-md-none">
                  <small>
                    {{ val.info.title }}<br>
                    <div class="right">{{ val.info.author }}&nbsp;/&nbsp;著</div>
                  </small>
                </div>
              </div>
              <div class="col-4 col-md-3 right center">
                <small>
                  {{ val.lastReadIndex }}&nbsp;
                  <router-link :to="{ path: ('/comic/' + val.info.comicID) }">
                    <font-awesome-icon icon="book-open"/>
                  </router-link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data () {
    return {
      account: "guest",
      registerDatetime: "",
      lastLoginDatetime: "",
      bookmark: {
        novel: {},
        comic: {}
      }
    }
  },
  mounted () {
    let auth = this.$vuex.getters.getAuth();
    this.account = auth.account;
    this.registerDatetime = auth.registerDatetime;
    this.lastLoginDatetime = auth.lastLoginDatetime;
    for (let each in auth.bookmark.novel) {
      let data = this.$vuex.getters.getNovelByID(each);
      if (data !== undefined) {
        this.bookmark.novel[each] = auth.bookmark.novel[each];
        this.bookmark.novel[each]["info"] = data;
      } else {
        delete this.bookmark.novel[each];
      }
    }
    for (let each in auth.bookmark.comic) {
      let data = this.$vuex.getters.getComicByID(each);
      if (data !== undefined) {
        this.bookmark.comic[each] = auth.bookmark.comic[each];
        this.bookmark.comic[each]["info"] = data;
      } else {
        delete this.bookmark.comic[each];
      }
    }
  },
}
</script>

<style scoped>
  div.left {
    text-align: left;
  }
  div.right {
    text-align: right;
  }
  div.center {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>

