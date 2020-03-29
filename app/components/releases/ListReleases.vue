<template>
  <div>
    <ul class="list-releases">
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

interface Response {
  data: Albums
}

export default Vue.extend({
  data() {
    return {
      releases: [] as Albums,
      observer: null as null | IntersectionObserver
    }
  },

  computed: {
    observerElement(): Element {
      return this.$refs.observer as Element
    }
  },

  async mounted() {
    const storeReleases: Albums | [] = this.$store.state.spotify.releases
    if (storeReleases.length) {
      this.releases = storeReleases
      this.observeScroll()
      return
    }

    this.$store.commit('setIsLoading', true)
    await this.fetchReleases({ offset: 0 })
    this.$store.commit('setIsLoading', false)

    this.observeScroll()
  },

  beforeDestroy() {
    if (this.observer) this.observer.unobserve(this.observerElement)
  },

  methods: {
    async fetchReleases({ offset }: { offset: number }) {
      const api = this.$functions.httpsCallable('spotifyGetNewReleases')
      const result: Response = await api({ offset }).catch((error: Error) =>
        this.$nuxt.error(error)
      )

      const releases = [...this.releases, ...result.data]
      this.releases = releases
      this.$store.commit('spotify/setReleases', releases)
    },

    observeScroll() {
      if (!this.observerElement) return

      const options = {
        rootMargin: '50%',
        threshold: 1.0
      }
      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          // pagenation
          this.fetchReleases({ offset: this.releases.length })
        })
      }
      const observer = new IntersectionObserver(callback, options)
      this.observer = observer

      observer.observe(this.observerElement)
    }
  }
})
</script>

<style lang="scss" scoped>
.list-releases {
  display: flex;
  flex-wrap: wrap;
}

.release-item {
  margin: 0 0 16px 16px;
  width: calc(50% - 24px);

  a {
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
</style>
