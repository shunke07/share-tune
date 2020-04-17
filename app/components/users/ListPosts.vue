<template>
  <ul>
    <li>posts</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPosts, PostData } from '~/repositories/firestore'

export default Vue.extend({
  async fetch() {
    const uid = this.$firebase.currentUser?.uid
    if (!uid) return

    const posts = await getUserPosts({ uid })
    if (posts) this.posts = posts
  },

  data() {
    return {
      posts: [] as PostData[]
    }
  }
})
</script>

<style lang="scss" scoped></style>
