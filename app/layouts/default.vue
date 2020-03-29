<template>
  <div class="only-sp-view">
    <header>
      <TheAppBar
        v-show="isAppBarVisible"
        :title="pageTitle"
        :back-icon-visible="backIconVisible"
      />
    </header>
    <nuxt v-show="!isLoading" />
    <TheLoading v-show="isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheAppBar from '~/components/TheAppBar.vue'
import TheLoading from '~/components/TheLoading.vue'

type pageTitle =
  | ''
  | 'ユーザー登録'
  | 'ログイン'
  | '最新リリース'
  | '利用規約'
  | 'プライバシーポリシー'

export default Vue.extend({
  components: {
    TheAppBar,
    TheLoading
  },

  computed: {
    isLoading(): boolean {
      return this.$store.state.isLoading
    },

    isAppBarVisible(): boolean {
      const excludedPaths = ['/']
      return !excludedPaths.includes(this.$route.path)
    },

    backIconVisible(): boolean {
      const excludedPaths = ['/releases/']
      return !excludedPaths.includes(this.$route.path)
    },

    pageTitle(): pageTitle {
      const { path } = this.$route

      switch (path) {
        case '/signup/':
          return 'ユーザー登録'
        case '/login/':
          return 'ログイン'
        case '/releases/':
          return '最新リリース'
        case '/terms/':
          return '利用規約'
        case '/policy/':
          return 'プライバシーポリシー'
        default:
          return ''
      }
    }
  }
})
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
