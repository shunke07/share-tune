<template>
  <div v-if="user" class="users-page">
    <nav class="app-bar-icons">
      <button class="icon back" @click="$router.push('/releases/')">
        <svg-icon name="navigation/arrow_back" title="戻る" />
      </button>
      <button class="icon" @click="$router.push('/settings/')">
        <svg-icon name="actions/settings" title="プロフィール設定" />
      </button>
    </nav>
    <SectionProfile :user="user" class="profile" />
    <p class="tabs">
      <button class="icon" @click="switchActiveTab(1)">
        <svg-icon
          name="message"
          title="投稿一覧"
          :class="{ '-active': activeTab === 1 }"
        />
      </button>
      <button class="icon" @click="switchActiveTab(2)">
        <svg-icon
          name="actions/bookmark"
          title="ブックマーク一覧"
          :class="{ '-active': activeTab === 2 }"
        />
      </button>
      <span class="underline" :class="`-active-${activeTab}`" />
    </p>
    <ListPosts v-show="activeTab === 1" />
    <ListBookmarks v-show="activeTab === 2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/firestore'
import { RootState } from '~/store'

import SectionProfile from '~/components/users/SectionProfile.vue'
import ListBookmarks from '~/components/users/ListBookmarks.vue'
import ListPosts from '~/components/users/ListPosts.vue'

export default Vue.extend({
  components: {
    SectionProfile,
    ListBookmarks,
    ListPosts
  },

  asyncData({ store }) {
    const storeActiveTab = (store.state as RootState).activeTab
    if (storeActiveTab !== null) return { activeTab: storeActiveTab }
  },

  data() {
    return {
      activeTab: 1 as number
    }
  },

  computed: {
    user(): User | null {
      return (this.$store.state as RootState).loginUser
    }
  },

  methods: {
    switchActiveTab(tabNumber: number): void {
      this.activeTab = tabNumber
      this.$store.commit('setActiveTab', tabNumber)
    }
  }
})
</script>

<style lang="scss" scoped>
.users-page {
  > .profile {
    margin-bottom: 8px;
  }

  > .list-bookmarks {
    margin-top: 16px;
  }

  > .app-bar-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $maxViewWidth;
    height: 44px;
    padding: 0 16px;
    z-index: 3;

    > .icon {
      width: 24px;
      height: 24px;

      &.back {
        width: 28px;
        height: 28px;
      }

      > svg {
        color: $mono2;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.tabs {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: $boundaryBlack;
  }

  > .underline {
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 50%;
    height: 2px;
    background: $primary;
    transition: all 0.3s ease-in-out;
    z-index: 2;

    &.-active-2 {
      left: 50%;
    }
  }

  > .icon {
    position: relative;
    width: 50%;

    > svg {
      width: 24px;
      height: 24px;
      color: $mono3;

      &.-active {
        color: $primary;
      }
    }
  }
}
</style>
