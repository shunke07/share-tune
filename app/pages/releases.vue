<template>
  <div class="container">
    <nav class="leading">
      <button class="icon" @click="pushToMyPage()">
        <img v-if="!!userImageUrl" :src="userImageUrl" alt="マイページへ" />
        <img v-else src="~/assets/images/default-icon.png" alt="マイページへ" />
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

  computed: {
    userImageUrl(): string {
      const imageUrl: string = this.$store.state.loginUser?.image.url
      return imageUrl
    }
  },

  methods: {
    pushToMyPage(): void {
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
    position: fixed;
    top: 0;
    margin-left: 16px;
    height: 44px;
    z-index: 3;

    > .icon {
      width: 24px;
      height: 24px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 1px solid $boundaryBlack;
        border-radius: 50%;
      }
    }
  }
}
</style>
