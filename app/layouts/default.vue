<template>
  <div class="only-sp-view">
    <header>
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

    pageTitle(): PageTitle {
      const { path, params } = this.$route

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
  max-width: 414px;
  margin: 0 auto;
  background: #fcfcfc;
  display: block;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
</style>
