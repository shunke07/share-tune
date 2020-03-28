<template>
  <section class="landing-page">
    <h1 class="title">
      ShareTune
    </h1>
    <h2 class="copy">
      好きな音楽を語ろう。
    </h2>

    <footer class="footer-links">
      <BaseButton
        label="はじめる"
        :disabled="false"
        class="signup"
        @onClick="$router.push('/signup/')"
      />
      <p class="login">
        すでにアカウントをお持ちですか？
        <nuxt-link to="/login/">
          ログイン
        </nuxt-link>
      </p>
      <p class="support">
        <nuxt-link to="/terms/">利用規約</nuxt-link>
        <span>/</span>
        <nuxt-link to="/policy/">プライバシーポリシー</nuxt-link>
      </p>
    </footer>
  </section>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import Vue from 'vue'

import BaseButton from '~/components/form/BaseButton.vue'

export default Vue.extend({
  components: {
    BaseButton
  },

  head(): MetaInfo {
    return {
      titleTemplate: '',
      title: 'ShareTune'
    }
  }
})
</script>

<style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 32px);
  min-height: 100vh;
  margin: 0 auto;

  > .title {
    @include title-1;
    margin-bottom: 8px;
  }

  > .copy {
    @include subhead;
  }
}

.footer-links {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: calc(56px + env(safe-area-inset-bottom));
  padding: 0 16px;
  width: 100%;
  max-width: $maxViewWidth;

  > .login > a {
    @include strong;
    color: $primary;
  }

  > .signup {
    margin-bottom: 16px;
  }

  > .support {
    @include caption;
    margin-top: 32px;

    > a {
      color: $gray;
    }

    > span {
      margin: 0 4px;
    }
  }
}
</style>
