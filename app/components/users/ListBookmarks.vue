<template>
  <ul v-if="bookmarks.length" class="list-bookmarks">
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
  <div v-else-if="!$fetchState.pending" class="no-contents">
    <svg-icon name="undraw/collection" title="ブックマークを追加しましょう" />
    <p>アルバムページからブックマークを作成して</p>
    <p>お気に入りの音楽をシェアしよう！</p>
  </div>
  <div v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import { Bookmark } from '~/types/firestore'
import { getBookmarks } from '~/repositories/firestore'
import { UserState } from '~/store/users'

export default Vue.extend({
  async fetch() {
    const storeBookmarks = (this.$store.state.users as UserState).bookmarks
    // if store state exists, use state
    if (storeBookmarks.length) {
      this.bookmarks = storeBookmarks
      return
    }
    // if store state empty, query API
    this.$store.commit('setIsLoading', true)

    const uid = this.$route.params.uid
    const bookmarks = await getBookmarks(uid)

    this.$store.commit('setIsLoading', false)
    if (!bookmarks) return

    this.bookmarks = bookmarks
    this.$store.commit('users/setBookmarks', bookmarks)
  },

  data() {
    return {
      bookmarks: [] as Bookmark[]
    }
  }
})
</script>

<style lang="scss" scoped>
.list-bookmarks {
  display: flex;
  flex-wrap: wrap;

  > .bookmark {
    margin: 0 0 24px 16px;
    width: calc(50% - 24px);

    > a {
      > .img {
        width: 100%;
        height: auto;
        border: 1px solid $boundaryBlack;
        border-radius: 8px;
      }

      > .title {
        @include strong;
        margin-top: -4px;
      }

      > .artist {
        color: $mono2;
      }
    }
  }
}

.no-contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 56px;

  > svg {
    margin-bottom: 24px;
  }

  > p {
    @include subhead;
  }
}
</style>
