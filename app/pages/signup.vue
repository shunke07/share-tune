<template>
  <div class="container">
    <FormSignUp />
    <p class="caption">
      <nuxt-link to="/terms/"> 利用規約 </nuxt-link>
      と
      <nuxt-link to="/policy/">プライバシーポリシー</nuxt-link>
      に同意の上、ボタンをタップしてください。
      アカウントを登録すると、ご入力いただいたメールアドレスに登録確認メールをお送りいたします。
    </p>
  </div>
</template>

<script>
import FormSignUp from '~/components/signup/FormSignUp'

export default {
  components: {
    FormSignUp
  },

  head() {
    return {
      title: 'ユーザー登録'
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

  > .caption {
    margin-top: 32px;
    @include caption;

    > a {
      color: $primary;
      text-decoration: underline;
    }
  }
}
</style>
