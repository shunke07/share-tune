<template>
  <ul class="list-favorites">
    <li
      v-for="(bookmark, index) in bookmarks"
      :key="`bookmark-${index}`"
      class="bookmark"
    >
      <nuxt-link :to="`/albums/${bookmark.album.id}/`">
        <img
          class="img"
          :src="bookmark.album.imageUrl"
          :alt="`${bookmark.album.name}の画像`"
        />
        <p class="title">
          {{ bookmark.album.name }}
        </p>
        <p class="artist">
          {{ bookmark.album.artist }}
        </p>
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Bookmark } from '~/types/firestore'
import { getBookmarks } from '~/repositories/firestore'

export default Vue.extend({
  async fetch() {
    this.$store.commit('setIsLoading', true)

    const uid = this.$route.params.uid
    const bookmarks = await getBookmarks(uid)

    this.$store.commit('setIsLoading', false)
    if (bookmarks) this.bookmarks = bookmarks
  },

  data() {
    return {
      bookmarks: [] as Bookmark[]
    }
  }
})
</script>

<style lang="scss" scoped>
.list-favorites {
  display: flex;
  flex-wrap: wrap;

  > .bookmark {
    margin: 0 0 16px 16px;
    width: calc(50% - 24px);

    > a {
      > .img {
        width: 100%;
        border: 1px solid $boundaryBlack;
        border-radius: 8px;
      }

      > .title {
        margin-top: -4px;
      }

      > .artist {
        line-height: 1;
        color: $gray;
      }
    }
  }
}
</style>
