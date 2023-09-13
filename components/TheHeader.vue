<template>
  <header :class="['the-header', { 'is-active': sidebar }]">
    <div class="the-header__inner">
      <the-header-item>
        <el-button type="text" @click="onToggleSidebar">
          <icon icon="carbon:menu" class="tw-text-lg tw-text-black" />
        </el-button>
      </the-header-item>
      <the-space />
      <the-header-item>
        <el-button type="text">
          <icon
            icon="clarity:notification-line"
            class="tw-text-lg tw-text-black"
          />
        </el-button>
      </the-header-item>
      <the-header-item>
        <the-header-user-info />
      </the-header-item>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheHeader',

  props: {
    sidebar: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    onToggleSidebar() {
      this.$emit('update:sidebar', !this.sidebar)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-header.scss';
</style>
