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
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import dayjs from '~/plugins/dayjs'
import { Album } from '~/types/spotify-api.d.ts'

interface Response {
  data: Album
}

export default Vue.extend({
  data() {
    return {
      album: null as Readonly<Album> | null,
      albumId: this.$route.params.albumId as string
    }
  },

  computed: {
    releaseDate(): string {
      if (this.album === null) return ''

      return dayjs(this.album.release_date).format('YYYY年MM月DD日')
    },

    title(): string {
      if (this.album === null) return ''

      const albumName = this.album.name ?? ''
      const albumArtist = this.album.artists[0].name ?? ''
      return `${albumArtist}の${albumName}`
    }
  },

  async mounted(): Promise<void> {
    const albumId = this.albumId
    if (!albumId) return

    const storeAlbum: Album | undefined = this.$store.getters[
      'spotify/getAlbumById'
    ](albumId)
    if (storeAlbum) {
      this.album = storeAlbum
      return
    }

    this.$store.commit('setIsLoading', true)

    const api = this.$functions.httpsCallable('spotifyGetAlbum')
    const response: Response = await api({ albumId }).catch((error: Error) =>
      this.$nuxt.error(error)
    )
    const album = response.data

    this.album = album
    this.$store.commit('spotify/setAlbum', album)
    this.$store.commit('setIsLoading', false)
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
</style>
