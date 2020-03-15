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
    <BaseButton label="登録する" :disabled="!isFormValid" />
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
      displayName: '',
      email: '',
      password: ''
    }
  },

  computed: {
    isNameValid() {
      return !!this.displayName
    },

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
      const { isNameValid, isEmailValid, isPassValid } = this
      return isNameValid && isEmailValid && isPassValid
    }
  }
}
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
