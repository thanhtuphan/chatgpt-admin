<template><div>Dashboad</div></template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

export default Vue.extend({
  name: 'UsersPage',

  head(): MetaInfo {
    return {
      title: this.$t('homePage.title').toString(),
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
