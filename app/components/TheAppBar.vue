<template>
  <section class="app-bar">
    <nav v-if="backIconVisible" class="nav leading">
      <button class="icon" @click="$router.back()">
        <svg-icon name="navigation/arrow_back" title="back" />
      </button>
    </nav>
    <h1 class="title">
      {{ title }}
    </h1>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type PageTitle =
  | ''
  | 'ユーザー登録'
  | 'ログイン'
  | '最新リリース'
  | '利用規約'
  | 'プライバシーポリシー'
  | 'マイページ'
  | 'プロフィール設定'

export default Vue.extend({
  props: {
    title: {
      type: String as PropType<PageTitle>,
      required: true
    },
    backIconVisible: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.app-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: $maxViewWidth;
  position: fixed;
  top: 0;
  height: 44px;
  padding: 4px 16px;
  background: $white;
  border-bottom: 1px solid $boundaryBlack;
  z-index: 2;

  > .title {
    @include subhead;
  }

  > .nav {
    display: flex;
    align-items: center;
    height: inherit;
    position: absolute;

    > .icon {
      width: 24px;
      height: 24px;

      svg {
        width: 100%;
        height: 100%;
        color: $gray;
      }
    }

    &.leading {
      left: 16px;
    }
  }
}
</style>
