<template>
  <form class="form-login">
    <BaseInputText
      class="input"
      type="email"
      label="メールアドレス"
      :max-length="255"
      :is-value-valid="isEmailValid"
      @onChangeValue="email = $event"
    />
    <BaseInputText
      class="input"
      type="password"
      label="パスワード"
      :max-length="32"
      :is-value-valid="isPassValid"
      @onChangeValue="password = $event"
    />
    <BaseButton
      class="login"
      label="ログイン"
      :disabled="!isFormValid"
      @onClick="login()"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { UserCredential } from '@firebase/auth-types'
import BaseInputText from '~/components/form/BaseInputText.vue'
import BaseButton from '~/components/form/BaseButton.vue'

type LoginError = Error & { code: string }
type Result = void | UserCredential

export default Vue.extend({
  components: {
    BaseInputText,
    BaseButton
  },

  data() {
    return {
      email: '' as string,
      password: '' as string
    }
  },

  computed: {
    isEmailValid(): boolean {
      const email = this.email
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !!email && regexp.test(email)
    },

    isPassValid(): boolean {
      const pass = this.password
      const regexp = /^([a-z0-9!-/:-@¥[-`{-~]){6,32}$/i
      return !!pass && regexp.test(pass)
    },

    isFormValid(): boolean {
      const { isEmailValid, isPassValid } = this
      return isEmailValid && isPassValid
    }
  },

  methods: {
    async login(): Promise<void> {
      if (!this.isFormValid) return

      const { email, password } = this

      const handleError = (error: LoginError) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert(`${email}は無効なメールアドレスです。`)
            break
          case 'auth/user-not-found':
            alert(`${email}は登録されていません。`)
            break
          case 'auth/wrong-password':
            alert('パスワードが違います。')
            break
          default:
            alert(
              'ログインに失敗しました。しばらくしてから再度お試しいただくか、お問い合わせください。'
            )
            this.$nuxt.error(error)
            break
        }
      }

      this.$store.commit('setIsLoading', true)

      // firebase authentication sign in
      const result: Result = await this.$auth
        .signInWithEmailAndPassword(email, password)
        .catch((error: LoginError) => handleError(error))

      this.$store.commit('setIsLoading', false)

      if (!result || !result.user) return

      const { emailVerified, uid } = result.user

      // verify email
      if (!emailVerified) {
        alert(
          `メールアドレスの確認が完了していません。\n${email} 宛に送信された確認メールより、登録を完了してください。`
        )
        return
      }

      // qurry firestore user and set state
      await this.$store
        .dispatch('login', { uid })
        .catch((error: LoginError) => handleError(error))
    }
  }
})
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > .input {
    margin-bottom: 16px;
  }

  > .login {
    margin-top: 16px;
  }
}
</style>
