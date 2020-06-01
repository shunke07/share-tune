<template>
  <div>
    <ul v-if="fetching" class="list-releases">
      <li
        v-for="(n, index) in 8"
        :key="`skeleton-${index}`"
        class="skeleton-wrapper"
      >
        <div class="image-skeleton" />
        <div class="text-skeleton" />
      </li>
    </ul>
    <ul v-else class="list-releases">
      <li
        v-for="(release, index) in releases"
        :key="`release-${index}`"
        class="release-item"
      >
        <nuxt-link :to="`/albums/${release.id}/`">
          <img
            loading="lazy"
            class="img"
            width="180"
            height="180"
            :src="release.images[1].url"
            :alt="`${release.name}の画像`"
            @load="isImageLoaded.push(true)"
          />
          <p class="title">
            {{ release.name }}
          </p>
          <p class="artist">
            {{ release.artists[0].name }}
          </p>
        </nuxt-link>
      </li>
    </ul>
    <div ref="observer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Albums } from '~/types/spotify-api.d.ts'
import { SpotifyState } from '~/store/spotify'

type Response = void | { data: Albums }

export default Vue.extend({
  async fetch() {
    const storeReleases = (this.$store.state.spotify as SpotifyState).releases
    if (storeReleases.length) {
      this.releases = storeReleases
      this.observeScroll()
      return
    }

    this.fetching = true
    await this.fetchReleases({ offset: 0 })
    this.fetching = false
    this.observeScroll()
  },

  data() {
    return {
      releases: [] as Albums,
      observer: null as null | IntersectionObserver,
      fetching: false as boolean,
      isImageLoaded: [] as boolean[]
    }
  },

  computed: {
    observerElement(): HTMLDivElement {
      return this.$refs.observer as HTMLDivElement
    }
  },

  beforeDestroy() {
    if (this.observer) this.observer.unobserve(this.observerElement)
  },

  methods: {
    async fetchReleases({ offset }: { offset: number }): Promise<void> {
      const api = this.$functions.httpsCallable('spotifyGetNewReleases')
      const response: Response = await api({ offset }).catch((error: Error) =>
        this.$nuxt.error(error)
      )
      if (!response) return

      const releases = [...this.releases, ...response.data]
      this.releases = releases
      this.$store.commit('spotify/setReleases', releases)
    },

    observeScroll(): void {
      if (!this.observerElement) return

      const options = {
        rootMargin: '50%',
        threshold: 1.0
      }
      const callback = (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) return
          // query pagenation by scroll
          const offset = this.releases.length
          // max releases object is 100
          if (offset < 100) this.fetchReleases({ offset })
          // if all data has been getted
          else if (this.observer) this.observer.unobserve(this.observerElement)
        }
      }
      const observer = new IntersectionObserver(callback, options)
      this.observer = observer

      observer.observe(this.observerElement)
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes loading {
  0% {
    background-position-x: 0px;
  }
  80% {
    background-position-x: 200px;
  }
  100% {
    background-position-x: 200px;
  }
}

.list-releases {
  display: flex;
  flex-wrap: wrap;
}

.skeleton-wrapper {
  margin: 0 0 68px 16px;
  width: calc(50% - 24px);
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  > .image-skeleton {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      lightgray 60%,
      gainsboro 80%,
      lightgray 100%
    );
    animation: loading 1s ease-out infinite;
    border-radius: 8px;
  }

  > .text-skeleton {
    position: absolute;
    height: 40px;
    margin: 8px 2px 0;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      lightgray 60%,
      gainsboro 80%,
      lightgray 100%
    );
    animation: loading 1s ease-out infinite;
    border-radius: 8px;
  }
}

.release-item {
  margin: 0 0 24px 16px;
  width: calc(50% - 24px);
  transition-duration: 0.05s;

  &:hover {
    opacity: 0.8;
  }

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
</style>
