<template>
  <div
    :class="[
      'the-container',
      {
        'the-container--sm': size === 'sm',
        'the-container--md': size === 'md',
        'the-container--lg': size === 'lg',
        'the-container--fluid': fluid,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'TheContainer',
  props: {
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      required: false,
      default: () => 'md',
    },

    fluid: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-container.scss';
</style>
