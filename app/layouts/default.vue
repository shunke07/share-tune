<template>
  <div class="only-sp-view">
    <header :class="{ 'app-bar': isAppBarVisible }">
      <TheAppBar
        v-show="isAppBarVisible"
        :title="pageTitle"
        :back-icon-visible="backIconVisible"
      />
    </header>
    <nuxt />
    <TheLoading v-show="isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheAppBar, { PageTitle } from '~/components/TheAppBar.vue'
import TheLoading from '~/components/TheLoading.vue'

import { RootState } from '~/store'

export default Vue.extend({
  components: {
    TheAppBar,
    TheLoading
  },

  computed: {
    isLoading(): boolean {
      return (this.$store.state as RootState).isLoading
    },

    isAppBarVisible(): boolean {
      const excludedPaths = ['/']
      return !excludedPaths.includes(this.$route.path)
    },

    backIconVisible(): boolean {
      const uid = this.$route.params.uid
      const excludedPaths = ['/releases/', `/users/${uid}/`]
      return !excludedPaths.includes(this.$route.path)
    },

    pageTitle(): PageTitle {
      const { path, params } = this.$route
      // Complement trailing slash
      const pathWithTrailingSlash = (path: string): string =>
        path.slice(-1) === '/' ? path : `${path}/`

      switch (pathWithTrailingSlash(path)) {
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
        case '/settings/':
          return 'プロフィール設定'
        //
        case `/users/${params.uid}/`: {
          const uid = this.$firebase.currentUser?.uid
          const isMyPage = uid === params.uid
          return isMyPage ? 'マイページ' : ''
        }
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
  max-width: $maxViewWidth;
  margin: 0 auto;
  background: $mono4;
  display: block;
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  > .app-bar {
    height: 44px;
    margin-bottom: 16px;
  }
}
</style>
