<template>
  <div class="container">
    <FormLogin />
    <nuxt-link class="signup" to="/signup/">
      アカウント登録はこちら
    </nuxt-link>
  </div>
</template>

<script>
import FormLogin from '~/components/login/FormLogin'

export default {
  components: {
    FormLogin
  },

  head() {
    return {
      title: 'ログイン'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 64px);
  margin: 96px auto 0;

  > .signup {
    margin-top: 32px;
    color: $primary;
  }
}
</style>
