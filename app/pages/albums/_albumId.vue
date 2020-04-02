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
        <li v-for="track in album.tracks" :key="track.track_number">
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
    <!-- FAB -->
    <div class="fab-container">
      <div class="fabs">
        <div>
          <button class="fab favorite" @click="bookmark()">
            <svg-icon
              :name="`actions/${bookmarkIcon}`"
              title="favorite"
              :class="{ '-active': isBookmarked }"
            />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Album } from '~/types/spotify-api.d.ts'
import {
  createBookmark,
  getIsBookmarked
} from '~/repositories/firestore/bookmarks'

type Response = void | { data: Album }

export default Vue.extend({
  data() {
    return {
      album: null as Readonly<Album> | null,
      albumId: this.$route.params.albumId as string,
      isBookmarked: false as boolean
    }
  },

  computed: {
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
    }
  },

  async mounted(): Promise<void> {
    const albumId = this.albumId
    const uid = this.$firebase.currentUser?.uid
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
      return
    }
    // fetch from Spotify API
    this.$store.commit('setIsLoading', true)

    const api = this.$functions.httpsCallable('spotifyGetAlbum')
    const response: Response = await api({ albumId }).catch((error: Error) =>
      this.$nuxt.error(error)
    )
    if (!response) return

    const album = response.data
    this.album = album
    this.$store.commit('spotify/setAlbum', album)
    this.$store.commit('setIsLoading', false)
  },

  methods: {
    bookmark(): void {
      // switch flag
      this.isBookmarked = !this.isBookmarked

      if (!this.isBookmarked) return

      const uid = this.$firebase.currentUser?.uid
      if (!uid) return

      // create firestore bookmark document
      const album = this.album as Album
      const data = {
        uid,
        album: {
          id: this.albumId,
          imageUrl: album.images[1].url,
          name: album.name,
          artist: album.artists[0].name
        }
      }
      createBookmark(data)
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
  margin: 60px 16px 16px;

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

      > svg {
        width: 24px;
        height: 24px;

        &.-active {
          color: $primary;
        }
      }

      &.favorite {
        background: $white;
        color: $gray;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
