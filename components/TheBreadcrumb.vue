<template>
  <el-breadcrumb
    separator="/"
    class="the-breadcrumb"
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
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheBreadcrumb',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-breadcrumb.scss';
</style>
