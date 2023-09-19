<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">{{
      $t('common.sidebar.menus.dashboard')
    }}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/setting' }">{{
      $t('common.sidebar.menus.settingChat')
    }}</el-breadcrumb-item>
  </el-breadcrumb>
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
