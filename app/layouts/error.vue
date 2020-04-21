<template>
  <div class="error-layout">
    <div class="error">
      <svg-icon name="alert/error_outline" title="エラー" />
      <p class="msg">
        {{ message }}
      </p>
      <nuxt-link class="back" to="/">
        ホームに戻る
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import Vue, { PropType } from 'vue'
import { NuxtError } from '@nuxt/types'

export default Vue.extend({
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true
    }
  },

  computed: {
    statusCode(): number {
      return this.error?.statusCode ?? 500
    },

    message(): 'ページが見つかりません' | 'エラーが発生しました' {
      return this.statusCode === 404
        ? 'ページが見つかりません'
        : 'エラーが発生しました'
    }
  },

  head(): MetaInfo {
    return {
      title: this.message
    }
  }
})
</script>

<style lang="scss" scoped>
.error-layout {
  background: $mono4;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > .error {
    max-width: $maxViewWidth;
    color: $mono2;

    > svg {
      width: 100px;
      height: 100px;
      color: $mono3;
    }

    > .msg {
      margin-bottom: 16px;
    }

    > .back {
      @include caption;
      text-decoration: none;
    }
  }
}
</style>
