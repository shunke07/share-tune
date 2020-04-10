<template>
  <div v-if="user" class="container">
    <nav class="leading">
      <button class="icon" @click="$router.push('/settings/')">
        <svg-icon name="actions/settings" title="プロフィール設定" />
      </button>
    </nav>
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

  > .leading {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $maxViewWidth;
    height: 44px;
    padding-right: 16px;
    z-index: 3;

    > .icon {
      width: 24px;
      height: 24px;

      > svg {
        color: $gray;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
