<template>
  <form class="form-profile">
    <BaseInputText
      type="text"
      class="input"
      label="ユーザーネーム"
      :max-length="20"
      :is-value-valid="true"
      :current-value="loginUser.displayName"
      @onChangeValue="displayName = $event"
    />
    <BaseTextarea
      class="textarea"
      label="プロフィール"
      :max-length="160"
      :is-value-valid="true"
      :current-value="loginUser.profileText"
      @onChangeValue="profileText = $event"
    />
    <BaseInputText
      class="input"
      type="text"
      label="ウェブサイト"
      :max-length="100"
      :is-value-valid="true"
      :current-value="loginUser.siteUrl"
      @onChangeValue="siteUrl = $event"
    />
    <BaseButton label="保存" class="save" :disabled="true" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import BaseInputText from '~/components/form/BaseInputText.vue'
import BaseTextarea from '~/components/form/BaseTextarea.vue'
import BaseButton from '~/components/form/BaseButton.vue'

import { User } from '~/types/firestore'

export default Vue.extend({
  components: {
    BaseInputText,
    BaseTextarea,
    BaseButton
  },

  data() {
    return {
      displayName: '' as string,
      profileText: '' as string,
      siteUrl: '' as string
    }
  },

  computed: {
    loginUser(): User {
      return this.$store.state.loginUser
    }
  }
})
</script>

<style lang="scss" scoped>
.form-profile {
  display: flex;
  flex-direction: column;
  align-items: center;

  > .input {
    margin-bottom: 16px;
  }

  > .textarea {
    margin-bottom: 32px;
  }

  > .save {
    margin-top: 32px;
  }
}
</style>
