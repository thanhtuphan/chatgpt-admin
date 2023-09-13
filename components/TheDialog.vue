<template>
  <client-only>
    <el-dialog custom-class="the-dialog" v-bind="$attrs" v-on="$listeners">
      <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
      >
        <slot :name="name" v-bind="slotData" />
      </template>
    </el-dialog>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheDialog',
})
</script>

<style lang="scss">
@import '@/assets/styles/components/the-dialog.scss';
</style>
