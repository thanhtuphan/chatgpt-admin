<template>
  <div>Setting Chat</div>
  <!--
 <the-table
    v-loading="loading"
    :data="data"
    :pagination="pagination"
    :default-sort="defaultSort"
    @selection-change="handleSelectionChange"
    @remove-multiple="onRemoveMultiple"
    @page-change="onPageChange"
    @sort-change="handleSortChange"
    @submit-form="handleSubmit"
  >
    <template #toolbar-action>
      <el-button
        v-if="selected.length"
        class="tw-ml-auto"
        type="danger"
        size="small"
        @click="onRemoveMultiple"
      >
        {{ $t('common.actions.remove') }}
      </el-button>
      <el-button
        v-else
        class="tw-ml-auto"
        type="info"
        size="small"
        @click="onAdd"
      >
        {{ $t('common.actions.add') }}
      </el-button>
    </template>

    <el-table-column fixed="left" type="selection" width="55" align="center" />
    <el-table-column
      :label="$t('noticesPage.content.content')"
      min-width="200"
      prop="content"
    />

    <el-table-column
      :label="$t('noticesPage.content.contentEnglish')"
      min-width="200"
      prop="content_en"
    />

    <el-table-column
      :label="$t('noticesPage.content.createdAt')"
      min-width="120"
      sortable="custom"
      prop="created_at"
    >
      <template slot-scope="scope">
        {{ scope.row.created_at | datetime }}
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('noticesPage.content.updatedAt')"
      min-width="120"
      sortable="custom"
      prop="updated_at"
    >
      <template slot-scope="scope">
        {{ scope.row.updated_at | datetime }}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      :label="$t('common.table.action')"
      width="180"
    >
      <template slot-scope="scope">
        <el-button type="warning" size="small" @click="onEdit(scope.row.id)">{{
          $t('common.actions.edit')
        }}</el-button>
        <el-button type="danger" size="small" @click="onRemove(scope.row.id)">{{
          $t('common.actions.remove')
        }}</el-button>
      </template>
    </el-table-column>
  </the-table>
--></template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
// import { NoticeModel } from '@/app/notice/notice.model'
// import NoticeService from '~/app/notice/notice.service'

// interface FilterProps {
//   search: string
// }

// interface DataProps {
//   data: Array<NoticeModel>
//   loading: boolean
//   pagination: {
//     page: number
//     total: number
//   }
//   defaultSort: Record<string, string>
//   sort: {
//     column: string
//     option: boolean
//   } | null
//   selected: Array<NoticeModel>
//   filters: FilterProps
// }

export default Vue.extend({
  name: 'NoticesPage',

  // data(): DataProps {
  //   return {
  //     data: [],
  //     loading: false,
  //     pagination: {
  //       page: 1,
  //       total: 0,
  //     },

  //     defaultSort: {
  //       created_at: 'ascending',
  //     },

  //     sort: {
  //       column: 'created_at',
  //       option: false,
  //     },

  //     selected: [],
  //     filters: {
  //       search: '',
  //     },
  //   }
  // },

  head(): MetaInfo {
    return {
      title: this.$t('settingPage.title').toString(),
    }
  },

  // created() {
  //   this.onFetch()
  // },

  // methods: {
  //   async onFetch() {
  //     try {
  //       this.loading = true
  //       const { count, data } = await NoticeService.all({
  //         page: this.pagination.page,
  //         limit: this.ConstantsCommon.RECORD_PER_PAGE,
  //         sort: this.sort,
  //         filters: this.filters,
  //       })

  //       this.data = data
  //       this.pagination.total = count
  //     } catch (error: any) {
  //       this.$message.error(error.message)
  //     } finally {
  //       this.loading = false
  //     }
  //   },

  //   onPageChange(page: number) {
  //     this.pagination.page = page
  //     this.onFetch()
  //   },

  //   handleSelectionChange(selection: Array<NoticeModel>) {
  //     this.selected = selection
  //   },

  //   handleSortChange({ prop, order }: { prop: string; order: string }) {
  //     this.sort =
  //       order !== null
  //         ? {
  //             column: prop,
  //             option: order === 'ascending',
  //           }
  //         : null
  //     this.onFetch()
  //   },

  //   onAdd() {
  //     this.$router.push(this.RoutePage.NOTICES_CREATE)
  //   },

  //   onEdit(id: string) {
  //     this.$router.push(
  //       this.$format(this.RoutePage.NOTICES_DETAIL_EDIT, { id })
  //     )
  //   },

  //   onRemove(id: string) {
  //     this.Utils.Helper.deleteConfirm().then(async () => {
  //       try {
  //         this.loading = true

  //         await NoticeService.delete(id)

  //         await this.onFetch()

  //         this.$message.success(
  //           this.$t('common.message.deleteSuccess').toString()
  //         )
  //       } catch (error: any) {
  //         this.$message.error(error.message)
  //       } finally {
  //         this.loading = false
  //       }
  //     })
  //   },

  //   onRemoveMultiple() {
  //     this.Utils.Helper.deleteConfirm().then(async () => {
  //       try {
  //         this.loading = true

  //         await Promise.allSettled(
  //           this.selected.map((item) => NoticeService.delete(item.id))
  //         )

  //         await this.onFetch()

  //         this.$message.success(
  //           this.$t('common.message.deleteSuccess').toString()
  //         )
  //       } catch (error: any) {
  //         this.$message.error(error.message)
  //       } finally {
  //         this.loading = false
  //       }
  //     })
  //   },

  //   handleSubmit(value: string) {
  //     this.filters.search = value
  //     this.onFetch()
  //   },
  // },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/notices/index.scss';
</style>
