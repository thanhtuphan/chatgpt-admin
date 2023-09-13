<template>
  <el-pagination
    background
    layout="prev, pager, next"
    class="the-pagination"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot :name="name" v-bind="slotData" />
    </template>
  </el-pagination>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ThePagination',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-pagination.scss';
</style>
