<template>
  <div class="container">
    <FormLogin />
    <p class="caption">または</p>
    <ButtonSocialLogin class="social" text="Twitterでログイン" />
    <nuxt-link class="signup" to="/signup/">
      アカウント登録はこちら
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import Vue from 'vue'

import ButtonSocialLogin from '~/components/login/ButtonSocialLogin.vue'
import FormLogin from '~/components/login/FormLogin.vue'

export default Vue.extend({
  components: {
    FormLogin,
    ButtonSocialLogin
  },

  async mounted() {
    const result = await this.$auth
      .getRedirectResult()
      .catch((error: Error) => this.$nuxt.error(error))

    if (!result || !result.user) return

    this.$store.commit('setIsLoading', true)

    const uid = result.user.uid
    await this.$store.dispatch('login', { uid }).catch((error: Error) => {
      if (error.message === 'user-not-found') {
        alert(
          '関連するアカウントが存在しません。\nユーザー登録を行ってください。'
        )
        return
      }
      this.$nuxt.error(error)
    })

    this.$store.commit('setIsLoading', false)
  },

  head(): MetaInfo {
    return {
      title: 'ログイン'
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 64px);
  margin: 20px auto 0;

  > .social {
    margin-top: 16px;
  }

  > .caption {
    @include caption;
    margin-top: 24px;
  }

  > .signup {
    margin-top: 56px;
    color: $primary;
  }
}
</style>
