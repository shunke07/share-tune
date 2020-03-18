<template>
  <div class="container">
    <ListReleases />
  </div>
</template>

<script>
import ListReleases from '~/components/releases/ListReleases'

export default {
  components: {
    ListReleases
  },

  head() {
    return {
      title: 'リリース'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 56px;
}
</style>
