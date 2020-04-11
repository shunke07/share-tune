<template>
  <div class="container">
    <FormLogin />
    <nuxt-link class="signup" to="/signup/">
      アカウント登録はこちら
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import Vue from 'vue'

import FormLogin from '~/components/login/FormLogin.vue'

export default Vue.extend({
  components: {
    FormLogin
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

  > .signup {
    margin-top: 32px;
    color: $primary;
  }
}
</style>
