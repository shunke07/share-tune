<template>
  <article v-if="album" class="article-album">
    <div class="top-contents">
      <img
        class="img"
        :src="album.images[1].url"
        :alt="`${album.name}の画像`"
      />
      <div class="text">
        <div>
          <h1 class="title">
            {{ album.name }}
          </h1>
          <p>
            {{ album.artists[0].name }}
          </p>
          <p class="caption">
            {{ album.album_type }}・{{ album.release_date.slice(0, 4) }}
          </p>
        </div>
        <a
          :href="album.external_urls.spotify"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          Spotifyでチェックする
        </a>
      </div>
    </div>
    <section class="track-list">
      <h1 class="heading">
        トラックリスト
      </h1>
      <ul>
        <li v-for="track in album.tracks.items" :key="track.track_number">
          <p>
            <span class="number">{{ track.track_number }}</span>
            {{ track.name }}
          </p>
        </li>
      </ul>
    </section>
    <p class="date">
      <time>リリース: {{ releaseDate }}</time>
    </p>
    <!-- Floating Action Button -->
    <div class="fab-container">
      <div class="fabs">
        <div>
          <button class="fab bookmark" @click="bookmark()">
            <svg-icon
              :name="`actions/${bookmarkIcon}`"
              title="ブックマークする"
              :class="{ '-active': isBookmarked }"
            />
          </button>
          <button class="fab create" @click="switchFormVisible(true)">
            <svg-icon name="actions/create" title="投稿する" />
          </button>
        </div>
      </div>
    </div>
    <!-- full page modal form -->
    <FormPost
      v-show="isFormVisible"
      @onClickClose="switchFormVisible(false)"
      @onSubmit="_createPost($event)"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

import { MetaInfo } from 'vue-meta'
import { Album } from '~/types/spotify-api.d.ts'

import FormPost from '~/components/albums/FormPost.vue'

import {
  createBookmark,
  deleteBookmark,
  getIsBookmarked,
  createPost,
  Payload
} from '~/repositories/firestore'

type Response = void | { data: Album }

export default Vue.extend({
  components: {
    FormPost
  },

  data() {
    return {
      album: null as Readonly<Album> | null,
      albumId: this.$route.params.albumId as string,
      isBookmarked: false as boolean,
      isFormVisible: false as boolean
    }
  },

  computed: {
    uid(): string | undefined {
      return this.$firebase.currentUser?.uid
    },

    releaseDate(): string {
      if (this.album === null) return ''

      return this.$dayjs(this.album.release_date).format('YYYY年MM月DD日')
    },

    title(): string {
      if (this.album === null) return ''

      const albumName = this.album.name ?? ''
      const albumArtist = this.album.artists[0].name ?? ''
      return `${albumArtist}の${albumName}`
    },

    bookmarkIcon(): string {
      return this.isBookmarked ? 'bookmark' : 'bookmark_border'
    },

    queryPayload(): Payload | undefined {
      const uid = this.$firebase.currentUser?.uid
      const album = this.album

      if (!uid || !album) return

      return {
        uid,
        album: {
          id: this.albumId,
          imageUrl: album.images[1].url,
          name: album.name,
          artist: album.artists[0].name
        }
      }
    }
  },

  async mounted(): Promise<void> {
    this.$store.commit('setIsLoading', true)

    const albumId = this.albumId
    const uid = this.uid

    // query this album is bookmarked
    if (uid) {
      const isBookmarked = await getIsBookmarked({ uid, albumId })
      this.isBookmarked = isBookmarked
    }

    // if store state exists merge state
    const storeAlbum: Album | undefined = this.$store.getters[
      'spotify/getAlbumById'
    ](albumId)
    if (storeAlbum) {
      this.album = storeAlbum
      return this.$store.commit('setIsLoading', false)
    }

    // fetch from Spotify API
    const api = this.$functions.httpsCallable('spotifyGetAlbum')
    const response: Response = await api({ albumId }).catch((error: Error) =>
      this.$nuxt.error(error)
    )
    if (!response) return this.$store.commit('setIsLoading', false)

    const album = response.data
    this.album = album
    this.$store.commit('spotify/setAlbum', album)
    this.$store.commit('setIsLoading', false)
  },

  methods: {
    switchFormVisible(bool: boolean): void {
      this.isFormVisible = bool
    },

    bookmark(): void {
      // switch flag
      this.isBookmarked = !this.isBookmarked

      const uid = this.uid
      const albumId = this.albumId
      const album = this.album

      if (!uid || !album) return

      // delete firestore bookmark document
      if (!this.isBookmarked) {
        deleteBookmark({ uid, albumId })
      }
      // create firestore bookmark document
      else if (this.queryPayload) {
        createBookmark(this.queryPayload)
      }
    },

    async _createPost({ comment }: { comment: string }): Promise<void> {
      if (!this.queryPayload) return

      const data = {
        ...this.queryPayload,
        comment
      }

      // create firestore post document
      this.$nuxt.$loading.start()
      await createPost(data)
      this.$nuxt.$loading.finish()

      // push to user page
      const userPage = `/users/${this.uid}`
      this.$router.push(userPage)
    }
  },

  head(): MetaInfo {
    return {
      title: this.title
    }
  }
})
</script>

<style lang="scss" scoped>
.article-album {
  position: relative;
  margin: 0px 16px 16px;

  > .date {
    @include caption;
    color: $gray;
  }
}

.top-contents {
  display: flex;
  margin-bottom: 16px;

  > .img {
    width: 128px;
    height: 128px;
    margin-right: 12px;
    border: 1px solid $boundaryBlack;
    border-radius: 8px;
  }

  > .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      @include strong;
    }

    .caption {
      color: $gray;
    }

    > .link {
      color: $primary;
    }
  }
}

.track-list {
  margin-bottom: 8px;

  > .heading {
    @include strong;
    margin-bottom: 4px;
  }

  .number {
    @include caption;
    width: 20px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }
}

.fab-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  > .fabs {
    position: fixed;
    bottom: calc(32px + 16px);
    display: flex;
    justify-content: flex-end;
    max-width: $maxViewWidth;
    z-index: 2;

    .fab {
      display: flex;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      box-shadow: $shadowHigh;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba($black, 0);
        transition-duration: 0.1s;
      }

      &:hover::after {
        background: rgba($black, 0.05);
        box-shadow: $shadowVery;
      }

      > svg {
        width: 24px;
        height: 24px;

        &.-active {
          color: $primary;
        }
      }

      &.create {
        background: $primary;
        color: $white;
      }

      &.bookmark {
        background: $white;
        color: $gray;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
