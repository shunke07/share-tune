<template>
  <div class="container">
    <section v-if="doneSignUp" class="complete">
      <h1>確認メールを送信しました</h1>
      <p>{{ email }} 宛に確認メールを送信しました。</p>
      <p>メールの内容を確認して、登録を完了してください。</p>
    </section>
    <FormSignUp v-if="!doneSignUp" @onCompleteSignUp="email = $event" />
    <p v-if="!doneSignUp" class="caption">
      <nuxt-link to="/terms/">利用規約</nuxt-link>
      と
      <nuxt-link to="/policy/">プライバシーポリシー</nuxt-link>
      に同意の上、ボタンをタップしてください。
      アカウントを登録すると、ご入力いただいたメールアドレスに登録確認メールをお送りいたします。
    </p>
    <nuxt-link class="login" to="/login/">
      ログインはこちら
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

import FormSignUp from '~/components/signup/FormSignUp.vue'

export default Vue.extend({
  components: {
    FormSignUp
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
  margin: 96px auto 0;

  > .complete {
    > h1 {
      @include title-3;
      margin-bottom: 12px;
    }

    > p {
      color: $gray;
    }
  }

  > .caption {
    margin-top: 32px;
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
