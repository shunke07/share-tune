<template>
  <div>
    <ul v-if="fetching" class="list-releases">
      <li v-for="(n, index) in 8" :key="`skeleton-${index}`" class="skeleton">
        <!-- <div class="skeleton" /> -->
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
            class="img"
            :src="release.images[1].url"
            :alt="`${release.name}の画像`"
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
      fetching: false as boolean
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

.skeleton {
  margin: 0 0 24px 16px;
  width: calc(50% - 24px);
  position: relative;
  background: linear-gradient(
    90deg,
    lightgray 60%,
    gainsboro 80%,
    lightgray 100%
  );
  animation: loading 1s ease-out infinite;
  border-radius: 8px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
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
