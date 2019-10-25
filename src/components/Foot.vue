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
import axios from 'axios';

export default {
  name: 'foot',
  data () {
    return {
      last_update_master_hash: "",
      last_update_master_time: "",
      last_deploy_time: "",
    }
  },
  async mounted () {
    let masterRes = await axios({
      url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/master',
      method: 'GET'
    });
    let ghRes = await axios({
      url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/gh-pages',
      method: 'GET'
    })
    this.last_update_master_hash = masterRes.data.sha
    this.last_update_master_time = this.$root.formatDate(masterRes.data.commit.committer.date, true);
    this.last_deploy_time = this.$root.formatDate(ghRes.data.commit.committer.date, true);
  },
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
