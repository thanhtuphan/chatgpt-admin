<template>
  <el-upload
    class="the-upload"
    list-type="text"
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
  </el-upload>
</template>

<script lang="ts">
import Vue from 'vue'
import emitter from 'element-ui/src/mixins/emitter'

export default Vue.extend({
  name: 'TheUpload',

  mixins: [emitter],
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-upload.scss';
</style>
