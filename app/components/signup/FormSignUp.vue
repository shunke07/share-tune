<template>
  <form class="form-signup">
    <BaseInputText
      class="input"
      type="text"
      label="ユーザーネーム"
      :max-length="20"
      :is-value-valid="isNameValid"
      @onChangeValue="displayName = $event"
    />
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
    <p class="caption">
      6文字以上の半角英数字または記号
    </p>
    <BaseButton
      label="登録する"
      :disabled="!isFormValid"
      @onClick="createAccount()"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseInputText from '~/components/form/BaseInputText.vue'
import BaseButton from '~/components/form/BaseButton.vue'
import { createUser } from '~/repositories/firestore/users'

type AuthError = Error & { code: string }

export default Vue.extend({
  components: {
    BaseInputText,
    BaseButton
  },

  data() {
    return {
      displayName: '' as string,
      email: '' as string,
      password: '' as string
    }
  },

  computed: {
    isNameValid(): boolean {
      return !!this.displayName
    },

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
      const { isNameValid, isEmailValid, isPassValid } = this
      return isNameValid && isEmailValid && isPassValid
    }
  },

  methods: {
    handleError(error?: Error): void {
      alert(
        'アカウント作成に失敗しました。しばらくしてから再度お試しいただくか、お問い合わせください。'
      )
      if (error) this.$nuxt.error(error)
    },

    async createAccount(): Promise<void> {
      if (!this.isFormValid) return

      const { email, password } = this

      this.$store.commit('setIsLoading', true)

      await this.$auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => this.sendEmailVerification())
        .catch((error: AuthError) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert(`${email}はすでに使用されています。`)
              break
            case 'auth/invalid-email':
              alert(`${email}は無効なメールアドレスです。`)
              break
            default:
              this.handleError(error)
              break
          }
          this.$store.commit('setIsLoading', false)
        })
    },

    async sendEmailVerification(): Promise<void> {
      const user = this.$auth.currentUser
      if (!user) {
        this.handleError()
        this.$store.commit('setIsLoading', false)
        return
      }

      const displayName = this.displayName

      // To be included in the body of the email
      await user
        .updateProfile({ displayName })
        .catch((error: Error) => this.handleError(error))

      // Send email & create firestore user document
      Promise.all([
        user.sendEmailVerification(),
        createUser({ uid: user.uid, displayName })
      ])
        .then(async () => {
          this.$emit('onCompleteSignUp', this.email)
          await this.$auth.signOut() // Sign out to wait for email confirmation
        })
        .catch((error: Error) => this.handleError(error))
        .finally(() => this.$store.commit('setIsLoading', false))
    }
  }
})
</script>

<style lang="scss" scoped>
.form-signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > .input {
    margin-bottom: 16px;

    &:nth-of-type(3) {
      margin-bottom: 4px;
    }
  }

  > .caption {
    @include caption;
    width: 100%;
    max-width: $maxViewWidth;
    text-align: left;
    color: $gray;
    margin-bottom: 24px;
  }
}
</style>
