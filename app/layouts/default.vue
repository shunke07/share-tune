<template>
  <div class="only-sp-view">
    <nuxt v-show="!isLoading" />
    <TheLoading v-show="isLoading" />
  </div>
</template>

<script>
import TheLoading from '~/components/TheLoading'

export default {
  components: {
    TheLoading
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.only-sp-view {
  width: 100%;
  max-width: 414px;
  margin: 0 auto;
  background: #fcfcfc;
  display: block;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
</style>
