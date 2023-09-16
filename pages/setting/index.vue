<template>
  <div>chat setting</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

export default Vue.extend({
  name: 'HistoryChatpage',

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
