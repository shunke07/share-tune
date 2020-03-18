<template>
  <ul class="list-releases">
    <li
      v-for="(release, index) in releases"
      :key="`release-${index}`"
      class="release-item"
    >
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
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      releases: []
    }
  },

  async mounted() {
    const storeReleases = this.$store.state.spotify.releases
    if (storeReleases.length) {
      this.releases = storeReleases
    }

    this.$store.commit('setIsLoading', true)

    const api = this.$functions.httpsCallable('spotifyGetNewReleases')
    const result = await api().catch((error) => this.$nuxt.error(error))

    this.$store.commit('setIsLoading', false)

    if (!result) return

    const releases = result.data
    this.releases = releases
    this.$store.commit('spotify/setReleases', releases)
  }
}
</script>

<style lang="scss" scoped>
.list-releases {
  display: flex;
  flex-wrap: wrap;

  > .release-item {
    margin: 0 0 16px 16px;
    width: calc(50% - 24px);

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