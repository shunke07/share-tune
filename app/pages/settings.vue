<template>
  <div class="container">
    <FormProfiles />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FormProfiles from '~/components/settings/FormProfiles.vue'

export default Vue.extend({
  components: {
    FormProfiles
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: 56px auto 0;
  width: calc(100% - 32px);
}
</style>
