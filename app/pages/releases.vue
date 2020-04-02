<template>
  <div class="container">
    <nav class="leading">
      <button class="icon" @click="pushToMyPage()">
        <svg-icon name="person" title="my-page" />
      </button>
    </nav>
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

  methods: {
    pushToMyPage() {
      const uid = this.$firebase.currentUser?.uid
      if (!uid) return

      this.$router.push(`/users/${uid}/`)
    }
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

  > .leading {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 16px;
    height: 44px;
    z-index: 3;

    > .icon {
      width: 24px;
      height: 24px;

      > svg {
        width: 100%;
        height: 100%;
        color: $gray;
      }
    }
  }
}
</style>
