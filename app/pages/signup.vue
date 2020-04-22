<template>
  <div class="container">
    <section v-if="doneSignUp" class="complete">
      <h1>確認メールを送信しました</h1>
      <p>{{ email }} 宛に確認メールを送信しました。</p>
      <p>メールの内容を確認して、登録を完了してください。</p>
    </section>
    <FormSignUp v-if="!doneSignUp" @onCompleteSignUp="email = $event" />
    <p v-if="!doneSignUp" class="caption">
      アカウントを登録すると、ご入力いただいたメールアドレスに登録確認メールをお送りいたします。
    </p>
    <p class="caption">または</p>
    <ButtonSocialLogin class="social" text="Twitterで登録" />
    <p v-if="!doneSignUp" class="caption">
      <nuxt-link to="/terms/">利用規約</nuxt-link>
      と
      <nuxt-link to="/policy/">プライバシーポリシー</nuxt-link>
      に同意の上、ボタンをタップしてください。
    </p>
    <nuxt-link class="login" to="/login/">
      ログインはこちら
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { createUser } from '~/repositories/firestore'

import FormSignUp from '~/components/signup/FormSignUp.vue'
import ButtonSocialLogin from '~/components/login/ButtonSocialLogin.vue'

export default Vue.extend({
  components: {
    FormSignUp,
    ButtonSocialLogin
  },

  data() {
    return {
      email: '' as string
    }
  },

  computed: {
    doneSignUp(): boolean {
      return !!this.email
    }
  },

  async mounted() {
    const result = await this.$auth
      .getRedirectResult()
      .catch((error: Error) => this.$nuxt.error(error))

    if (!result || !result.user) return

    this.$store.commit('setIsLoading', true)

    const { uid, displayName, providerData } = result.user
    const data = providerData[0]?.photoURL
    const photoURL = data ? data.replace('_normal', '') : null

    await createUser({
      uid,
      displayName: displayName || '',
      photoURL
    })
      .then(() => this.$store.dispatch('login', { uid }))
      .catch((error: Error) => {
        if (error.message === 'already-exists') {
          alert(
            'このアカウントは既に登録されています。\nログインしてください。'
          )
          return
        }
        this.$nuxt.error(error)
      })

    this.$store.commit('setIsLoading', false)
  },

  head(): MetaInfo {
    return {
      title: 'ユーザー登録'
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

  > .complete {
    > h1 {
      @include title-3;
      margin-bottom: 12px;
    }

    > p {
      color: $mono2;
    }
  }

  > .social {
    margin-top: 16px;
  }

  > .caption {
    margin-top: 24px;
    @include caption;

    > a {
      color: $primary;
      text-decoration: underline;
    }
  }

  > .login {
    margin-top: 56px;
    color: $primary;
  }
}
</style>
