<template>
  <ul v-if="posts.length" class="list-posts">
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
  <div v-else-if="!$fetchState.pending" class="no-contents">
    <svg-icon name="undraw/feedback" title="レビューを作成しましょう" />
    <p>アルバムページからレビューを作成して</p>
    <p>好きな音楽への想いをシェアしよう！</p>
  </div>
  <div v-else />
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
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  height: 100%;
  color: $mono1;

  &:hover::after {
    background: rgba($white, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba($white, 0);
    transition-duration: 0.05s;
  }

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    > time {
      @include caption;
      color: $mono2;
    }
  }

  > .contents {
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
      color: $mono2;
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
