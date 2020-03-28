<template>
  <div class="container">
    <ListReleases />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

import ListReleases from '~/components/releases/ListReleases.vue'

export default Vue.extend({
  components: {
    ListReleases
  },

  head(): MetaInfo {
    return {
      title: 'リリース'
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin-top: 56px;
}
</style>
