<template>
  <button class="social-login" :disabled="disabled" @click="loginWithTwitter()">
    <svg-icon name="social/twitter_logo" title="Twitter ロゴ" class="logo" />
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase/init'
import 'firebase/auth'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      disabled: false
    }
  },

  methods: {
    loginWithTwitter() {
      this.disabled = true
      this.$nuxt.$loading.start()

      const provider = new firebase.auth.TwitterAuthProvider()
      this.$auth.signInWithRedirect(provider)
    }
  }
})
</script>

<style lang="scss" scoped>
.social-login {
  @include strong;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 75%;
  max-width: $maxViewWidth;
  padding: 2px 16px;
  box-shadow: $shadowLow;
  border-radius: 4px;
  background: $twitter;
  color: $white;
  position: relative;

  > .logo {
    color: $white;
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    opacity: 0.95;
    transition-duration: 0.25s;

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 100%;
    box-shadow: $shadowVery;
    opacity: 0;
    transition-duration: 0.1s;
  }
}
</style>
