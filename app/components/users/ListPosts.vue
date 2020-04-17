<template>
  <ul class="list-posts">
    <li v-for="(post, index) in posts" :key="`post-${index}`" class="post">
      <nuxt-link :to="`/albums/${post.album.id}/`" class="card">
        <div class="header">
          <time>{{ formatDate(post.createdAt.toDate()) }}</time>
        </div>
        <div class="contents">
          <div>
            <p class="title">
              {{ post.album.name }}
            </p>
            <p class="artist">
              {{ post.album.artist }}
            </p>
            <p class="comment">
              {{ post.comment }}
            </p>
          </div>
          <img
            class="img"
            :src="post.album.imageUrl"
            :alt="`${post.album.name}の画像`"
          />
        </div>
      </nuxt-link>
    </li>
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
  },

  methods: {
    formatDate(createdAt: string): string {
      return this.$dayjs(createdAt).fromNow()
    }
  }
})
</script>

<style lang="scss" scoped>
.list-posts {
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;

  > .post {
    width: calc(100% + 32px);
    height: 200px;
    margin: 0 -16px;
    border-bottom: 1px solid $boundaryBlack;
  }
}

.card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  height: 100%;
  color: $black;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    > time {
      @include caption;
      color: $gray;
    }
  }

  .contents {
    display: flex;
    justify-content: space-between;

    .comment {
      max-height: 80px;
      margin-right: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    .title {
      @include subhead;
      line-height: 1;
      margin: -4px 0 8px;
    }

    .artist {
      @include caption;
      color: $gray;
      line-height: 1;
      margin-bottom: 12px;
    }

    > .img {
      width: 96px;
      min-width: 96px;
      height: 96px;
      border: 1px solid $boundaryBlack;
      border-radius: 8px;
    }
  }
}
</style>
