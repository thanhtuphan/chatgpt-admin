<template>
  <div v-frag>
    <the-toolbar>
      <el-input
        v-model="search"
        class="the-toolbar__search-input"
        clearable
        size="small"
        :debounce="300"
        :placeholder="$t('common.placeholderFields.tableSearch')"
      />
      <slot name="toolbar-filter" />
      <el-button
        class="the-toolbar__search-button"
        type="primary"
        size="small"
        @click="onSubmit"
      >
        {{ $t('common.actions.search') }}
      </el-button>
      <slot name="toolbar-action" />
    </the-toolbar>

    <div
      v-if="pagination && pagination.total > perPage"
      class="tw-text-right tw-mb-5"
    >
      <the-pagination
        :total="pagination.total"
        :page-size="perPage"
        @current-change="onPageChange"
      />
    </div>

    <el-table class="haha" v-bind="$attrs" v-on="$listeners">
      <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
      >
        <slot :name="name" v-bind="slotData" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ConstantsCommon } from '~/common/constants'

interface DataProps {
  search: string
}

export default Vue.extend({
  name: 'TheTable',
  props: {
    perPage: {
      type: Number,
      required: false,
      default: ConstantsCommon.RECORD_PER_PAGE,
    },

    pagination: {
      type: Object as PropType<{
        page: number
        perPage: number
        total: number
      }>,

      required: false,

      default: null,
    },
  },

  data(): DataProps {
    return {
      search: '',
    }
  },

  methods: {
    onPageChange(page: number) {
      this.$emit('page-change', page)
    },

    onSubmit() {
      this.$emit('submit-form', this.search)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-table.scss';
@import '@/assets/styles/pages/users/index.scss';
</style>
