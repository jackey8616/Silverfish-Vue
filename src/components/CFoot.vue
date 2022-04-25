<template>
  <div id="foot">
    <small>
      本站所有圖文影來源皆為其他網站，<br class="d-md-none">且針對所有內容未進行任何儲存。<br>
      Version &nbsp;
      <a :href="`https://github.com/jackey8616/Silverfish-Vue/commit/${lastUpdateMasterHash}`" target="_blank">
        {{ lastUpdateMasterHash.slice(0, 7) }}
      </a><br>
      Updated&nbsp;@&nbsp;{{ lastUpdateMasterTime }}<br>
      Built&nbsp;@&nbsp;{{ lastDeployTime }}<br>
      Service Mail: <a href="mailto:service@silverfish.cc">service@silverfish.cc</a>
    </small>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import axios from 'axios';

import utils from '@/utils';

export default defineComponent({
  setup() {
    const { formatDate } = utils();
    const lastUpdateMasterHash = ref('');
    const lastUpdateMasterTime = ref('');
    const lastDeployTime = ref('');

    onMounted(async () => {
      const masterRes = await axios({
        url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/master',
        method: 'GET',
      });
      const ghRes = await axios({
        url: 'https://api.github.com/repos/jackey8616/Silverfish-Vue/deployments',
        method: 'GET',
      });
      lastUpdateMasterHash.value = masterRes.data.sha;
      lastUpdateMasterTime.value = formatDate(masterRes.data.commit.committer.date, true);
      lastDeployTime.value = formatDate(ghRes.data[0].created_at, true);
    });

    return { lastUpdateMasterHash, lastUpdateMasterTime, lastDeployTime };
  },
});
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
