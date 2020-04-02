<template>
  <div v-if="user" class="container">
    <SectionProfile :user="user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SectionProfile from '~/components/users/SectionProfile.vue'
import { User } from '~/types/firestore'

export default Vue.extend({
  components: {
    SectionProfile
  },

  computed: {
    user(): User {
      return this.$store.state.loginUser
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin-top: 56px;
}
</style>
