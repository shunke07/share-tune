<template>
  <div v-if="user" class="container">
    <SectionProfile :user="user" class="profile" />
    <ListBookmarks />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/firestore'

import SectionProfile from '~/components/users/SectionProfile.vue'
import ListBookmarks from '~/components/users/ListBookmarks.vue'

export default Vue.extend({
  components: {
    SectionProfile,
    ListBookmarks
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

  > .profile {
    border-bottom: 1px solid $boundaryBlack;
    margin-bottom: 16px;
  }
}
</style>
