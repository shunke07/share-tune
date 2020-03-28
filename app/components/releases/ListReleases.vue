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

<script>
export default {
  data() {
    return {
      releases: [],
      observer: null
    }
  },

  async mounted() {
    const storeReleases = this.$store.state.spotify.releases
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
    if (this.observer) this.observer.unobserve(this.$refs.observer)
  },

  methods: {
    async fetchReleases({ offset }) {
      const api = this.$functions.httpsCallable('spotifyGetNewReleases')
      const result = await api({ offset }).catch((error) =>
        this.$nuxt.error(error)
      )

      const releases = [...this.releases, ...result.data]
      this.releases = releases
      this.$store.commit('spotify/setReleases', releases)
    },

    observeScroll() {
      const observerElement = this.$refs.observer
      if (!observerElement) return

      const options = {
        rootMargin: '50%',
        threshold: 1.0
      }
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          // pagenation
          this.fetchReleases({ offset: this.releases.length })
        })
      }
      const observer = new IntersectionObserver(callback, options)
      this.observer = observer

      observer.observe(observerElement)
    }
  }
}
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
