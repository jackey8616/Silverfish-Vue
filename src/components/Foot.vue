<template>
  <div>
    <small>
      本站所有圖文影來源皆為其他網站，<br class="d-md-none">且針對所有內容未進行任何儲存。<br>
      Version &nbsp;
      <a :href="'https://github.com/jackey8616/Silverfish-Vue/commit/' + last_update_master_hash" target="_blank">
        {{ last_update_master_hash.slice(0, 7) }}
      </a>
      &nbsp;updated&nbsp;@&nbsp;{{ last_update_master_time }}<br>
      Built&nbsp;@&nbsp;{{ last_deploy_time }}&nbsp;with&nbsp;
      <img class="no-size" src="https://api.travis-ci.com/jackey8616/Silverfish-Vue.svg?branch=master"/><br>
      Service Mail: <a href="mailto:service@silverfish.cc">service@silverfish.cc</a>
    </small>
  </div>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
      last_update_master_hash: "",
      last_update_master_time: "",
      last_deploy_time: "",
    }
  },
  mounted () {
    (async () => {
      let masterRes = await this.$axios({
        url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/master',
        method: 'GET'
      });
      let ghRes = await this.$axios({
        url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/gh-pages',
        method: 'GET'
      })
      this.last_update_master_hash = masterRes.data.sha
      this.last_update_master_time = this.formatDate(masterRes.data.commit.committer.date);
      this.last_deploy_time = this.formatDate(ghRes.data.commit.committer.date);
    })();
  },
  methods: {
    formatDate (dateStr) {
      let date = new Date(dateStr);
      let m = `0${date.getMonth() + 1}`.slice(-2);
      let d = `0${date.getDate()}`.slice(-2);
      let h = `0${date.getHours()}`.slice(-2);
      let M = `0${date.getMinutes()}`.slice(-2);
      let s = `0${date.getSeconds()}`.slice(-2);
      return `${date.getFullYear()}/${m}/${d} ${h}:${M}:${s}`;
    }
  }
}
</script>

<style scoped>
  div {
    color: rgba(255, 255, 255, 0.7);
    padding: 15px 0px;
    background-color: #383c3c;
    font-size: 13px;
    line-height: 14px;
  }
  img {
    margin-top: auto;
    margin-bottom: auto;
    height: 12px;
    width: 54px;
  }
  a {
    color: rgba(255, 255, 255, 0.5);
  }
  a:hover {
    color: rgba(255, 255, 255, 0.9)
  }
</style>
