<template>
  <div class="only-sp-view">
    <header>
      <TheAppBar v-show="isAppBarVisible" :title="pageTitle" />
    </header>
    <nuxt v-show="!isLoading" />
    <TheLoading v-show="isLoading" />
  </div>
</template>

<script>
import TheAppBar from '~/components/TheAppBar'
import TheLoading from '~/components/TheLoading'

export default {
  components: {
    TheAppBar,
    TheLoading
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },

    isAppBarVisible() {
      const excludedPaths = ['/']
      return !excludedPaths.includes(this.$route.path)
    },

    pageTitle() {
      const { path } = this.$route

      switch (path) {
        case '/signup/':
          return 'ユーザー登録'
        case '/login/':
          return 'ログイン'
        case '/terms/':
          return '利用規約'
        case '/policy/':
          return 'プライバシーポリシー'
        default:
          return ''
      }
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
