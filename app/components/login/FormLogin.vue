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
    <BaseButton class="login" label="ログイン" :disabled="!isFormValid" />
  </form>
</template>

<script>
import BaseInputText from '~/components/form/BaseInputText'
import BaseButton from '~/components/form/BaseButton'

export default {
  components: {
    BaseInputText,
    BaseButton
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    isEmailValid() {
      const email = this.email
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !!email && regexp.test(email)
    },

    isPassValid() {
      const pass = this.password
      const regexp = /^([a-z0-9!-/:-@¥[-`{-~]){6,32}$/i
      return !!pass && regexp.test(pass)
    },

    isFormValid() {
      const { isEmailValid, isPassValid } = this
      return isEmailValid && isPassValid
    }
  }
}
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
